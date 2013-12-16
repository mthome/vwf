( function() {
    var initialized = false;
    var deviceList;
    var $deviceContainer;

    //Find device list element when page loads
    //And in case it has already loaded, do the find now
    window.onload = function() {
        $deviceContainer = $("#device-list");
        //$deviceContainer = document.getElementById("#device-list");
    };
    $deviceContainer = $("#device-list");
    //$deviceContainer = document.getElementById("#device-list");    

    vwf_view.ticked = function() {
        if ( !initialized ) {
            //Query to see if any devices are connected
            var deviceIDs = vwf_view.kernel.findDevices( "", "/*" );
            initialized = true;
        }
    };

    vwf_view.createdProperty = function ( nodeID, propertyName, propertyValue ) {
        vwf_view.initializedProperty(nodeID, propertyName, propertyValue);
    }

    vwf_view.initializedProperty = function ( nodeID, propertyName, propertyValue ) {
        vwf_view.satProperty(nodeID, propertyName, propertyValue);
    }

    vwf_view.satProperty = function ( nodeID, propertyName, propertyValue ) {
        if( propertyName === "myNumber" ) {
            var nodeIDAttr = $.encoder.encodeForAlphaNumeric(nodeID);
            if( $("#myNumber-" + nodeIDAttr)[ 0 ] ) {
                $("#myNumber-" + nodeIDAttr)[ 0 ].textContent = propertyValue;
            }
        }
    }

    vwf_view.firedEvent = function( nodeID, eventName, eventParameters ) {
        var deviceID = eventParameters[ 1 ];
        var deviceIDAttr = $.encoder.encodeForAlphaNumeric(deviceID);
        switch( eventName ) {
            case "deviceConnected":
                var propertiesListName = "properties-" + deviceIDAttr;
                var methodsListName = "methods-" + deviceIDAttr;
                var eventsListName = "events-" + deviceIDAttr;
                var callButtonName = "callButton-" + deviceIDAttr;
                $deviceContainer.append(
                    "      <li>\n" +
                    "        <div class='device'>" +
                    "          <h2>" + deviceID + "</h2>\n" +
                    "          <h3>Properties</h3>\n" +
                    "          <ul id=" + propertiesListName + ">\n" +
                    "            <li>myNumber: <span id='myNumber-" + deviceIDAttr + "'>0</span></li>\n" +
                    "          </ul>\n" +
                    "          <h3>Methods</h3>\n" +
                    "          <ul id=" + methodsListName + ">\n" +
                    "            <li>doSomething:</li>\n" +
                    "            <ul>\n" +
                    "              <li>myParameter: <input type='text' placeholder='3' /></li>\n" +
                    "              <li>\n" +
                    "                <button id='" + callButtonName + "' class='btn'>\n" +
                    "                  Call\n" +
                    "                </button>\n" +
                    "              </li>\n" +
                    "            </ul>\n" +
                    "          </ul>\n" +
                    "          <h3>Events</h3>\n" +
                    "          <ul id=" + eventsListName + ">\n" +
                    "            <li>myEvent:\n" +
                    "              <span id='myEvent-" + deviceIDAttr + "'>\n" +
                    "                Has not been called\n" +
                    "              </span>\n" +
                    "            </li>\n" +
                    "          </ul>\n" +
                    "        </div>" +
                    "      </li>"
                );
                $("#" + callButtonName ).click( function() {
                    vwf_view.kernel.callMethod( deviceID, "doSomething" );
                } );
                break;
            case "myEvent":
                $("#myEvent-" + deviceIDAttr)[ 0 ].textContent = "Last fired " +Date();
                break;
        }
    };
} )(); //@ sourceURL=index.js