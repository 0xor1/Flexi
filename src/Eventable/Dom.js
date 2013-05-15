/**
 * User: 0xor1    http://github.com/0xor1
 * Date: 23/04/13
 */

(function(NS){

    var ns = window[NS] = window[NS] || {}
        , rs = {}
        ;

    //Resource strings
    rs._ = '_';
    rs.prfx = rs._ + NS + rs._;
    rs.classPrfx = NS.toLowerCase() + '-';


    /**
     * The base class for all Dom Controls
     *
     * @class Dom
     * @extends Eventable
     * @param {Object} domInfo An object specifying how to generate the html for this particular type of control
     * @constructor
     */
    ns.Dom = function(domInfo){

        ns.Eventable.call(this);

        this.dom = ns.Dom.domGenerator(domInfo);

    };


    ns.Dom.prototype = Object.create(ns.Eventable.prototype);

    /**
     * Throws an error, subclasses must overwrite if they require this functionality
     *
     * @method addChild
     */
    ns.Dom.prototype.addChild = function(){
        throw new Error("Dom object does not implement addChild method");
    }

    /**
     * Throws an error, subclasses must overwrite if they require this functionality
     *
     * @method removeChild
     */
    ns.Dom.prototype.removeChild = function(){
        throw new Error("Dom object does not implement removeChild method");
    }

    /**
     * Calls the parents removeChild method pasing itself as a parameter
     *
     * @method removeSelf
     */
    ns.Dom.prototype.removeSelf = function(){
        if(this.parent){
            this.parent.removeChild(this);
        }
        return this;
    };

    ns.Dom.prototype.getRoot = function(){
        var root = this;
        while(root.parent){
            root = root.parent;
        }
        return root;
    };

    /**
     * Disposes of this object
     *
     * @method dispose
     */
    ns.Dom.prototype.dispose = function(){
        this.removeSelf();
        if(this.dom.parentNode){ //just in case something went wrong
            this.dom.parentNode.removeChild(this.dom);
        }
        ns.Eventable.prototype.dispose.call(this);
    };

    /**
     * Generates html from a domInfo object
     *
     * @static
     * @method domGenerator
     * @param {Object} domInfo An object describing the structure of the html to generate
     * @returns {HTMLElement} The generated html
     */
    ns.Dom.domGenerator = function(domInfo){
        if(!domInfo){return null;}
        var dom = document.createElement(domInfo.tag || 'div');
        ns.Dom.style(dom, domInfo.style);
        if(domInfo.class){
             ns.Dom.addClass(dom, domInfo.class);
        }
        dom.className += " " + NS.toLowerCase();
        if(domInfo.id){
            dom.id = prfx(domInfo.id);
        }
        if(domInfo.children && domInfo.children.length > 0){
            for(var i = 0, l = domInfo.children.length; i < l; i++){
                dom.appendChild(ns.Dom.domGenerator(domInfo.children[i]));
            }
        }
        return dom;
    }

    /**
     * Styles HTMLElements
     *
     * @static
     * @method style
     * @param {HTMLElement} dom The html to style
     * @param {Object} style An object describing the style of the HTMLElement
     */
    ns.Dom.style = function(dom, style){
        for(var i in style){
            if(style.hasOwnProperty(i)){
                dom.style[i] = style[i];
            }
        }
    }

    /**
     * Add a class to the HTMLElement
     *
     * @static
     * @method addClass
     * @param {HTMLElement} dom The element to add the class to
     * @param {String} name the class name to add
     */
    ns.Dom.addClass = function(dom, name){
        if(!dom.className){
            dom.className = "";
        }
        dom.className += " " + prfx(name);
    }

    /**
     * prefix a string with the namespace for this lib
     *
     * @private
     * @method prfx
     * @param className
     * @returns {String} the prefixed string
     */
    function prfx(className){
        return rs.classPrfx + className;
    }


})(NS);