// This function returns string with HTML content of the Lab interactive page.
// Note that list of dependencies and some implementation details are based on lab/embeddable.html file.
// This version is different mostly to keep it as small as possible, provide labDistPath, and the fact
// that it's used via srcDoc attribute.
export const generateEmbeddableHTML = (labDistPath = "lab/") => `
  <!doctype html>
  <html>
  <head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <link href="${labDistPath}lab/vendor/jquery-ui/jquery-ui.min.css" rel="stylesheet">
    <link href="${labDistPath}lab/lab-fonts.css" rel="stylesheet">
    <link href="${labDistPath}lab/lab.css" rel="stylesheet">
    <link href="${labDistPath}embeddable.css" rel="stylesheet">
    <link href="${labDistPath}css/style.css" rel="stylesheet">
    <link href='${labDistPath}themes/cc-themes.css' rel='stylesheet' type='text/css'>
    <script src="${labDistPath}lab/vendor/jquery/jquery.min.js"></script>
    <script src="${labDistPath}lab/vendor/jquery-ui/jquery-ui.min.js"></script>
    <script src="${labDistPath}embeddable.js"></script>
    <title>LAB on WEB</title>
    <style>
      * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box
      }
      html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
        margin: 0;
        padding: 0
      }
    </style>
  </head>
  <body>
    <header id="siteHeader">
      <figure class="logo">
        <img src="${labDistPath}lab/images/logo.png" alt="LabOnWeb">
      </figure>
      <!-- Have these buttons only when velocity/temp sensors are exists (check "sensors" array) -->
      <div id="extract-data">
        <button id="extract-temp">
          <svg width='20' height='20' height='512px' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' width='512px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='white' d='M256,128c-81.9,0-145.7,48.8-224,128c67.4,67.7,124,128,224,128c99.9,0,173.4-76.4,224-126.6   C428.2,198.6,354.8,128,256,128z M256,347.3c-49.4,0-89.6-41-89.6-91.3c0-50.4,40.2-91.3,89.6-91.3s89.6,41,89.6,91.3   C345.6,306.4,305.4,347.3,256,347.3z'/><g><path fill='white' d='M256,224c0-7.9,2.9-15.1,7.6-20.7c-2.5-0.4-5-0.6-7.6-0.6c-28.8,0-52.3,23.9-52.3,53.3c0,29.4,23.5,53.3,52.3,53.3    s52.3-23.9,52.3-53.3c0-2.3-0.2-4.6-0.4-6.9c-5.5,4.3-12.3,6.9-19.8,6.9C270.3,256,256,241.7,256,224z'/></g></g>
          </svg> Temperature
        </button>
        <button id="extract-velocity">
          <svg width='20' height='20' height='512px' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' width='512px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='white' d='M256,128c-81.9,0-145.7,48.8-224,128c67.4,67.7,124,128,224,128c99.9,0,173.4-76.4,224-126.6   C428.2,198.6,354.8,128,256,128z M256,347.3c-49.4,0-89.6-41-89.6-91.3c0-50.4,40.2-91.3,89.6-91.3s89.6,41,89.6,91.3   C345.6,306.4,305.4,347.3,256,347.3z'/><g><path fill='white' d='M256,224c0-7.9,2.9-15.1,7.6-20.7c-2.5-0.4-5-0.6-7.6-0.6c-28.8,0-52.3,23.9-52.3,53.3c0,29.4,23.5,53.3,52.3,53.3    s52.3-23.9,52.3-53.3c0-2.3-0.2-4.6-0.4-6.9c-5.5,4.3-12.3,6.9-19.8,6.9C270.3,256,256,241.7,256,224z'/></g></g>
          </svg> Velocity
        </button>
        <button id="extract-pressure">
          <svg width='20' height='20' height='512px' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' width='512px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='white' d='M256,128c-81.9,0-145.7,48.8-224,128c67.4,67.7,124,128,224,128c99.9,0,173.4-76.4,224-126.6   C428.2,198.6,354.8,128,256,128z M256,347.3c-49.4,0-89.6-41-89.6-91.3c0-50.4,40.2-91.3,89.6-91.3s89.6,41,89.6,91.3   C345.6,306.4,305.4,347.3,256,347.3z'/><g><path fill='white' d='M256,224c0-7.9,2.9-15.1,7.6-20.7c-2.5-0.4-5-0.6-7.6-0.6c-28.8,0-52.3,23.9-52.3,53.3c0,29.4,23.5,53.3,52.3,53.3    s52.3-23.9,52.3-53.3c0-2.3-0.2-4.6-0.4-6.9c-5.5,4.3-12.3,6.9-19.8,6.9C270.3,256,256,241.7,256,224z'/></g></g>
          </svg> Pressure
        </button>
        <button id="extract-heatflux">
          <svg width='20' height='20' height='512px' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' width='512px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='white' d='M256,128c-81.9,0-145.7,48.8-224,128c67.4,67.7,124,128,224,128c99.9,0,173.4-76.4,224-126.6   C428.2,198.6,354.8,128,256,128z M256,347.3c-49.4,0-89.6-41-89.6-91.3c0-50.4,40.2-91.3,89.6-91.3s89.6,41,89.6,91.3   C345.6,306.4,305.4,347.3,256,347.3z'/><g><path fill='white' d='M256,224c0-7.9,2.9-15.1,7.6-20.7c-2.5-0.4-5-0.6-7.6-0.6c-28.8,0-52.3,23.9-52.3,53.3c0,29.4,23.5,53.3,52.3,53.3    s52.3-23.9,52.3-53.3c0-2.3-0.2-4.6-0.4-6.9c-5.5,4.3-12.3,6.9-19.8,6.9C270.3,256,256,241.7,256,224z'/></g></g>
          </svg>Heat Flux
        </button>
        <button id="drag-sensor"> 
          <svg width='20' height='20' enable-background='new 0 0 50 50' height='50px' id='Layer_1' version='1.1' viewBox='0 0 50 50' width='50px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect fill='none' height='50' width='50'/><line fill='none' stroke='#ffffff' stroke-miterlimit='10' stroke-width='4' x1='9' x2='41' y1='25' y2='25'/><line fill='none' stroke='#ffffff' stroke-miterlimit='10' stroke-width='4' x1='25' x2='25' y1='9' y2='41'/>
          </svg> Sensor</button>
        <button id="drag-object">
          <svg width='20' height='20' enable-background='new 0 0 50 50' height='50px' id='Layer_1' version='1.1' viewBox='0 0 50 50' width='50px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect fill='none' height='50' width='50'/><line fill='none' stroke='#ffffff' stroke-miterlimit='10' stroke-width='4' x1='9' x2='41' y1='25' y2='25'/><line fill='none' stroke='#ffffff' stroke-miterlimit='10' stroke-width='4' x1='25' x2='25' y1='9' y2='41'/>
          </svg> Object
        </button>
      </div>
    </header>

    <!-- dummy DOM that helps to detect whether the simulation lab is loaded -->
    <div id="loaded" style="display: none">hey</div>
    <div id="interactive-container" tabindex="0"></div>

    <!-- Modal to display the temp data -->
    <div id="tempModal">
      <div id="modalButtonContainer">
        <button id="copy-button" title="Copy Data">
          <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'><path d='M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z'/></svg>
        </button>
        <button id="close" title="Close">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><polygon fill-rule='evenodd' points='8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414'/></svg>
        </button>
      </div>
      <div id="tempModal-content">
        <h3>Temperature (°C)</h3>
        <table id="table-data">
          <thead>
            <tr id="table-header"></tr>
          </thead>
          <tbody id="table-container"></tbody>
        </table>
      </div>
    </div>
    <div id="velocityModal">
      <div id="modalButtonContainer">
        <button id="velocity-copy-button" title="Copy Data">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'><path d='M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z'/></svg>
        </button>
        <button id="velocity-close" title="Close">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><polygon fill-rule='evenodd' points='8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414'/></svg>
        </button>
      </div>
      <div id="velocityModal-content">
        <h3>Velocity (m/s)</h3>
        <table id="velocity-table-data">
          <thead>
            <tr id="velocity-table-header"></tr>
          </thead>
          <tbody id="velocity-table-container"></tbody>
        </table>
      </div>
    </div>
    <div id="pressureModal">
      <div id="modalButtonContainer">
        <button id="pressure-copy-button" title="Copy Data">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'><path d='M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z'/></svg>
        </button>
        <button id="pressure-close" title="Close">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><polygon fill-rule='evenodd' points='8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414'/></svg>
        </button>
      </div>
      <div id="pressureModal-content">
        <h3>Pressure (pa)</h3>
        <table id="pressure-table-data">
          <thead>
            <tr id="pressure-table-header"></tr>
          </thead>
          <tbody id="pressure-table-container"></tbody>
        </table>
      </div>
    </div>
    <div id="dragModal">
      <div id="dragModal-content">
        <h3>Drag any following object you want</h3>
        <div id="shape-box">
          <div id="rectangle" draggable="true">
            <?xml version='1.0' ?><svg width='55' height='30' xmlns='http://www.w3.org/2000/svg'>
              <rect height='25' opacity='0.2' rx='' width='3.5rem' x='1' y='1'/><rect fill='none' height='25' rx='' stroke='#B02D24' stroke-linecap='round' stroke-linejoin='round' stroke-width='4' width='50' x='3' y='3'/>
            </svg>
          </div>
          <div id="ellipse" draggable="true">
            <svg width='55' height='30' style='enable-background:new 0 0 592.7 442;' version='1.1' viewBox='0 0 470.7 442' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
              <ellipse cx='270' cy='220' rx='350' ry='180' style='fill:#CBCBCB;stroke:#B02D24;stroke-width:50'></ellipse>
            </svg>
          </div>
          <div id="triangle" draggable="true">
            <svg width='55' height='30' style='enable-background:new 0 0 592.7 442;' version='1.1' viewBox='0 0 1660 800' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
              <polygon points='150,800 1600,800 850,100' style='fill:#CBCBCB;stroke:#B02D24;stroke-width:70' />
            </svg>
          </div>
          <div id="airfoil" draggable="true">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 33.05616 8.7382908" version="1.1" id="airfoli-svg" xml:space="preserve"><defs id="defs1"/>
              <g id="layer1" transform="translate(-86.353251,-139.72725)"><g id="g10">
                <path style="fill:#cbcbcb;fill-opacity:1;stroke:#b02b24;stroke-width:0.965;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.843468,143.78111 c 0,0 0.341795,-0.82621 0.645615,-1.27929 0.303818,-0.45309 0.474715,-0.53305 0.740558,-0.79957 0.265841,-0.26652 0.911455,-0.63965 1.310216,-0.82621 0.398763,-0.18656 1.063366,-0.34647 1.55707,-0.42643 0.493706,-0.08 1.177298,-0.23987 1.671002,-0.23987 0.493707,0 1.082355,0 1.595047,0 0.512696,0 1.519093,0.08 1.97482,0.13326 0.455732,0.0533 1.063367,0.10661 1.784936,0.18657 0.721568,0.08 1.538079,0.21322 2.145718,0.39977 0.60764,0.18657 2.1837,0.58636 2.62044,0.69296 0.43673,0.10661 2.14572,0.71961 2.69639,0.82622 0.55067,0.10661 2.03178,0.63964 2.75336,0.87952 0.72156,0.23985 1.99381,0.79956 2.44953,1.01277 0.45572,0.21321 2.24066,0.87951 2.44954,0.98612 0.20888,0.10661 1.31021,0.53305 1.80392,0.7196 0.49371,0.18657 1.5001,0.58636 2.22167,0.98613 0.72157,0.39978 1.36718,0.69296 1.65202,0.90618 0.28483,0.21321 -3.87369,-0.5064 -3.87369,-0.5064 0,0 -4.74717,-0.58634
                   -5.08897,-0.69295 -0.34179,-0.1066 -1.59504,-0.31982 -2.4875,-0.37313 -0.89247,-0.0533 -1.72797,-0.23986 -2.37359,-0.23986 -0.64561,0 -2.44953,0.0533 -3.00021,0.0533 -0.55067,0 -1.80392,-0.08 -2.487513,0 -0.683591,0.08 -2.69639,0.0533 -3.114139,0.0267 -0.417754,-0.0267 -1.784934,0.13326 -2.297631,0.18656 -0.512692,0.0533 -1.727966,0.08 -2.145717,0.15992 -0.417749,0.08 -1.196285,0.13325 -1.652013,0.18656 -0.455727,0.0533 -1.310217,0.13327 -1.784934,-0.15991 -0.474716,-0.29318 -0.949433,-0.42643 -1.177297,-0.87952 -0.227864,-0.45309 -0.474716,-0.74625 -0.512694,-1.09273 -0.03798,-0.34649 -0.07595,-0.82622 -0.07595,-0.82622 z" id="path1"/></g><path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" 
                    d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" id="path2" transform="scale(0.26458333)"/><path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" 
                    d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" id="path3" transform="scale(0.26458333)"/>
                    <path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" 
                    id="path4" transform="scale(0.26458333)"/><path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" 
                    id="path5" transform="scale(0.26458333)"/>
                <path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" id="path6" transform="scale(0.26458333)"/>
                <path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" id="path7" transform="scale(0.26458333)"/>
                <path style="fill:none;stroke-width:0.3;stroke-linecap:round;stroke-linejoin:bevel;stroke-dashoffset:2.66;stroke-opacity:0.983287;paint-order:fill markers stroke" d="m 422.24909,569.91358 c -1.44375,-0.31343 -12.81786,-1.96575 -19.09426,-2.77384 -4.18745,-0.53913 -8.6468,-1.19104 -9.90968,-1.4487 -3.09662,-0.63178 -6.48158,-1.14001 -8.82204,-1.32455 -1.06347,-0.0839 -3.18439,-0.31075 -4.71314,-0.5042 -1.9142,-0.24224 -5.14981,-0.35095 -10.39308,-0.34919 -13.20369,0.004 -29.26954,0.26628 -31.8853,0.51972 -1.38535,0.13423 -4.53953,0.39461 -7.00929,0.57863 -2.46976,0.18402 -5.9588,0.51743 -7.75342,0.74091 -1.79462,0.22348 -4.46695,0.41981 -5.93852,0.43629 -2.67084,0.0299 -2.67891,0.0283 -4.56016,-0.93683 -2.50444,-1.28479 -3.31634,-2.05818 -4.4984,-4.28508 -0.82275,-1.55 -1.01487,-2.1759 -1.12831,-3.67575 -0.1353,-1.78901 -0.12462,-1.83206 1.03577,-4.1744 0.94715,-1.91191 1.50845,-2.6937 2.92074,-4.06808 1.8795,-1.82905 4.49554,-3.46813 6.96719,-4.36529 0.8469,-0.30741 3.04352,-0.86279 4.88138,-1.23419 3.18254,-0.64313 3.65211,-0.6746 9.86744,-0.6612 5.43211,0.0117 7.52072,0.12472 12.46139,0.67431 3.26453,0.36313 7.12568,0.91043 8.58034,1.21622 3.57697,0.75191 13.71159,3.49292 17.8719,4.83363 1.86109,0.59976 4.41706,1.36445 5.67994,1.69932 3.86638,1.02522 11.48354,3.69576 15.69801,5.50365 4.62382,1.98349 11.55169,4.80904 17.76845,7.2469 5.43855,2.13269 8.26128,3.3905 11.48965,5.11977 2.24625,1.2032 2.44065,1.3566 1.6919,1.33503 -0.46527,-0.0134 -1.0091,-0.0598 -1.2085,-0.10308 z" id="path8" transform="scale(0.26458333)"/>
              </g>
            </svg>
          </div>
        </div>
        <div id="draw-box">
          <h3>Draw any polygons you want except rectangle, circle, triangle</h3>
          <canvas id="drawing"></canvas>
          <button id="add-object">Add Object</button>
        </div>
        <div id="coordinates-box">
          <h3>Or you can pass the coordinates of the polygon that you want</h3>
          <p style="color: red">
            NOTES: Please put numbers in two columns. Values should be less than
            10.
          </p>
          <textarea id="coordinates"></textarea>
          <button id="add">Add</button>
        </div>
      </div>
      <button id="dragModalClose">Close</button>
    </div>
    <div id="shapeModal">
      <div id="shapeModal-content">
        <h4>Properties</h4>
        <form id="change-form"></form>
      </div>
      <button id="save">Save</button>
      <button id="shapeModalClose">Close</button>
    </div>

    <div id="heatfluxModal">
      <div id="modalButtonContainer">
        <button id="heatflux-copy-button" title="Copy Data">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'><path d='M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z'/></svg>
        </button>
        <button id="heatflux-close" title="Close">
        <?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><polygon fill-rule='evenodd' points='8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414'/></svg>
        </button>
      </div>
      <div id="heatfluxModal-content">
        <h3>Heat Flux (W/m<sup>2</sup>)</h3>
        <table id="heatflux-table-data">
          <thead>
            <tr id="heatflux-table-header"></tr>
          </thead>
          <tbody id="heatflux-table-container"></tbody>
        </table>
      </div>
    </div>

    <div id="sensorModal">
      <div id="modalButtonContainer">
        <button id="sensor-close"><?xml version='1.0' ?><svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'><polygon fill-rule='evenodd' points='8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414'/></svg></button>
      </div>
      <div id="sensorModal-content">
        <p>Drag and drop sensors on the model</p>
          <div id="sensor-options">
            <figure>   
              <div draggable="true" id="drag-thermometer"  style="z-index: 1; width: 12px; height: 36px; margin:auto; display: flex; align-items: center;">
                <img src = "${labDistPath}lab/images/thermometer.svg" alt="Thermometer SVG" width="12px" height="24px"/>           
              </div>
              <figcaption>Thermometer</figcaption>
            </figure>
            <figure>
              <div draggable="true" id="drag-anemometer"  style="z-index: 1; width: 36px; height: 36px; margin:auto; display: flex; align-items: center;">
                <img src = "${labDistPath}lab/images/anemometer.svg" alt="Anemometer SVG"/>
              </div>
              <figcaption>Anemometer</figcaption>
            </figure>
            <figure>
              <div draggable="true" id="drag-heatflux"  style="z-index: 1; width: 36px; height: 36px; margin:auto; display: flex; align-items: center;">
                <img src = "${labDistPath}lab/images/heatFlux.svg" alt="Heatflux SVG" width="36px" height="12px"/>
              </div>
              <figcaption>Heatflux</figcaption>
            </figure>
            <figure>
              <div draggable="true" id="drag-barometer"  style="z-index: 1; width: 12px; height: 36px; margin:auto; display: flex; align-items: center;">
                <img src = "${labDistPath}lab/images/barometer.svg" alt="Barometer SVG" width="12px" height="24px"/>
              </div>
              <figcaption>Barometer</figcaption>
            </figure>
        </div>
      </div>
    </div>

    <script src="${labDistPath}lab/lab.js"></script>

    <script src="${labDistPath}/scripts/extract_data.js" defer></script>
    <script src="${labDistPath}/scripts/drag_sensor.js" defer></script>
    <script src="${labDistPath}/scripts/drag_object.js" defer></script>
    <script src="${labDistPath}/scripts/draw_object.js" defer></script>
    <script src="${labDistPath}/scripts/coordinates.js" defer></script>

    <script>
      Lab.config.rootUrl = "${labDistPath}lab";
      // sharing won't work so disable it
      Lab.config.sharing = false;
      // Keep Embeddable namespace to be consistent with lab/embeddable.html
      window.Embeddable = {
        controller: new Lab.InteractivesController(null, '#interactive-container')
      };
    </script>
    </body>
  </html>
`;
