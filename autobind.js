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
        const confirmFunctionsExist = function(functions) {
            functions.map(fn => {
                if (autoboundEventHandlers[fn] === null || typeof autoboundEventHandlers[fn] !== 'function') {
                    throw `This autobound handler was not found: ${fn}`;
                }
            })
        }
        
        const assignElementEventHandlers = function(events) {
            events.map((event, index) => {
                element.addEventListener(event, (e) => {
                    const handlerName = functions[index];
                    autoboundEventHandlers[handlerName].call(element, e);
                });
            })
        }        

        const events = convertToArray(element.getAttribute('data-events'));
        const functions = convertToArray(element.getAttribute('data-handlers'));

        confirmFunctionsExist(functions);
        assignElementEventHandlers(events);
    })
}    




