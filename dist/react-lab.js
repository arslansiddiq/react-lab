(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactLab"] = factory(require("react"));
	else
		root["ReactLab"] = factory(root["React"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/iframe-phone/lib/iframe-endpoint.js":
/*!**********************************************************!*\
  !*** ./node_modules/iframe-phone/lib/iframe-endpoint.js ***!
  \**********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 139:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var structuredClone = __webpack_require__(/*! ./structured-clone */ "./node_modules/iframe-phone/lib/structured-clone.js");
var HELLO_INTERVAL_LENGTH = 200;
var HELLO_TIMEOUT_LENGTH = 60000;

function IFrameEndpoint() {
  var listeners = {};
  var isInitialized = false;
  var connected = false;
  var postMessageQueue = [];
  var helloInterval;

  function postToParent(message) {
    // See http://dev.opera.com/articles/view/window-postmessage-messagechannel/#crossdoc
    //     https://github.com/Modernizr/Modernizr/issues/388
    //     http://jsfiddle.net/ryanseddon/uZTgD/2/
    if (structuredClone.supported()) {
      window.parent.postMessage(message, '*');
    } else {
      window.parent.postMessage(JSON.stringify(message), '*');
    }
  }

  function post(type, content) {
    var message;
    // Message object can be constructed from 'type' and 'content' arguments or it can be passed
    // as the first argument.
    if (arguments.length === 1 && typeof type === 'object' && typeof type.type === 'string') {
      message = type;
    } else {
      message = {
        type: type,
        content: content
      };
    }
    if (connected) {
      postToParent(message);
    } else {
      postMessageQueue.push(message);
    }
  }

  function postHello() {
    postToParent({
      type: 'hello'
    });
  }

  function addListener(type, fn) {
    listeners[type] = fn;
  }

  function removeListener(type) {
    delete listeners[type];
  }

  function removeAllListeners() {
    listeners = {};
  }

  function getListenerNames() {
    return Object.keys(listeners);
  }

  function messageListener(message) {
    // Anyone can send us a message. Only pay attention to messages from parent.
    if (message.source !== window.parent) return;
    var messageData = message.data;
    if (typeof messageData === 'string') messageData = JSON.parse(messageData);

    if (!connected && messageData.type === 'hello') {
      connected = true;
      stopPostingHello();
      while (postMessageQueue.length > 0) {
        post(postMessageQueue.shift());
      }
    }

    if (connected && listeners[messageData.type]) {
      listeners[messageData.type](messageData.content);
    }
  }

  function disconnect() {
    connected = false;
    stopPostingHello();
    removeAllListeners();
    window.removeEventListener('message', messageListener);
  }

  /**
    Initialize communication with the parent frame. This should not be called until the app's custom
    listeners are registered (via our 'addListener' public method) because, once we open the
    communication, the parent window may send any messages it may have queued. Messages for which
    we don't have handlers will be silently ignored.
  */
  function initialize() {
    if (isInitialized) {
      return;
    }
    isInitialized = true;
    if (window.parent === window) return;

    // We kick off communication with the parent window by sending a "hello" message. Then we wait
    // for a handshake (another "hello" message) from the parent window.
    startPostingHello();
    window.addEventListener('message', messageListener, false);
  }

  function startPostingHello() {
    if (helloInterval) {
      stopPostingHello();
    }
    helloInterval = window.setInterval(postHello, HELLO_INTERVAL_LENGTH);
    window.setTimeout(stopPostingHello, HELLO_TIMEOUT_LENGTH);
    // Post the first msg immediately.
    postHello();
  }

  function stopPostingHello() {
    window.clearInterval(helloInterval);
    helloInterval = null;
  }

  // Public API.
  return {
    initialize: initialize,
    getListenerNames: getListenerNames,
    addListener: addListener,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    disconnect: disconnect,
    post: post
  };
}

var instance = null;

// IFrameEndpoint is a singleton, as iframe can't have multiple parents anyway.
module.exports = function getIFrameEndpoint() {
  if (!instance) {
    instance = new IFrameEndpoint();
  }
  return instance;
};


/***/ }),

