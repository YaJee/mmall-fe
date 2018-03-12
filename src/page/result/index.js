/*
* @Author: yajie
* @Date:   2018-03-12 21:01:02
* @Last Modified by:   yajie
* @Last Modified time: 2018-03-12 21:59:13
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');

    $element.show()
}
)