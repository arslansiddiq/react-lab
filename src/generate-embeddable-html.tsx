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
    // <script src="${labDistPath}embeddable.js"></script>
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
        <button id="extract-temp">Show Temperature Data</button>
        <button id="extract-velocity">Show Velocity Data</button>
        <button id="extract-pressure">Show Pressure Data</button>
        <button id="extract-heatflux">Show Heat Flux Data</button>
        <button id="drag-sensor">Add New Sensor</button>
        <button id="drag-object">Add New Object</button>
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
        <button id="sensor-close">Close</button>
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