/***/ "./node_modules/iframe-phone/lib/iframe-phone-rpc-endpoint.js":
/*!********************************************************************!*\
  !*** ./node_modules/iframe-phone/lib/iframe-phone-rpc-endpoint.js ***!
  \********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 17:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ParentEndpoint = __webpack_require__(/*! ./parent-endpoint */ "./node_modules/iframe-phone/lib/parent-endpoint.js");
var getIFrameEndpoint = __webpack_require__(/*! ./iframe-endpoint */ "./node_modules/iframe-phone/lib/iframe-endpoint.js");

// Not a real UUID as there's an RFC for that (needed for proper distributed computing).
// But in this fairly parochial situation, we just need to be fairly sure to avoid repeats.
function getPseudoUUID() {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var len = chars.length;
  var ret = [];

  for (var i = 0; i < 10; i++) {
    ret.push(chars[Math.floor(Math.random() * len)]);
  }
  return ret.join('');
}

module.exports = function IframePhoneRpcEndpoint(handler, namespace, targetWindow, targetOrigin, phone) {
  var pendingCallbacks = Object.create({});

  // if it's a non-null object, rather than a function, 'handler' is really an options object
  if (handler && typeof handler === 'object') {
    namespace = handler.namespace;
    targetWindow = handler.targetWindow;
    targetOrigin = handler.targetOrigin;
    phone = handler.phone;
    handler = handler.handler;
  }

  if (!phone) {
    if (targetWindow === window.parent) {
      phone = getIFrameEndpoint();
      phone.initialize();
    } else {
      phone = new ParentEndpoint(targetWindow, targetOrigin);
    }
  }

  phone.addListener(namespace, function (message) {
    var callbackObj;

    if (message.messageType === 'call' && typeof this.handler === 'function') {
      this.handler.call(undefined, message.value, function (returnValue) {
        phone.post(namespace, {
          messageType: 'returnValue',
          uuid: message.uuid,
          value: returnValue
        });
      });
    } else if (message.messageType === 'returnValue') {
      callbackObj = pendingCallbacks[message.uuid];

      if (callbackObj) {
        window.clearTimeout(callbackObj.timeout);
        if (callbackObj.callback) {
          callbackObj.callback.call(undefined, message.value);
        }
        pendingCallbacks[message.uuid] = null;
      }
    }
  }.bind(this));

  function call(message, callback) {
    var uuid = getPseudoUUID();

    pendingCallbacks[uuid] = {
      callback: callback,
      timeout: window.setTimeout(function () {
        if (callback) {
          callback(undefined, new Error("IframePhone timed out waiting for reply"));
        }
      }, 2000)
    };

    phone.post(namespace, {
      messageType: 'call',
      uuid: uuid,
      value: message
    });
  }

  function disconnect() {
    phone.disconnect();
  }

  this.handler = handler;
  this.call = call.bind(this);
  this.disconnect = disconnect.bind(this);
};


/***/ }),

/***/ "./node_modules/iframe-phone/lib/parent-endpoint.js":
/*!**********************************************************!*\
  !*** ./node_modules/iframe-phone/lib/parent-endpoint.js ***!
  \**********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 36:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var structuredClone = __webpack_require__(/*! ./structured-clone */ "./node_modules/iframe-phone/lib/structured-clone.js");

