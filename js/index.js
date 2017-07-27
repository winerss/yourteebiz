function addLoad(func) {
    var oldLoad = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldLoad();
            func();
        }
    }
}
function changeAngle() {
    $("#pro-list ul").find("li img").each(function () {
        $(this).click(function () {
            var src = $(this).attr("src");
            $("#cloth").attr("src", src);
        });
    });
}
function changeColor() {
    $(".pro-color .color").find("span").each(function () {
        $(this).click(function () {
            $("#cloth").css("backgroundColor", $(this).css("backgroundColor"));
            $("#pro-list img").css("background", $(this).css("backgroundColor"))
        });
    });
}
addLoad(changeColor);
function changeButton() {
    var len1 = $(".pro-style").find("button").length;
    for (var i = 0; i < len1; i++) {
        (function (arg) {
            $(".pro-style button")[i].onclick = function () {
                $(this).addClass("activeBtn");
                $(this).parent(".col-md-4").siblings(".col-md-4").children("button").removeClass("activeBtn");
                var a = $(".switch-sex button:nth-child(1)");
                if (a.attr("class") == "activeBtn") {
                    ajaxman(arg);
                } else {
                    ajaxwoman(arg);
                }
                changeSex(arg)
            };
           
        })(i);
    }
    var len3 = $(".pro-category").find("button").length;
    for (var i = 0; i < len3; i++) {
        (function (arg) {
            $(".pro-category button")[i].onclick = function () {
                $(this).addClass("activeBtn");
                $(this).parent(".col-md-4").siblings(".col-md-4").children("button").removeClass("activeBtn");
                category(arg);
            }
        })(i)
    }
}
addLoad(changeButton);
function category(arg){
    switch(arg){
        case 0:
        $(".pro-color .color1").show();
        $(".pro-color .color2").hide();
        $(".pro-color .color3").hide();
        $(".pro-color .color4").hide();
        break;
        case 1:
        $(".pro-color .color2").show();
        $(".pro-color .color1").hide();
        $(".pro-color .color3").hide();
        $(".pro-color .color4").hide();
        break;
        case 2:
        $(".pro-color .color1").hide();
        $(".pro-color .color2").hide();
        $(".pro-color .color3").show();
        $(".pro-color .color4").hide();
        break;
        default:
        $(".pro-color .color1").hide();
        $(".pro-color .color2").hide();
        $(".pro-color .color3").hide();
        $(".pro-color .color4").show();
    }
}
function changeSex(sta) {
    var len2 = $(".switch-sex").find("button").length;
    for (var i = 0; i < len2; i++) {
        (function (arg) {
            $(".switch-sex button")[i].onclick = function () {
                $(this).addClass("activeBtn");
                $(this).parent(".col-md-4").siblings(".col-md-4").children("button").removeClass("activeBtn");
                if (arg == 1) {
                    ajaxwoman(sta);
                } else {
                    ajaxman(sta);
                }
            };
        })(i);
    }
}
addLoad(changeSex);
function ajaxman(j) {
    $.getJSON("js/data.json", function (data) {
        $("#cloth").attr("src", data['man'][j][0]);
        var len = data['man'][j].length;
        for (var i = 0; i < len; i++) {
            $("#pro-list ul li:nth-child(" + (i + 1) + ") img").attr("src", data['man'][j][i]);
        }
        changeAngle();
    });
}
function ajaxwoman(j) {
    $.getJSON("js/data.json", function (data) {
        $("#cloth").attr("src", data['woman'][j][0]);
        var len = data['woman'][j].length;
        for (var i = 0; i < len; i++) {
            $("#pro-list ul li:nth-child(" + (i + 1) + ") img").attr("src", data['woman'][j][i]);
        }
        changeAngle();
    });
}  
function ajaxInit(){
    ajaxman(0);
    changeSex(0)
}
addLoad(ajaxInit);
function ajustImg(){
    $("#preview").click(function(){
        $(".preview-box").css({
            background:"rgba(0,0,0,0.6)",
            border:"1px solid #ebebeb"
        });
        zoom();
        rotate();
        ailgn();
        _delete();
        imgAngle();
        drag();
    })
}
function _delete(){
    $(".delete").click(function(){
        $(".preview-box").remove();
        myrefresh();
    })
}
function zoom(){
    $(".zoom button:nth-child(1)").click(function(){
        if($("#preview").width()>50){
            $("#preview").css({
                width: $("#preview").width()*0.9,
                height: $("#preview").height()*0.9
            }) 
        }
    })
    $(".zoom button:nth-child(2)").click(function(){
        $("#preview").css({
            width: "100px",
            height: '100px'
        })
    })
    $(".zoom button:nth-child(3)").click(function(){
        $("#preview").css({
            width: "160px",
            height: '160px'
        })
    })
    $(".zoom button:nth-child(4)").click(function(){
        $("#preview").css({
            width: "200px",
            height: '200px'
        })
    })
    $(".zoom button:nth-child(5)").click(function(){
        if($("#preview").width()<260){
            $("#preview").css({
                width: $("#preview").width()*1.1,
                height: $("#preview").height()*1.1
            })
        }
    })
    //ailgn();
}
function rotate(){
    var deg=0;
    $(".rotate button:nth-child(1)").click(function(){
        deg-=20;
        $("#preview img").css({
            transform:'rotate('+deg+'deg)'
        }) 
    })
    $(".rotate button:nth-child(2)").click(function(){
        $("#preview img").css({
            transform:'rotate(0deg)'
        }) 
    })
    $(".rotate button:nth-child(3)").click(function(){
        $("#preview img").css({
            transform:'rotate(90deg)'
        }) 
    })
     $(".rotate button:nth-child(4)").click(function(){
        $("#preview img").css({
            transform:'rotate(180deg)'
        }) 
    })
    $(".rotate button:nth-child(5)").click(function(){
        deg+=20;
        $("#preview img").css({
            transform:'rotate('+deg+'deg)'
        }) 
    })
    //ailgn();
}
function ailgn(){
    $(".ailgn button:nth-child(1)").click(function(){
        $("#preview").animate({
            marginTop:"0px"
        })
    })
    $(".ailgn button:nth-child(2)").click(function(){
        $("#preview").animate({
            marginTop: (460-$("#preview").height())+"px"
        }) 
    })
    $(".ailgn button:nth-child(3)").click(function(){
        $("#preview").animate({
            marginLeft: "0"
        }) 
    })
    $(".ailgn button:nth-child(4)").click(function(){
        $("#preview").animate({
            marginLeft: (300-$("#preview").width())+"px"
        }) 
    })
    $(".ailgn button:nth-child(5)").click(function(){
        $("#preview").animate({
            marginLeft: (300-$("#preview").width())/2+"px"
        }) 
    })
    $(".ailgn button:nth-child(6)").click(function(){
        $("#preview").animate({
            marginTop: (460-$("#preview").height())/2+"px"
        }) 
    })
}
function myrefresh()
{
   window.location.reload();
}
function imgAngle(){
    $("#pro-list ul li:not(1)").click(function(){
        $(".preview-box").css("display","none")
    })
    $("#pro-list ul li:nth-child(1)").click(function(){
        $(".preview-box").css("display","block")
    })
}
addLoad(imgAngle)
function complete(position){
    $(".complete").click(function(){
         var X = $('#preview').offset().top; 
         var Y = $('#preview').offset().left; 
         var W=$("#preview").width();
         var H=$("#preview").height();
        $(".preview-box").css({background:"none",border:"none"});
    })
}
addLoad(complete);
function drag() {
    var obj = $('#preview');
    obj.bind('mousedown', start);
    function start(e) {
        $(".preview-box").bind({
            'mousemove': move,
            'mouseup': stop
        });
        return false;
    }
    function move(e) {
        obj.css({
            "marginLeft": (e.pageX-obj.width()-240),
            "marginTop": (e.pageY-obj.height()-40)
        });
        return false;
    }
    function stop() {
        $(".preview-box").unbind({
            'mousemove': move,
            'mouseup': stop
        });
    }
}


function changeSource(){
    $(".modal-body img").click(function(){
        img="<img class='img-responsive' src="+$(this).attr("src")+">";
        $("#preview").empty().append(img);
    })
    ajustImg();
}
addLoad(changeSource);
function comfirm(){
    $("#comfirm").click(function(){
        img='<img class="img-responsive" src='+$(".croppedImg").attr("src")+'>'
        $("#preview").empty().append(img)
    })
}
addLoad(comfirm)
