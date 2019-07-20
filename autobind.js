"use strict";

var rp = rp || [];

rp.Autobind = function() {
    this.autoboundEventHandlers = {};
}

rp.Autobind.prototype.addEventHandler = function(name, fn) {
    this.autoboundEventHandlers[name] = fn;
}

rp.Autobind.prototype.assignAutoboundEventHandlers = function() {
    const convertToArray = function (str, delimiter = ',') {
        if (str === null) {
            throw `convertToArray() failed with null 'str' argument`;
        }
        return str.split(delimiter).map(arg => arg.trim());
    }

    const actionElements = Array.from(document.querySelectorAll('*[data-events]'));

    actionElements.forEach(element => {
        const self = this;
        const confirmFunctionsExist = function(functions) {
            functions.map(fn => {
                if (self.autoboundEventHandlers[fn] === null || typeof self.autoboundEventHandlers[fn] !== 'function') {
                    throw `This autobound handler was not found: ${fn}`;
                }
            }, self)
        }
        
        const assignElementEventHandlers = function(events) {
            events.map((event, index) => {
                let handlerName;
                element.addEventListener(event, (e) => {
                    // If only one hander name is provided, assign it 
                    // for every event declared. 
                    if (functions.length = 1) {
                        handlerName = functions[0];
                    }
                    // Otherwise, use the ordinal position of the event name to 
                    // determine the handler. 
                    else {
                        handlerName = functions[index];
                    }

                    // Using call explicitly sets 'this' in the called handler function
                    // to the target element. Beware that you'll not get the window object as 
                    // `this` if the handler function was defined as an arrow function.
                    // That said, 'this' isn't really necessary in the handler function because
                    // you can use the e.currentTarget in the handler function to get a reference
                    // to the target element.
                                         
                    self.autoboundEventHandlers[handlerName].call(element, e);                    
                });
            }, self)
        }        

        const events = convertToArray(element.getAttribute('data-events'));
        const functions = convertToArray(element.getAttribute('data-handlers'));

        confirmFunctionsExist(functions);
        assignElementEventHandlers(events);
    }, this)
}    