/**
  Call as:
    new ParentEndpoint(targetWindow, targetOrigin, afterConnectedCallback)
      targetWindow is a WindowProxy object. (Messages will be sent to it)

      targetOrigin is the origin of the targetWindow. (Messages will be restricted to this origin)

      afterConnectedCallback is an optional callback function to be called when the connection is
        established.

  OR (less secure):
    new ParentEndpoint(targetIframe, afterConnectedCallback)

      targetIframe is a DOM object (HTMLIframeElement); messages will be sent to its contentWindow.

      afterConnectedCallback is an optional callback function

    In this latter case, targetOrigin will be inferred from the value of the src attribute of the
    provided DOM object at the time of the constructor invocation. This is less secure because the
    iframe might have been navigated to an unexpected domain before constructor invocation.

  Note that it is important to specify the expected origin of the iframe's content to safeguard
  against sending messages to an unexpected domain. This might happen if our iframe is navigated to
  a third-party URL unexpectedly. Furthermore, having a reference to Window object (as in the first
  form of the constructor) does not protect against sending a message to the wrong domain. The
  window object is actualy a WindowProxy which transparently proxies the Window object of the
  underlying iframe, so that when the iframe is navigated, the "same" WindowProxy now references a
  completely differeent Window object, possibly controlled by a hostile domain.

  See http://www.esdiscuss.org/topic/a-dom-use-case-that-can-t-be-emulated-with-direct-proxies for
  more about this weird behavior of WindowProxies (the type returned by <iframe>.contentWindow).
*/

module.exports = function ParentEndpoint(targetWindowOrIframeEl, targetOrigin, afterConnectedCallback) {
  var postMessageQueue = [];
  var connected = false;
  var handlers = {};
  var targetWindowIsIframeElement;

  function getIframeOrigin(iframe) {
    return iframe.src.match(/(.*?\/\/.*?)\//)[1];
  }

  function post(type, content) {
    var message;
    // Message object can be constructed from 'type' and 'content' arguments or it can be passed
    // as the first argument.
    if (arguments.length === 1 && typeof type === 'object' && typeof type.type === 'string') {
      message = type;
    } else {
      message = {
        type: type,
        content: content
      };
    }
    if (connected) {
      var tWindow = getTargetWindow();
      // if we are laready connected ... send the message
      // See http://dev.opera.com/articles/view/window-postmessage-messagechannel/#crossdoc
      //     https://github.com/Modernizr/Modernizr/issues/388
      //     http://jsfiddle.net/ryanseddon/uZTgD/2/
      if (structuredClone.supported()) {
        tWindow.postMessage(message, targetOrigin);
      } else {
        tWindow.postMessage(JSON.stringify(message), targetOrigin);
      }
    } else {
      // else queue up the messages to send after connection complete.
      postMessageQueue.push(message);
    }
  }

  function addListener(messageName, func) {
    handlers[messageName] = func;
  }

  function removeListener(messageName) {
    delete handlers[messageName];
  }

  function removeAllListeners() {
    handlers = {};
  }

  // Note that this function can't be used when IFrame element hasn't been added to DOM yet
  // (.contentWindow would be null). At the moment risk is purely theoretical, as the parent endpoint
  // only listens for an incoming 'hello' message and the first time we call this function
  // is in #receiveMessage handler (so iframe had to be initialized before, as it could send 'hello').
  // It would become important when we decide to refactor the way how communication is initialized.
  function getTargetWindow() {
    if (targetWindowIsIframeElement) {
      var tWindow = targetWindowOrIframeEl.contentWindow;
      if (!tWindow) {
        throw "IFrame element needs to be added to DOM before communication " +
              "can be started (.contentWindow is not available)";
      }
      return tWindow;
    }
    return targetWindowOrIframeEl;
  }

  function receiveMessage(message) {
    var messageData;
    if (message.source === getTargetWindow() && (targetOrigin === '*' || message.origin === targetOrigin)) {
      messageData = message.data;
      if (typeof messageData === 'string') {
        messageData = JSON.parse(messageData);
      }
      if (handlers[messageData.type]) {
        handlers[messageData.type](messageData.content);
      } else {
        console.log("cant handle type: " + messageData.type);
      }
    }
  }

  function disconnect() {
    connected = false;
    removeAllListeners();
    window.removeEventListener('message', receiveMessage);
  }

  // handle the case that targetWindowOrIframeEl is actually an <iframe> rather than a Window(Proxy) object
  // Note that if it *is* a WindowProxy, this probe will throw a SecurityException, but in that case
  // we also don't need to do anything
  try {
    targetWindowIsIframeElement = targetWindowOrIframeEl.constructor === HTMLIFrameElement;
  } catch (e) {
    targetWindowIsIframeElement = false;
  }

  if (targetWindowIsIframeElement) {
    // Infer the origin ONLY if the user did not supply an explicit origin, i.e., if the second
    // argument is empty or is actually a callback (meaning it is supposed to be the
    // afterConnectionCallback)
    if (!targetOrigin || targetOrigin.constructor === Function) {
      afterConnectedCallback = targetOrigin;
      targetOrigin = getIframeOrigin(targetWindowOrIframeEl);
    }
  }

  // Handle pages served through file:// protocol. Behaviour varies in different browsers. Safari sets origin
  // to 'file://' and everything works fine, but Chrome and Safari set message.origin to null.
  // Also, https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage says:
  //  > Lastly, posting a message to a page at a file: URL currently requires that the targetOrigin argument be "*".
  //  > file:// cannot be used as a security restriction; this restriction may be modified in the future.
  // So, using '*' seems like the only possible solution.
  if (targetOrigin === 'file://') {
    targetOrigin = '*';
  }

  // when we receive 'hello':
  addListener('hello', function () {
    connected = true;

    // send hello response
    post({
      type: 'hello',
      // `origin` property isn't used by IframeEndpoint anymore (>= 1.2.0), but it's being sent to be
      // backward compatible with old IframeEndpoint versions (< v1.2.0).
      origin: window.location.href.match(/(.*?\/\/.*?)\//)[1]
    });

    // give the user a chance to do things now that we are connected
    // note that is will happen before any queued messages
    if (afterConnectedCallback && typeof afterConnectedCallback === "function") {
      afterConnectedCallback();
    }

    // Now send any messages that have been queued up ...
    while (postMessageQueue.length > 0) {
      post(postMessageQueue.shift());
    }
  });

  window.addEventListener('message', receiveMessage, false);

  // Public API.
  return {
    post: post,
    addListener: addListener,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    disconnect: disconnect,
    getTargetWindow: getTargetWindow,
    targetOrigin: targetOrigin
  };
};


/***/ }),

