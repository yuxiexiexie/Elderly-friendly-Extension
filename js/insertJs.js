


$(document).ready(function(a) {

    //加载页面首先清除设置的记录
    chrome.storage.local.clear();
   
    //在body增加十字星元素
    $('body').append('<div id="x_div"></div><div id="y_div"></div>');

    //设置十字星js
    function mouseMove(event){
        var event = window.event || event;
         var x_div = document.getElementById("x_div"),
             y_div = document.getElementById("y_div"), 
             top = event.clientY > 494,
             left = event.clientX > 750;
             
         x_div.style.top = event.clientY + "px";
         y_div.style.left = event.clientX + "px";
    }
    document.onmousemove = mouseMove; 

    //添加自定义鼠标
    const url = chrome.runtime.getURL('images/鼠标.png');
    $('body').append('<img src="' + url + '" alt="Cursor" class="lfy_cursor" />');

    //自定义鼠标跟随设置
    $("html").mousemove(function (e) {
      $(".lfy_cursor").show().css({
        "left": e.clientX,
        "top": e.clientY
      });
    }).mouseout(function () {
      $(".lfy_cursor").hide();
    });

});


var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ? "runtime" :"extension";

chrome[runtimeOrExtension].onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
  
    //接受popup消息-页面缩放
    if(request.type == 'page_size'){
        $('body').css('cssText','zoom:'+request.value+'%!important;');
        sendResponse({data:'0'});
    } 

    //接受popup消息-明亮暗黑模式切换
    if(request.type == 'switch1'){
        if(request.value==1){
          $('html').addClass('an');
        }
        if(request.value==0){
          $('html').removeClass('an');
        }
        sendResponse({data:'0'});
    } 

    //接受popup消息-设置亮色
    if(request.type == 'zi_color'){
        //添加全局文字三种亮色
        $('#lfycss').remove();
        $('body').append(`
            <style id="lfycss">
                /*亮色*/
                body.lfycolor *{
                  color: ${request.value}!important;
                }
            </style>
        `);
        if(!$('body').hasClass('lfycolor')){
            $('body').addClass('lfycolor')
        }
        sendResponse({data:'0'});
    } 

    //接受popup消息-设置鼠标大小
    if(request.type == 'shubiao_size'){
        $('.lfy_cursor').css('cssText','width:'+request.value+'px!important;height:'+request.value+'px!important;');
        sendResponse({data:'0'});
    } 


    //接受popup消息-设置十字星
    if(request.type == 'switch2'){
        if(request.value==1){
          $('body').addClass('showline');
        }
        if(request.value==0){
          $('body').removeClass('showline');
        }
        sendResponse({data:'0'});
    } 
    return true;
});


