/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 16/05/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    // place holder just for dev testing
    ns.DummyControl = function(){
        var splitterColor = ns.Layout.style.colors.splitter.toStyle()
            , grabColor = ns.Layout.style.colors.grabber.toStyle()
            ;

        ns.Dom.call(this,{
            class: 'dummy-control', style: { color: grabColor, background: splitterColor, height: '100%', width: '100%'},
            children: [
                { prop: 'content', tag: 'span', class: 'some-user-provided-content'}
            ]
        });
        this.dom.content.innerHTML = '#' + this.id();
    };

    ns.DummyControl.prototype = Object.create(ns.Dom.prototype);

})(NS);