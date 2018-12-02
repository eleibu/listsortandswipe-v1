require('bootstrap');

import { lithiumlistPro } from './lithiumlist-pro-1.0.0.js';

var listCont = document.getElementById('div-list-cont');
var eventsTarget = document.getElementById('div-body');

// function(listCont, scrollCont, eventsTarget, listItemClass, listProperties)

var listProperties = {
	sortDragHandleClass: 'budicon-grab-ui',
	leftDragHandleClass: 'budicon-reload-ui',
	rightDragHandleClass: 'budicon-trash'
};

lithiumlistPro.attachToList(
    listCont,
    window,
    eventsTarget,
    'listitem-cont',
    listProperties
);

// lithiumlistPro.setDefaults({delay: 200});

// lithiumlistPro.detach(listCont);