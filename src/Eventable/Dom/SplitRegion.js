/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 29/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , sWidth = ns.Layout.coreStyle.splitterWidth / 2
        , verticalDomInfo = { tag: 'div', class: rs.verticalSplitRegion, style: { position: 'absolute', width: '100%', height: '100%', padding: 0, margin: 0, border: 0, overflow: 'hidden' },
            children: [
                { tag: 'div', class: rs.splitChunk, style: { position: 'relative', width: 'calc(50% - ' + sWidth + 'px)', height: '100%', overflow: 'hidden'} },
                { tag: 'div', class: rs.splitter, style: { position: 'relative', width: (sWidth * 2) + 'px)', height: '100%', overflow: 'hidden'} },
                { tag: 'div', class: rs.splitChunk, style: { position: 'relative', width: 'calc(50% - ' + sWidth + 'px)', height: '100%', overflow: 'hidden'} }
            ]
        }
        , horizontalDomInfo = { tag: 'div', class: rs.horizontalSplitRegion, style: { position: 'absolute', width: '100%', height: '100%', padding: 0, margin: 0, border: 0 },
            children: [
                { tag: 'div', class: rs.splitChunk, style: { position: 'relative', height: 'calc(50% - ' + sWidth + 'px)', width: '100%', overflow: 'hidden'} },
                { tag: 'div', class: rs.splitter, style: { position: 'relative', height: (sWidth * 2) + 'px)', width: '100%', overflow: 'hidden'} },
                { tag: 'div', class: rs.splitChunk, style: { position: 'relative', height: 'calc(50% - ' + sWidth + 'px)', width: '100%', overflow: 'hidden'} }
            ]
        };

    ns.SplitRegion = function(firstChild, secondChild, orientation){

        if(orientation === 'vertical'){
            ns.Dom.call(this, verticalDomInfo);
        }else{
            ns.Dom.call(this, horizontalDomInfo);
        }

        this.orientation = orientation;
        this.parent = null;
        this.firstChild = firstChild;
        this.secondChild = secondChild;

    };


    ns.SplitRegion.prototype = Object.create(ns.Dom.prototype);


    ns.SplitRegion.prototype.removeChild = function(child){



    };

})(NS);