'use strict';

const autoboundEventHandlers = {
    addEventHandler: function(name, fn) {
        this[name] = fn;
    }
}

const assignAutoboundEventHandlers = function() {
    const convertToArray = function (str, delimiter = ',') {
        if (str === null) {
            throw `convertToArray() failed with null 'str' argument`;
        }
        return str.split(delimiter).map(arg => arg.trim());
    }

    const actionElements = Array.from(document.querySelectorAll('*[data-events]'));

    actionElements.forEach(element => {
        const currentElement = element;
        const confirmFunctionsExist = function(functions) {
            functions.map(fn => {
                if (autoboundEventHandlers[fn] === null || typeof autoboundEventHandlers[fn] !== 'function') {
                    throw `This autobound handler was not found: ${fn}`;
                }
            })
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
                    // Otherwise, use the order position of the event name to 
                    // determine the handler. 
                    else {
                        handlerName = functions[index];
                    }
                    
                    console.log(element);
                    autoboundEventHandlers[handlerName].call(element, e);                    
//                    autoboundEventHandlers[handlerName](e);                    
                });
            })
        }        

        const events = convertToArray(element.getAttribute('data-events'));
        const functions = convertToArray(element.getAttribute('data-handlers'));

        confirmFunctionsExist(functions);
        assignElementEventHandlers(events);
    })
}    




