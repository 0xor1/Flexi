/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 29/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

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
            ;

        if(orientation === 'vertical'){
            className = 'vertical-split-region';
            variableSide = 'width';
            fixedSide = 'height';
        }
        domInfo.class = className;
        domInfo.children[0].style[variableSide] = domInfo.children[2].style[variableSide] = 'calc(50% - ' + sWidth + 'px)';
        domInfo.children[1].style[variableSide] = (sWidth * 2) + 'px';
        domInfo.children[0].style[fixedSide] = domInfo.children[1].style[fixedSide] = domInfo.children[2].style[fixedSide] = '100%';

        ns.Dom.call(this, domInfo);

        this.orientation = orientation;
        this.parent = null;
        this.firstChild = firstChild;
        this.secondChild = secondChild;

    };


    ns.SplitRegion.prototype = Object.create(ns.Dom.prototype);


    ns.SplitRegion.prototype.removeChild = function(child){



    };

})(NS);