/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 25/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = {
            tag: 'div',
            id: rs.layoutRoot,
            class: rs.layoutRoot,
            style: {
                position: 'absolute',
                margin: 0,
                border: 0,
                padding: 0,
                height: '100%',
                width: '100%',
                overflow: 'auto',
                background: ns.Layout.coreStyle.background
            },
            children: [
                /*
                regionRoot, floatingRegionAnchor, dialogBoxAnchor,
                //NOTE: must be able to name regions to give floating region tabs relevant names, default to numbers but allow users to easily write a name in to floating region title box.
                 */
            ]
        }
        ;

    ns.Layout = function(){
        //clear body
        if(document.body.hasChildNodes()){
            var children = document.body.childNodes;
            for(var i = children.length; i > -1; i--){
                document.body.removeChild(children[i]);
            }
        }


    };

    ns.Layout.coreStyle = {
        background: '#333',
        splitterWidth: '4px',
        tabHeight: '20px',
        headerHeight: '20px'
    };
    ns.Layout.prototype = Object.create(TODO.prototype);

})(NS);