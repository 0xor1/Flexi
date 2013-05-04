(function(NS){

    var ns = window[NS] = window[NS] || {}
        ;

    module("Eventable");

    var objs
        , str = ""
        , fn = function(event){
            str += this.id();
        }
        , type = "anEvent";

    test("Eventables can listen to and fire events, and be disposed of.", function(){
        function simpleRunThrough(){
            str = "";
            objs = [];
            for(var i = 0; i < 4; i++){
                objs[i] = new ns.Eventable();
            }
            for(var i = 0; i < 4; i++){
                (i !== 3) ? objs[i].on(objs[i + 1], type, fn) : objs[i].on(objs[0], type, fn);
            }
            for(var i = 0; i < 4; i++){
                objs[i].fire({type: type});
            }
            strictEqual(str, "3012", "Objects are assigned unique incremental id's, and can listen to and fire events. and Event functions are called in the context of the object which setup the event contract");
            for(var i = 3; i > -1; i--){
                objs[i].dispose();
            }
        }

        simpleRunThrough();
        simpleRunThrough();
        str = "";
        objs = [];
    });

    test("Eventables can stop listening for events after they have been hooked up.", function(){
        var obj1 = new ns.Eventable()
            , obj2 = new ns.Eventable();

        str = "";
        obj1.on(obj2, type, fn);
        obj2.fire({type: type});
        strictEqual(str, "0", "Object is listening.");

        str = "";
        obj1.off(obj2, type, fn);
        obj2.fire({type: type});
        strictEqual(str, "", "Object is not listening.");

        str = "";
        obj1.on(obj2, type, fn);
        obj1.dispose();
        obj2.fire({type: type});
        strictEqual(str, "", "Object is not listening after being disposed of.");

    });

})(NS);