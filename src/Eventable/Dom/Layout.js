/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 25/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , sWidth = ns.Layout.coreStyle.splitterWidth + 'px'
        , domInfo = { tag: 'div', id: rs.layoutRoot, style: { position: 'absolute', margin: 0, border: 0, padding: 0, height: '100%', width: '100%', overflow: 'auto', background: ns.Layout.coreStyle.background },
            children: [
                { tag: 'div', id: rs.rootRegion, style: { position: 'absolute', margin: 0, border: 0, padding: 0, top: sWidth, right: sWidth, bottom: sWidth, left: sWidth, overflow: 'hidden', background: ns.Layout.coreStyle.background } },
                { tag: 'div', id: rs.floatingRegionAnchor, style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.coreStyle.background } },
                { tag: 'div', id: rs.dialogBoxAnchor, style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.coreStyle.background } }
            ]
        }
        , htmlAndBodyStyle = {
            position: 'absolute',
            overflow: 'hidden',
            margin: 0,
            border: 0,
            padding:0,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
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
        //style doc element
        ns.Dom.style(document.documentElement, htmlAndBodyStyle);
        //style body element
        ns.Dom.style(document.body, htmlAndBodyStyle);
        //draw layout to page
        document.body.appendChild(this.dom);
    };


    ns.Layout.coreStyle = {
        background: '#333',
        splitterWidth: '4',
        tabHeight: '20px',
        headerHeight: '20px'
    };


    ns.Layout.prototype = Object.create(ns.Dom.prototype);


})(NS);