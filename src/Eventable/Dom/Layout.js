/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 25/04/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , OnlyOneLayoutRootPerPage
        ;

    ns.Layout = function(layoutConfig){

        if(OnlyOneLayoutRootPerPage){
            return OnlyOneLayoutRootPerPage;
        }

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

        OnlyOneLayoutRootPerPage = this;
    };


    function Color(r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    Color.prototype = {
        toStyle: function(){
            return "rgb("+this.r+", "+this.g+", "+this.b+")";
        }
    };
    

    ns.Layout.coreStyle = {
        colors: {
            splitter: new Color(48,48,48),
            header: new Color(0,0,0),
            tabBar: new Color(0,0,0),
            tab: new Color(70,70,70),
            selectedTab: new Color(150, 70, 0)
        },
        splitterWidth: '4',
        tabHeight: '20px',
        headerHeight: '20px'
    };


    ns.Layout.prototype = Object.create(ns.Dom.prototype);


    var sWidth = ns.Layout.coreStyle.splitterWidth + 'px'
        , domInfo = { tag: 'div', id: rs.layoutRoot, style: { position: 'absolute', margin: 0, border: 0, padding: 0, height: '100%', width: '100%', overflow: 'auto', background: ns.Layout.coreStyle.colors.splitter.toStyle() },
            children: [
                { tag: 'div', id: rs.rootRegion, style: { position: 'absolute', margin: 0, border: 0, padding: 0, top: sWidth, right: sWidth, bottom: sWidth, left: sWidth, overflow: 'hidden', background: ns.Layout.coreStyle.colors.splitter.toStyle() } },
                { tag: 'div', id: rs.floatingRegionAnchor, style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.coreStyle.colors.splitter.toStyle() } },
                { tag: 'div', id: rs.dialogBoxAnchor, style: { position: 'absolute', margin: 0, border: 0, padding: 0, right:'100%', height: '100%', width: '100%', overflow: 'visible', background: ns.Layout.coreStyle.colors.splitter.toStyle() } }
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


})(NS);