/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 25/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , domInfo = { tag: 'div', id: rs.layoutRoot, style: { position: 'absolute', margin: 0, border: 0, padding: 0, height: '100%', width: '100%', overflow: 'auto', background: ns.Layout.coreStyle.background },
            children: [
                { tag: 'div', id: rs.rootRegion, style: { position: 'absolute', margin: 0, border: 0, padding: 0, top:'5px', right:'5px', bottom:'5px', left:'5px', overflow: 'hidden', background: ns.Layout.coreStyle.background } },
                { tag: 'div', id: rs.floatingRegionAnchor, style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.coreStyle.background } },
                { tag: 'div', id: rs.dialogBoxAnchor, style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.coreStyle.background } }
            ]
        }
        ;


    ns.Layout = function(layoutConfig){

        ns.Dom.call(this, domInfo);
        //clear body
        if(document.body.hasChildNodes()){
            var children = document.body.childNodes;
            for(var i = children.length - 1; i > -1; i--){
                document.body.removeChild(children[i]);
            }
        }

        document.body.appendChild(this.dom);
    };


    ns.Layout.coreStyle = {
        background: '#333',
        splitterWidth: '4px',
        tabHeight: '20px',
        headerHeight: '20px'
    };


    ns.Layout.prototype = Object.create(ns.Dom.prototype);


})(NS);