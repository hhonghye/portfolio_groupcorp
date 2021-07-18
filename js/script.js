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

headerTabFocus();

/*---------- 이벤트등록 ----------*/
//리사이즈
// $(window).resize(function(){
//     console.log($(document).width());
// });

//header
$gnb_li.on("mouseenter", openSub);
$gnb_li.on("mouseleave", closeSub);
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

var swiper = new Swiper('#client .swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: 500,
    direction:'horizontal',
    centeredSlides: true, //가운데 패널을 화면 중앙에 위치
    slidesPerView: 'auto',  //개별슬라이더의 고정 너비값 적용
    coverflowEffect: {
        rotate: 0, //슬라이더 회전 각
        stretch: 80, //슬라이더 사이 거리
        depth: 400, //깊이효과
        modifier:1,  //효과 배수
        slideShadows: false, //슬라이더그림자
    },
    navigation:{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
    // autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false, //스와이프 후 자동재생
    // }
});