      
   function toTop(){
        window.scrollTo('0','0');
        $(".rTop").hide();
    }
	 function weixin(obj){
    try{
        var rng = document.body.createTextRange();

        rng.moveToElementText(obj);

        rng.scrollIntoView();

        rng.select();

        rng.execCommand("Copy");
        // 支持pc端
        rng.collapse(false);
        /*alert("已经复制到粘贴板!你可以使用Ctrl+V 贴到需要的地方去了!");*/
        //弹出已复制的框  
         
    $('#weixin_gong').show();
    var maskHeight = $("body").height() > $(window).height() ? $("body").height() : $(window).height()
 
    $('#shadow').css("height", maskHeight).show();

    }catch(e){
        /* alert("QQ群号：118025994 ");*/
        //弹出二维码信息
    var fade = $("#fade");
    var maskHeight = $("body").height() > $(window).height() ? $("body").height() : $(window).height()
    fade.css("height", maskHeight).show();
    $('#light_copy').show();
    }

}
// close
function closeWindow(){
  $('#light_copy,#fade,#weixin_gong,#shadow,#qq_gong,#qq_copy').hide();
}
  function copyTex(obj){
    try{
        var rng = document.body.createTextRange();

        rng.moveToElementText(obj);

        rng.scrollIntoView();

        rng.select();

        rng.execCommand("Copy");

        rng.collapse(false);
 
       /* alert("已经复制到粘贴板!你可以使用Ctrl+V 贴到需要的地方去了!");*/
   $('#qq_gong').show();
   var maskHeight = $("body").height() > $(window).height() ? $("body").height() : $(window).height()
 
    $('#shadow').css("height", maskHeight).show();
    }catch(e){
        /* alert("微信公众号：申请中，暂缺");*/
        $('#qq_copy').show();
        var maskHeight = $("body").height() > $(window).height() ? $("body").height() : $(window).height()
    $('#fade').css("height", maskHeight).show();
    }
}
    // var d=document.documentElement.clientHeight;
    // console.log(d);
    // $('.butt_bg').css('height',d+1)


