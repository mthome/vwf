vwf_view.ticked = function() {
    //Query to see if any devices are connected
}

vwf_view.firedEvent = function ( nodeID, eventName, eventParameters ) {
    if ( eventName === "deviceAdded" ) {
        //Query the device node to get information about it
        var dummy = 0;
    }
} //@ sourceURL=index.js