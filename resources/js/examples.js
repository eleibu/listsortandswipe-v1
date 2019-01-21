require('bootstrap');

import { monitorWinWidth } from './monitor-win-width.js';
import { pageMenuShowHide } from './page-menu-show-hide.js';
import { lithiumlist } from './lithiumlist-1.0.0.js';

import Prism from 'prismjs';
Prism.highlightAll();


var outerContSimpleFixedheight = document.getElementById('outerCont-simple-fixedheight');
var listContSimpleFixedheight = document.getElementById('listCont-simple-fixedheight');
if (outerContSimpleFixedheight && listContSimpleFixedheight) {
    lithiumlist.attachToList(
        '123456789',
        outerContSimpleFixedheight,
        listContSimpleFixedheight,
        'listItem'
    );
}
