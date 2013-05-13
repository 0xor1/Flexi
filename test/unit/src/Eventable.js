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
            for(var i = 0; i < 4; i++){//repeat this again to make sure event contracts cannot be duplicated
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

    test("Eventable life cycle",function(){

        var listener = new ns.Eventable()
            , dispatcher1 = new ns.Eventable()
            , dispatcher2 = new ns.Eventable()
            , setMeToTrue1 = false
            , setMeToTrue2 = false
            , fn1 = function(event){
                setMeToTrue1 = true

            }
            , fn2 = function(event){
                setMeToTrue2 = true;
            }
            , event1 = 'event1'
            , event2 = 'event2'
            ;

        listener.on(dispatcher1, event1, fn1);
        listener.on(dispatcher2, event2, fn2);
        dispatcher1.fire({type: event1});
        dispatcher2.fire({type: event2});
        ok(setMeToTrue1 && setMeToTrue2, "Eventable.on attaches event and eventable.fire fires the event.");

        setMeToTrue1 = false;
        setMeToTrue2 = false;
        listener.off(dispatcher1, event1, fn1);
        dispatcher1.fire({type: event1});
        dispatcher2.fire({type: event2});
        ok(!setMeToTrue1 && setMeToTrue2, "Eventable.off(obj, type, fn) removes the specified event contract.");

        setMeToTrue1 = false;
        setMeToTrue2 = false;
        listener.on(dispatcher1, event1, fn1);
        listener.off(dispatcher2);
        dispatcher1.fire({type: event1});
        dispatcher2.fire({type: event2});
        ok(setMeToTrue1 && !setMeToTrue2, "Eventable.off(obj) removes event contracts associated with the object.");

        setMeToTrue1 = false;
        setMeToTrue2 = false;
        listener.on(dispatcher2, event2, fn2);
        listener.off(event1);
        dispatcher1.fire({type: event1});
        dispatcher2.fire({type: event2});
        ok(!setMeToTrue1 && setMeToTrue2, "Eventable.off(type) removes event contracts associated with the type.");

        setMeToTrue1 = false;
        setMeToTrue2 = false;
        listener.on(dispatcher1, event1, fn1);
        listener.off(fn2);
        dispatcher1.fire({type: event1});
        dispatcher2.fire({type: event2});
        ok(setMeToTrue1 && !setMeToTrue2, "Eventable.off(fn) removes event contracts associated with the function.");

        setMeToTrue1 = false;
        setMeToTrue2 = false;
        listener.on(dispatcher2, event2, fn2);
        listener.off();
        dispatcher1.fire({type: event1});
        dispatcher2.fire({type: event2});
        ok(!setMeToTrue1 && !setMeToTrue2, "Eventable.off() removes all event contracts.");
    });

})(NS);