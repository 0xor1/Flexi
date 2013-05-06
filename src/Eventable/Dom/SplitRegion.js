/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 29/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {};

    ns.SplitRegion = function(firstChild, secondChild, orientation){

        var sWidth = ns.Layout.style.splitterWidth / 2
            , domInfo = { tag: 'div', style: { position: 'absolute', width: '100%', height: '100%', padding: 0, margin: 0, border: 0, overflow: 'hidden' },
                children: [
                    { tag: 'div', class: 'split-chunk', style: { position: 'relative', overflow: 'hidden'} },
                    { tag: 'div', class: 'splitter', style: { position: 'relative', overflow: 'hidden'} },
                    { tag: 'div', class: 'split-chunk', style: { position: 'relative', overflow: 'hidden'} }
                ]
            }
            , className = 'horizontal-split-region'
            , variableSide = 'height'
            , fixedSide = 'width'
            , float = ''
            , display = 'block';

        if(orientation === 'vertical'){
            className = 'vertical-split-region';
            variableSide = 'width';
            fixedSide = 'height';
            float = 'left';
            display = 'inline-block'
        }
        domInfo.class = className;
        domInfo.children[0].style[variableSide] =
            domInfo.children[2].style[variableSide] = 'calc(50% - ' + sWidth + 'px)';
        domInfo.children[1].style[variableSide] = (sWidth * 2) + 'px';
        domInfo.children[0].style[fixedSide] =
            domInfo.children[1].style[fixedSide] = domInfo.children[2].style[fixedSide] = '100%';
        domInfo.children[0].style.float = domInfo.children[1].style.float = domInfo.children[2].style.float = float;
        domInfo.children[0].style.display =
            domInfo.children[1].style.dsiplay = domInfo.children[2].style.display = display;

        ns.Dom.call(this, domInfo);

        this.orientation = orientation;
        this.parent = null;
        this.firstChild = firstChild.removeSelf();
        this.firstChild.parent = this;
        this.secondChild = secondChild.removeSelf();
        ;
        this.secondChild.parent = this;

        insertChildDom.call(this, firstChild, 0);
        insertChildDom.call(this, secondChild, 1)

    };


    ns.SplitRegion.prototype = Object.create(ns.Dom.prototype);

    ns.SplitRegion.prototype.addChild = function(child, idx){
        child.removeSelf();
        if(!this.firstChild){
            this.firstChild = child;
            this.firstChild.parent = this;
            insertChildDom.call(this, child, 0);
            return this;
        }
        if(!this.secondChild){
            this.secondChild = child;
            this.secondChild.parent = this;
            insertChildDom.call(this, child, 1);
            return this;
        }
        throw new Error('Cant add a new child as both childs slots are currentl occupied.');
    };

    //TODO
    ns.SplitRegion.prototype.removeChild = function(child){
        if(this.firstChild === child){
            this.firstChild = null;
            child.parent = null;
            this.dom.children[0].removeChild(child.dom);
        }
        if(this.secondChild === child){
            this.secondChild = null;
            child.parent = null;
            this.dom.children[2].removeChild(child.dom);
        }
    };


    function insertChildDom(child, idx){
        idx = (idx === 0) ? 0 : 2;
        this.dom.children[idx].appendChild(child.dom);
    }


})(NS);