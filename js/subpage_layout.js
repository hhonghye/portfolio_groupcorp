/*---------- Dom Caching ----------*/
//header
const $header_sub = $("#header_sub");
const $gnb = $("#gnb");
const $gnb_li = $gnb.children("li");
const $gnb_li_ul = $gnb_li.children("ul");
const $btn_call = $header_sub.find(".btn_call");
//햄버거메뉴
const $menu_mobile = $header_sub.find(".menu_mobile");
let speed = 200;

headerTabFocus();

/*---------- 이벤트등록 ----------*/
//리사이즈
// let resize;
// $(window).resize(function(){
//     resize = $(document).width();
// });

//header
$gnb_li.on("mouseenter", openSub);
$gnb_li.on("mouseleave", closeSub);
$(window).on("scroll", function(){
    if($(window).scrollTop()==0){
        $header_sub.removeClass("on");
    }else{
        $header_sub.addClass("on");
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
    $header_sub
        .prepend(
            $("<div class='bgGnb'>")
                .css({
                    width: "100%",
                    height: 250,
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    borderBottom: "1px solid #efefef",
                    display:"none"
                })
        );

    if($(document).width() > 1189){
        $header_sub.addClass("on");
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
        if($(window).scrollTop()==0) $header_sub.removeClass("on");
    }
}
function subTitle(target){
    var currentPos = $(window).scrollTop();

    if(currentPos >= $(target).offset().top - 600){
        $(target).find(".subTitle").addClass("on");
    }else{
        $(target).find(".subTitle").removeClass("on");
    }
}

//tab focusEvent
function headerTabFocus(){
    $gnb_li.each(function(index){
        $gnb_li.eq(index).find("a").first().on("focusin", function(){
            openSub();
        });
        $gnb_li.eq(index).find("a").last().on("focusout", function(){
            closeSub();
        });
    });
}