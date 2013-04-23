/**
 * User: 0xor1  http://github.com/0xor1
 * Date: 20/04/13
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        , rs = ns.rs
        , objId = 0
        , freedObjIds = []
        , fnId = 0
        , freedFnIds = []
        ;


    ns.Eventable = function(){
        this._id = getAnUnusedObjId();
        //following properties are only created when they are first required to save on unnecessary memory usage
        //this._eventContracts
        //this._eventContractQueues
    };


    ns.Eventable.prototype = {


        id: function(){
            return this._id;
        },


        on: function(obj, type, fn){

            var queues = obj._eventContractQueues = obj._eventContractQueues || {}
                , queue = queues[type] = queues[type] || []
                , contracts = this._eventContracts = this._eventContracts || {}
                , contract = new EventContract(this, obj, type, fn)
                ;

            if(contracts[contract.key] === 'undefined'){
                queue.push(contract);
                (typeof fn[rs.fnUsageCount] === 'number') ? fn[rs.fnUsageCount]++ : fn[rs.fnUsageCount] = 1;
                contracts[contract.key] = contract;
                if(queue.isDispatching){
                    queue.numListenersAdded++;
                }
            }

            return this;
        },


        off: function(obj, type, fn){

            if(!this._eventContracts){return this;}

            var contract = this._eventContracts[EventContract.generateKey(obj, type, fn)]
                , queue
                , idx
                ;

            if(!contract){return this;}

            queue = obj._eventContractQueues[type];
            idx = queue.indexOf(contract);

            if(queue.isDispatching){
                queue.updated = true;
                queue.removedIndexes.push(idx);
            }
            queue.splice(idx, 1);
            fn[rs.fnUsageCount]--;
            if(fn[rs.fnUsageCount] === 0){
                freeFnId(fn);
            }
            delete this._eventContracts[contract.key];

            return this;
        },


        fire: function(event){

            if(typeof this._eventContractQueues === 'undefined'){
                return;
            }

            var queue = this._eventContractQueues[event.type];

            if(typeof queue !== 'undefined'){

                if(queue.isDispatching){
                    return;
                }

                queue.isDispatching = true;
                queue.dispatchQueueUpdated = false;
                queue.removedIndexes = [];
                queue.numListenersAdded = 0;

                event.obj = this;

                for(var i = 0, l = queue.length; i < l; i++){
                    if(queue.dispatchQueueUpdated){
                        l = queue.length - queue.numListenersAdded;
                        var iOld = i;
                        for(var j = 0, k = queue.removedIndexes.length; j < k; j++){
                            if(queue.removedIndexes[ j ] < iOld){
                                i--;
                            }
                        }
                        queue.removedIndexes = [];
                        queue.dispatchQueueUpdated = false;
                    }
                    queue[i].fulfill(event);
                }
                queue.isDispatching = false;
            }

            return this;
        },


        dispose: function(){

            var contracts = this._eventContracts;

            if(contracts){
                for(var key in contracts){
                    if(contracts.hasOwnProperty(key)){
                        contracts[key].finalise();
                    }
                }
            }

            var queues = this._eventContractQueues;

            if(queues){
                for(var i in queues){
                    if(queues.hasOwnProperty(i)){
                        var queue = queues[i];
                        var l = queue.length;
                        for(var j = 0; j < l; j++){
                            queue[j].finalise();
                        }
                    }
                }
            }
            freedObjIds.push(this._id);
            for(i in this){
                if(this.hasOwnProperty(i)){
                    delete this[i];
                }
            }
        }
    };


    function freeFnId(fn){
        freedFnIds.push(fn[rs.fnId]);
        delete fn[rs.fnId];
    }


    function getAnUnusedFnId(){
        return (freedFnIds.length > 0) ? freedFnIds.pop() : fnId++;
    }


    function getAnUnusedObjId(){
        return (freedObjIds.length > 0) ? freedObjIds.pop() : objId++;
    }


    var EventContract = (function(){

        function EventContract(owner, obj, type, fn){
            this.owner = owner;
            this.obj = obj;
            this.type = type;
            this.fn = fn;
            this.key = EventContract.generateKey(obj, type, fn);
        }

        EventContract.prototype.fulfill = function(arg){
            this.fn.call(this.owner, arg);
        };

        EventContract.prototype.finalise = function(){
            this.owner.off(this.obj, this.type, this.fn);
        };

        EventContract.generateKey = function(obj, type, fn){
            var fnId = fn[rs.fnId] = (typeof fn[rs.fnId] === 'undefined') ? getAnUnusedFnId() : fn[rs.fnId];
            return rs._ + obj._id + rs._ + type + rs._ + fnId;
        };

        return EventContract;
    })();


})(NS);