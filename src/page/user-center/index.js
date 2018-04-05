/*
* @Author: yajie
* @Date:   2018-04-05 12:14:10
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-05 23:06:14
*/


'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {

    init : function  () {
        this.onLoad();

    },
    onLoad : function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            console.log(userHtml);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
}
$(function(){
    page.init();
})