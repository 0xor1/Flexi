/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 16/05/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    //just used to wrap the control in a div element with 100% width and height and auto overflow and store the name and icon
    ns.ControlWrapper = function(control, name, icon){

        ns.Dom.call(this,{ class: 'control-wrapper', style: { width: '100%', height: '100%', background: '#fff', overflow: 'auto'} });

        this.control = control;
        this.name = name;
        this.icon = icon;

        this.domRoot().appendChild(control.domRoot());
    };


    ns.ControlWrapper.prototype = Object.create(ns.Dom.prototype);


})(NS);