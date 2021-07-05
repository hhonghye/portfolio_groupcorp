/*---------- Dom Caching ----------*/
//header
const $header = $("#header");
const $gnb = $("#gnb");
const $gnb_li = $gnb.children("li");
const $gnb_li_ul = $gnb_li.children("ul");
const $btn_call = $header.find(".btn_call");
//햄버거메뉴
const $menu_mobile = $header.find(".menu_mobile");
let speed = 200;


/*---------- 이벤트등록 ----------*/
//리사이즈
// $(window).resize(function(){
//     console.log($(document).width());
// });

//header
$header.on("mouseenter", openSub);
$header.on("mouseleave", closeSub);
$(window).on("scroll", function(){
    if($(window).scrollTop()==0){
        $header.removeClass("on");
    }else{
        $header.addClass("on");
    }
    
});

//햄버거메뉴
$btn_call.on("click", function(e){
    e.preventDefault();
    let isOn = $(this).hasClass("on");
    if(isOn){
        $(this).removeClass("on");
        $menu_mobile.removeClass("on");
    }else{
        $(this).addClass("on");
        $menu_mobile.addClass("on");
    }
});

/*---------- 함수정의 ----------*/
//header
function openSub(){
    $header
        .prepend(
            $("<div class='bgGnb'>")
                .css({
                    width: "100%",
                    height: 300,
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    display:"none"
                })
        );

    if($(document).width() > 1189){
        $header.addClass("on");
        $(".bgGnb").stop().slideDown(speed); 
        $gnb_li_ul.stop().slideDown(speed);
    }

}
function closeSub(){
    if($(document).width() > 1189){
        $(".bgGnb").stop().slideUp(speed, function(){
            $(this).remove();
        });
        $gnb_li_ul.stop().slideUp(speed);
        if($(window).scrollTop()==0) $header.removeClass("on");
    }
}
