/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 27/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    //TODO replace with actual implementation
    ns.TabbableRegion = function(controlWrapper){

        var bRad = ns.Layout.style.regionBorderRadius
        ns.Dom.call(this, {
            class: 'tabbable-region', style: { borderRadius: bRad, WebkitBorderRadius: bRad, MozBorderRadius: bRad, width:'100%', height:'100%'},
            children: [
                { class: 'region-header', style: { width: '100%', height: ns.Layout.style.headerHeight, background: ns.Layout.style.colors.header.toStyle()},
                    children: [
                        { tag: 'span', class: 'header-title'}
                    ]
                },
                { class: 'content-region', style: { width: '100%', top: ns.Layout.style.headerHeight, bottom: 0}},
                { class: 'tab-bar', style: { width: '100%', height: 0, bottom: 0, background: ns.Layout.style.colors.tabBar.toStyle()}}
            ]
        });

        this.children = [controlWrapper];
        this.dom.children[1].appendChild(controlWrapper.dom);
    };


    ns.TabbableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.TabbableRegion.prototype.addControl = function(controlWrapper){
        if(!(controlWrapper instanceof ns.ControlWrapper)){throw new Error("Can only accept wrapped controls.");}
        this.children.push(controlWrapper);
        this.dom.children[2].removeChild();//TODO - remove the only child
        this.dom.children[2].appendChild(CreateTabDom(controlWrapper.name, controlWrapper.icon));
        this.dom.children[2].style.height = ns.Layout.style.tabHeight;
        this.dom.children[1].style.bottom = ns.Layout.style.tabHeight;
        this.dom.children[1].appendChild(controlWrapper.dom);
    };


    function CreateTabDom(name, icon){
        var dom = ns.Dom.domGenerator({
            class: 'tab', style: { display: 'inline-block', float: 'left', height: ns.Layout.style.tabHeight, width: ns.Layout.style.tabWidth, background: ns.Layout.style.colors.tab.toStyle()}
        });
        dom.innerHTML = name;
        return dom;
    }

})(NS);