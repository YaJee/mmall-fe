/*
* @Author: yajie
* @Date:   2018-04-06 18:06:32
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-06 18:38:14
*/

'use strict';

var _mm = require('util/mm.js');
var _product = {
    //检查登录状态
    getProductList   : function(listParam,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        })
    },
    getProductDetail   : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        })
    }

    
    
}
module.exports = _product;