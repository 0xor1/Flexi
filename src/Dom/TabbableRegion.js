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
                { prop: 'header', class: 'header', style: { width: '100%', height: ns.Layout.style.headerHeight, background: ns.Layout.style.colors.header.toStyle()},
                    children: [
                        { prop: 'title', tag: 'span', class: 'title'}
                    ]
                },
                { prop: 'content', class: 'content', style: { width: '100%', top: ns.Layout.style.headerHeight, bottom: 0}},
                { prop: 'tabBar', class: 'tab-bar', style: { width: '100%', height: 0, bottom: 0, background: ns.Layout.style.colors.tabBar.toStyle()}}
            ]
        });

        this.currentTab = null;
        this.currentControl = controlWrapper;
        this.children = [controlWrapper];
        this.tabs = []; //TODO - create a new internal class ns.Tab to handle all duties, will be more complex than first thought
        this.dom.content.appendChild(controlWrapper.domRoot());
    };


    ns.TabbableRegion.prototype = Object.create(ns.Dom.prototype);


    ns.TabbableRegion.prototype.addControl = function(controlWrapper){
        if(!(controlWrapper instanceof ns.ControlWrapper)){throw new Error("Can only accept wrapped controls.");}
        this.children.push(controlWrapper);
        this.dom.tabBar.removeChild();//TODO - remove the only child
        this.dom.tabBar.appendChild();//TODO - TODO - TODO
        this.dom.tabBar.style.height = ns.Layout.style.tabHeight;
        this.dom.content.style.bottom = ns.Layout.style.tabHeight;
        this.dom.content.appendChild(controlWrapper.dom);
    };

    //replace with a full ns.Tab class
    function CreateTabDom(name, icon){
        var dom = ns.Dom.domGenerator({
            class: 'tab', style: { display: 'inline-block', float: 'left', height: ns.Layout.style.tabHeight, width: ns.Layout.style.tabWidth, background: ns.Layout.style.colors.tab.toStyle()}
        });
        dom.root.innerHTML = name;
        return dom;
    }

})(NS);