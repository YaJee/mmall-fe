/*
* @Author: yajie
* @Date:   2018-04-05 21:55:15
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-05 23:49:51
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
        this.bindEvent();

    },
    onLoad : function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit',function(){
            var userInfo = {
               phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res,msg){
                    _mm.successTips(msg);
                    //window.location.href = './user-center.html';
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips(validateResult.msg);
            }
        })
    }
    ,
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            //console.log(userHtml);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    validateForm : function(formData){
        var result = {
            status : false,
            msg : ''

        };
         // 验证手机号
        if(!_mm.validata(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validata(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validata(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validata(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
    
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})