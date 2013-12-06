( function() {
    var $deviceList;

    //Find device list element when page loads
    //And in case it has already loaded, do the find now
    window.onload = function() {
        $deviceList = $("#device-list");
        //$deviceList = document.getElementById("#device-list");
    };
    $deviceList = $("#device-list");
    //$deviceList = document.getElementById("#device-list");    

    vwf_view.ticked = function() {
        //Query to see if any devices are connected
    };

    vwf_view.firedEvent = function ( nodeID, eventName, eventParameters ) {
        if ( eventName === "deviceConnected" ) {

            var deviceID = eventParameters[ 1 ];
            $deviceList.append(
                "      <li>\n" +
                "        <form>\n" +
                "          <h2>" + deviceID + "</h2>\n" +
                "          <h3>Properties</h3>\n" +
                "          <ul>\n" +
                "            <li>Property Name: <input type='text' value='3'></li>\n" +
                "          </ul>\n" +
                "          <h3>Methods</h3>\n" +
                "          <ul>\n" +
                "            <li>Method Name:</li>\n" +
                "            <ul>\n" +
                "              <li>Parameter Name: <input type='text' placeholder='3'></li>\n" +
                "              <li><button class='btn'>Call</button></li>\n" +
                "            </ul>\n" +
                "          </ul>\n" +
                "          <h3>Events</h3>\n" +
                "          <ul>\n" +
                "            <li>Event Name: Last called at 13:03 on 12-4-2013</li>\n" +
                "          </ul>\n" +
                "        </form>\n" +
                "      </li>"
            );

            // vwf_view.kernel.getProperties( deviceID, 0, function( props ) {
            //     for ( var prop in props ) {}
            // } );
        }
    };
} )(); //@ sourceURL=index.js