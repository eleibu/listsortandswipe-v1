require('bootstrap');

import { lithiumlist } from './lithiumlist-1.0.0.js';

lithiumlist.attachToList(
    '123456789',
    document.getElementById('outerCont'),
    document.getElementById('listCont'),
    'listItem',
    {
        ignoreOnClick: ['#listItem']
    }
);