/***/ "./node_modules/iframe-phone/lib/structured-clone.js":
/*!***********************************************************!*\
  !*** ./node_modules/iframe-phone/lib/structured-clone.js ***!
  \***********************************************************/
/*! default exports */
/*! export supported [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

var featureSupported = {
  'structuredClones': 0
};

(function () {
  var result = 0;

  if (!!window.postMessage) {
    try {
      // Spec states you can't transmit DOM nodes and it will throw an error
      // postMessage implementations that support cloned data will throw.
      window.postMessage(document.createElement("a"), "*");
    } catch (e) {
      // BBOS6 throws but doesn't pass through the correct exception
      // so check error message
      result = (e.DATA_CLONE_ERR || e.message === "Cannot post cyclic structures.") ? 1 : 0;
      featureSupported = {
        'structuredClones': result
      };
    }
  }
}());

exports.supported = function supported() {
  return featureSupported && featureSupported.structuredClones > 0;
};


/***/ }),

/***/ "./node_modules/iframe-phone/main.js":
/*!*******************************************!*\
  !*** ./node_modules/iframe-phone/main.js ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  /**
   * Allows to communicate with an iframe.
   */
  ParentEndpoint:  __webpack_require__(/*! ./lib/parent-endpoint */ "./node_modules/iframe-phone/lib/parent-endpoint.js"),
  /**
   * Allows to communicate with a parent page.
   * IFrameEndpoint is a singleton, as iframe can't have multiple parents anyway.
   */
  getIFrameEndpoint: __webpack_require__(/*! ./lib/iframe-endpoint */ "./node_modules/iframe-phone/lib/iframe-endpoint.js"),
  structuredClone: __webpack_require__(/*! ./lib/structured-clone */ "./node_modules/iframe-phone/lib/structured-clone.js"),

  // TODO: May be misnamed
  IframePhoneRpcEndpoint: __webpack_require__(/*! ./lib/iframe-phone-rpc-endpoint */ "./node_modules/iframe-phone/lib/iframe-phone-rpc-endpoint.js")

};


/***/ }),

