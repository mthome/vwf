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

    vwf_view.gotProperties = function( nodeID, properties ) {
        $propertyList = $( "#properties-" + nodeID );
        for ( var prop in properties ) {

        }
    }

    vwf_view.satProperty = function( nodeID, propertyName, propertyValue ) {
        if ( propertyName === "myNumber") {
            $("#myNumber-" + nodeID)[ 0 ].innerHtml = propertyValue;
        }
    }

    vwf_view.firedEvent = function( nodeID, eventName, eventParameters ) {
        switch( eventName ) {
            case "deviceConnected":
                var deviceID = eventParameters[ 1 ];
                var propertiesListName = "properties-" + deviceID;
                var methodsListName = "methods-" + deviceID;
                var eventsListName = "events-" + deviceID;
                $deviceContainer.append(
                    "      <li>\n" +
                    "        <form>\n" +
                    "          <h2>" + deviceID + "</h2>\n" +
                    "          <h3>Properties</h3>\n" +
                    "          <ul id=" + propertiesListName + ">\n" +
                    "            <li>myNumber: <span id='myNumber-" + deviceID + "'>0</span></li>\n" +
                    "          </ul>\n" +
                    "          <h3>Methods</h3>\n" +
                    "          <ul id=" + methodsListName + ">\n" +
                    "            <li>doSomething:</li>\n" +
                    "            <ul>\n" +
                    "              <li>myParameter: <input type='text' placeholder='3'></li>\n" +
                    "              <li>\n" +
                    "                <button class='btn' \n" +
                    "                        onclick='vwf_view.kernel.callMethod( " + deviceID + 
                                                     ", 'doSomething' )>\n" +
                    "                  Call\n" +
                    "                </button>\n" +
                    "              </li>\n" +
                    "            </ul>\n" +
                    "          </ul>\n" +
                    "          <h3>Events</h3>\n" +
                    "          <ul id=" + eventsListName + ">\n" +
                    "            <li>myEvent:\n" +
                    "              <span id='myEvent-" + deviceID + "'>\n" +
                    "                Has not been called\n" +
                    "              </span>\n" +
                    "            </li>\n" +
                    "          </ul>\n" +
                    "        </form>\n" +
                    "      </li>"
                );
                vwf_view.kernel.getProperties( deviceID );
                break;
            case "myEvent":
                $("#myEvent-" + nodeID)[ 0 ].innerHtml = "Last called at " +Date;
                break;
        }
    };
} )(); //@ sourceURL=index.js