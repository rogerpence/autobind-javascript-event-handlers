### Declarative DOM element event handlers 

There are great JavaScript libraries ([React](https://reactjs.org/) and [Vue.js](https://vuejs.org/), for example) that take a lot of the pain out of wiring up DOM element event handlers. Vue.js, especially, is good way to easily add declarative event handlers to your projects. 

However, for many simple projects those libraries are just too heavy. This article provides a simple, declarative way to assign multiple DOM element event handlers using custom HTML attributes. 

[GitHub repo](https://github.com/rogerpence/autobind-javascript-event-handlers)
[Online demo](https://rogerpence.github.io/autobind-javascript-event-handlers/)


#### Assigning event names and handlers

Consider the following anchor tag which needs two event handlers, one for its client event and another for its focus event. 

    <a role="search" 
        data-events="click, focus" 
        data-handlers="toggleSearchPanel, buttonFocused" 
        class="search icon action-button " 
        href="#"><svg>...</svg>
    </a>

Events are assigned with a comma-separated list in the `data-events` attribute. You can assign one or event names as needed. 

Event handlers are assigned with a comma-separated list the `data-handlers` attribute. The event handlers positions correspond to the event names. That is, the first handler is assigned to the first event and so on. If you assign a single handler when multiple `data-events` have been declared, that single handler is used for all events declared.

#### Creating event handlers

Using the example, here's how you'd assign the event handlers 

    'use strict';

    const ab = new rp.Autobind();

    ab.addEventHandler('toggleSearchPanel', function(e) {
        ...
        ... Code here to toggle search panel.
        ...
        );
    });

    ab.addEventHandler('buttonFocused', function(e) {
        ...
        ... Code here for when button is focused.
        ...
        );
    });

    ab.assignAutoboundEventHandlers();

These handlers receive the corresponding event from the event's target element. If event handlers are declared as traditional JavaScript functions, the handlers context is set to the event target element as well (that is, `this` within an event handler references its target element). The `this` context isn't set if you use arrow functions to declare the event handlers. 

#### Binding the event handlers

After the page is loaded, call `assignAutoboundEventHandlers()` to bind the event names to their handlers:  

    assignAutoboundEventHandlers() 

to bind the handlers to the corresponding events. JavaScript exceptions are thrown if the assigned handlers don't exist in the `autoBoundHandlers` object. 

That's all it takes. The autobound handlers will now react to the assigned events. 

#### How assignAutoboundEventHandlers works

`assignAutoboundEventHandlers` has just a few main areas: 

* The `convertToArray()` function converts a comma-delimited string to an array. The delimiter is an optional second argument.

* `actionElements` is an array of HTML elements that have a `data-events` attribute.

* A `forEach` iterates over each element to assign event the event handlers. Inside that loop: 

    * `confirmFunctionsExist()` confirms that each function listed in the `data-handlers` attribute is a function in the `autoEventHandlers` object. An exception is thrown for the first one that doesn't exist. 

    * `assignElementEventHandlers()` iterates over each event name specified in the `data-events` attribute and assigns the specified event handler to the specified event. 

    * In `assignElementEventHandlers()` the following line calls the event handler in the `autoboundEventHandlers` object.
    
            autoboundEventHandlers[handlerName].call(element, e);

        JavaScript's `call` is used so that the target element is passed as the context of the event handler.         





