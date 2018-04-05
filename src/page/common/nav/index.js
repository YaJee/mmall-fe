/*
* @Author: yajie
* @Date:   2018-03-05 22:51:05
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-05 18:25:53
*/
'use strict';
require('./index.css'); 
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {

    init : function () {
       
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //登出事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        })

    },
    //加载用户信息
    loadUserInfo : function(){
            _user.checkLogin(function(res){
                console.log(res);
                $('.user.not-login').hide().siblings('.user.login').show()
                    .find('.username').text(res.username);
            },function(errMsg){
                   //do nothing
            });
    },
    loadCartCount :function(){
            _cart.getCartCount(function(res){
                $('.nav .cart-count').text(res || 0);
            },function(errMsg){
                $('.nav .cart-count').text(0);
            });
    }
};

module.exports = nav.init();