/***/ "./src/generate-embeddable-html.tsx":
/*!******************************************!*\
  !*** ./src/generate-embeddable-html.tsx ***!
  \******************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export generateEmbeddableHTML [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateEmbeddableHTML = void 0;
// This function returns string with HTML content of the Lab interactive page.
// Note that list of dependencies and some implementation details are based on lab/embeddable.html file.
// This version is different mostly to keep it as small as possible, provide labDistPath, and the fact
// that it's used via srcDoc attribute.
var generateEmbeddableHTML = function (labDistPath) {
    if (labDistPath === void 0) { labDistPath = "lab/"; }
    return "\n  <!doctype html>\n  <html>\n  <head>\n    <meta content=\"text/html;charset=utf-8\" http-equiv=\"Content-Type\">\n    <meta content=\"IE=edge,chrome=1\" http-equiv=\"X-UA-Compatible\">\n    <link href=\"" + labDistPath + "lab/vendor/jquery-ui/jquery-ui.min.css\" rel=\"stylesheet\">\n    <link href=\"" + labDistPath + "lab/lab-fonts.css\" rel=\"stylesheet\">\n    <link href=\"" + labDistPath + "lab/lab.css\" rel=\"stylesheet\">\n    <link href=\"" + labDistPath + "css/style.css\" rel=\"stylesheet\">\n    <link href='" + labDistPath + "themes/cc-themes.css' rel='stylesheet' type='text/css'>\n    <script src=\"" + labDistPath + "lab/vendor/jquery/jquery.min.js\"></script>\n    <script src=\"" + labDistPath + "lab/vendor/jquery-ui/jquery-ui.min.js\"></script>\n    <title>Lab Interactive</title>\n    <style>\n      * {\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box\n      }\n      html, body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        background: transparent;\n        margin: 0;\n        padding: 0\n      }\n    </style>\n  </head>\n  <body>\n    <header id=\"siteHeader\">\n      <figure class=\"logo\">\n        <img src=\"" + labDistPath + "lab/images/logo.png\" alt=\"LabOnWeb\">\n      </figure>\n    </header>\n    <div id=\"interactive-container\" tabindex=\"0\"></div>\n    <script src=\"" + labDistPath + "lab/lab.js\"></script>\n    <script>\n      Lab.config.rootUrl = \"" + labDistPath + "lab\";\n      // sharing won't work so disable it\n      Lab.config.sharing = false;\n      // Keep Embeddable namespace to be consistent with lab/embeddable.html\n      window.Embeddable = {\n        controller: new Lab.InteractivesController(null, '#interactive-container')\n      };\n    </script>\n    </body>\n  </html>\n";
};
exports.generateEmbeddableHTML = generateEmbeddableHTML;


/***/ }),

