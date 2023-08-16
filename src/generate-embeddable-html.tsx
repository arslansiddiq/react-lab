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
        <button id="copy-button">Copy the data</button>
        <button id="close">Close</button>
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
        <button id="velocity-copy-button">Copy the data</button>
        <button id="velocity-close">Close</button>
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
        <button id="pressure-copy-button">Copy the data</button>
        <button id="pressure-close">Close</button>
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
          <div id="rectangle" draggable="true"></div>
          <div id="ellipse" draggable="true"></div>
          <div id="triangle" draggable="true"></div>
          <div id="airfoil" draggable="true"></div>
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
        <h4>Changing Size</h4>
        <form id="change-form"></form>
      </div>
      <button id="save">Save</button>
      <button id="shapeModalClose">Close</button>
    </div>

    <div id="heatfluxModal">
      <div id="modalButtonContainer">
        <button id="heatflux-copy-button">Copy the data</button>
        <button id="heatflux-close">Close</button>
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
