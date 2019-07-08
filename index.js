'use strict';

const ab = new rp.Autobind();

ab.addEventHandler('clickTest', function(e) {
    console.log(this);
    console.log(e.type);
    console.log(e.currentTarget);
    console.log('event handled');
});

ab.assignAutoboundEventHandlers();