/***/ "./src/react-lab.tsx":
/*!***************************!*\
  !*** ./src/react-lab.tsx ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 15:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
var iframe_phone_1 = __importDefault(__webpack_require__(/*! iframe-phone */ "./node_modules/iframe-phone/main.js"));
var model_only_interactive_1 = __importDefault(__webpack_require__(/*! ./model-only-interactive */ "./src/model-only-interactive.js"));
var generate_embeddable_html_1 = __webpack_require__(/*! ./generate-embeddable-html */ "./src/generate-embeddable-html.tsx");
var DEF_UPDATE_DELAY = 75; // ms
var Lab = /** @class */ (function (_super) {
    __extends(Lab, _super);
    function Lab(props) {
        var _this = _super.call(this, props) || this;
        _this.iframeRef = react_1.default.createRef();
        _this._labUpdateTimeoutID = null;
        _this._propsToSet = {};
        _this.state = {
            loading: true
        };
        _this._handleIframeLoad = _this._handleIframeLoad.bind(_this);
        _this._asyncLabPropertiesUpdate = _this._asyncLabPropertiesUpdate.bind(_this);
        return _this;
    }
    Lab.prototype.componentDidMount = function () {
        var _this = this;
        var connectToIframe = function () {
            if (_this.iframeRef.current) {
                _this._phone = new iframe_phone_1.default.ParentEndpoint(_this.iframeRef.current);
                _this._phone.addListener('log', function (content) {
                    var _a, _b;
                    (_b = (_a = _this.props).onLogEvent) === null || _b === void 0 ? void 0 : _b.call(_a, content.action, content.data);
                });
                _this.iframeRef.current.addEventListener('load', _this._handleIframeLoad);
            }
            else {
                setTimeout(connectToIframe, 100);
            }
        };
        connectToIframe();
    };
    Lab.prototype.componentWillUnmount = function () {
        var _a;
        this._phone.disconnect();
        (_a = this.iframeRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('load', this._handleIframeLoad);
    };
    Lab.prototype.componentWillReceiveProps = function (nextProps) {
        var _a, _b;
        if (nextProps.interactive !== this.props.interactive ||
            nextProps.model !== this.props.model) {
            // Complete iframe reload is slower, but more bulletproof and workarounds Lab issues related to memory leaks.
            if (nextProps.reloadIframeOnModelUpdate) {
                // Looks a bit magic, but interactive will be loaded and completely setup (including interactive and model jsons)
                // by the iframe "onload" handler. Take a look at _handleIframeLoad() method.
                (_b = (_a = this.iframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.location.reload();
                this.setState({ loading: true });
            }
            else {
                this._loadInteractive(nextProps.interactive, nextProps.model);
            }
        }
        if (nextProps.props !== this.props.props) {
            // Set only DIFF of new and old properties. It's quite important difference,
            // as Lab calls 'onChange' callbacks each time we set given property,
            // even if we set the same value.
            this._setLabProperties(diff(nextProps.props, this.props.props));
        }
        if (nextProps.playing !== this.props.playing) {
            this._setLabPlaying(!!nextProps.playing);
        }
    };
    Lab.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        // List here everything that is used in render() method.
        // Other properties are sent directly to Lab using scriptingAPI, so we don't need to re-render component.
        var viewProps = ['width', 'height', 'useSrcDocIframe', 'labDistPath', 'frameBorder', 'allowFullScreen'];
        var viewState = ['loading'];
        for (var _i = 0, viewProps_1 = viewProps; _i < viewProps_1.length; _i++) {
            var prop = viewProps_1[_i];
            if (nextProps[prop] !== this.props[prop])
                return true;
        }
        for (var _a = 0, viewState_1 = viewState; _a < viewState_1.length; _a++) {
            var prop = viewState_1[_a];
            if (nextState[prop] !== this.state[prop])
                return true;
        }
        return false;
    };
    Lab.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, frameBorder = _a.frameBorder, allowFullScreen = _a.allowFullScreen, labDistPath = _a.labDistPath, useSrcDocIframe = _a.useSrcDocIframe;
        var loading = this.state.loading;
        var style = loading ? { visibility: 'hidden' } : {};
        var src = useSrcDocIframe ? "" : labDistPath + "embeddable.html";
        var srcDoc = useSrcDocIframe ? generate_embeddable_html_1.generateEmbeddableHTML(labDistPath) : undefined;
        return (react_1.default.createElement("iframe", { ref: this.iframeRef, src: src, srcDoc: srcDoc, frameBorder: frameBorder, style: style, width: width, height: height, allowFullScreen: allowFullScreen }));
    };
    Object.defineProperty(Lab.prototype, "scriptingAPI", {
        // Public API.
        get: function () {
            var _a, _b;
            // window.script is exported by Lab
            return (_b = (_a = this.iframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.script;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lab.prototype, "interactiveController", {
        get: function () {
            var _a, _b, _c;
            // Embeddable.controller is exported by Lab
            return (_c = (_b = (_a = this.iframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.Embeddable) === null || _c === void 0 ? void 0 : _c.controller;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lab.prototype, "iframe", {
        get: function () {
            return this.iframeRef.current;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lab.prototype, "phone", {
        get: function () {
            return this._phone;
        },
        enumerable: false,
        configurable: true
    });
    // Private methods. Use React properties instead.
    Lab.prototype._handleIframeLoad = function () {
        var _this = this;
        this.interactiveController.on('modelLoaded.react-lab', function () {
            var _a, _b;
            _this._setLabProperties(_this.props.props);
            _this._addLabListeners(_this.props.observedProps || []);
            _this._setLabPlaying(!!_this.props.playing);
            (_b = (_a = _this.props).onModelLoad) === null || _b === void 0 ? void 0 : _b.call(_a);
            _this._handleModelLoad();
        });
        this._loadInteractive(this.props.interactive, this.props.model);
    };
    Lab.prototype._handleModelLoad = function () {
        this.setState({ loading: false });
    };
    Lab.prototype._loadInteractive = function (interactive, model) {
        // Iframe might be still loading. The interactive will be loaded when iframe is loaded.
        if (!this.interactiveController)
            return;
        if (interactive) {
            if (model) {
                interactive = combineInteractiveAndModel(interactive, model);
            }
            if (this.scriptingAPI) {
                // Stop the model before loading a new one to avoid performance issues.
                this.scriptingAPI.stop();
            }
            this.interactiveController.loadInteractive(interactive);
        }
    };
    Lab.prototype._setLabProperties = function (props) {
        if (!this.props.propsUpdateDelay) {
            // Iframe or model might be still loading. The props will be set when model is loaded.
            if (this.scriptingAPI)
                this.scriptingAPI.set(props);
            return;
        }
        extend(this._propsToSet, props);
        if (this._labUpdateTimeoutID !== null) {
            return;
        }
        var delay = this.props.propsUpdateDelay === true ? DEF_UPDATE_DELAY : this.props.propsUpdateDelay;
        this._labUpdateTimeoutID = window.setTimeout(this._asyncLabPropertiesUpdate, delay);
    };
    Lab.prototype._asyncLabPropertiesUpdate = function () {
        // Iframe or model might be still loading. The props will be set when model is loaded.
        if (this.scriptingAPI)
            this.scriptingAPI.set(this._propsToSet);
        this._labUpdateTimeoutID = null;
        this._propsToSet = {};
    };
    Lab.prototype._setLabPlaying = function (v) {
        // Iframe or model might be still loading. Model will be started or stopped when model is loaded.
        if (!this.scriptingAPI)
            return;
        if (v) {
            this.scriptingAPI.start();
        }
        else {
            this.scriptingAPI.stop();
        }
    };
    Lab.prototype._addLabListeners = function (observedProps) {
        var _this = this;
        observedProps.forEach(function (propName) {
            _this.scriptingAPI.onPropertyChange(propName, function (value) {
                var _a, _b;
                (_b = (_a = _this.props).onPropChange) === null || _b === void 0 ? void 0 : _b.call(_a, propName, value);
            });
        });
    };
    Lab.defaultProps = {
        interactive: model_only_interactive_1.default,
        useSrcDocIframe: true,
        labDistPath: 'lab/',
        width: '565px',
        height: '435px',
        allowFullScreen: true,
        frameBorder: '0',
        props: {},
        observedProps: [],
        propsUpdateDelay: false,
        reloadIframeOnModelUpdate: true
    };
    return Lab;
}(react_1.default.Component));
exports.default = Lab;
function combineInteractiveAndModel(interactive, model) {
    delete interactive.models[0].url;
    interactive.models[0].model = model;
    return interactive;
}
function diff(newProps, oldProps) {
    if (oldProps === void 0) { oldProps = {}; }
    var result = {};
    Object.keys(newProps).forEach(function (key) {
        if (newProps[key] !== oldProps[key])
            result[key] = newProps[key];
    });
    return result;
}
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}


/***/ }),

/***/ "./src/model-only-interactive.js":
/*!***************************************!*\
  !*** ./src/model-only-interactive.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
// Simple Lab interactive that ensures that only Lab model is visible.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  "title": "Lab Interactive",
  "aspectRatio": 1,
  "theme": "no-framing",
  "showTopBar": false,
  "showBottomBar": false,
  "models": [
    {
      "type": "md2d",
      "id": "model"
    }
  ]
});


/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/react-lab.tsx");
/******/ })()
;
});
//# sourceMappingURL=react-lab.js.map