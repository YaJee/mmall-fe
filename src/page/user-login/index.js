/*
* @Author: yajie
* @Date:   2018-03-04 12:14:10
* @Last Modified by:   yajie
* @Last Modified time: 2018-04-05 15:43:39
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm = require('util/mm.js');


// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //提交表单
        $('#submit').click(function(){
            _this.submit();
        });

        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        validateResult = this.formValidata(formData);
        if(validateResult.status){
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidata : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_mm.validata(formData.username,'require')){
              result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validata(formData.password,'require')){
              result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function(){
    page.init();
})


