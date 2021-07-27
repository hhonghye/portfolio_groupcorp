/*---------- Dom Caching ----------*/
/*-- header --*/
const $header = $("#header");
const $gnb = $("#gnb");
const $gnb_li = $gnb.children("li");
const $gnb_li_ul = $gnb_li.children("ul");
const $btn_call = $header.find(".btn_call");
//햄버거메뉴
const $menu_mobile = $header.find(".menu_mobile");
let speed = 200;
/*-- main visual --*/
const $visual = $("#visual");
const $mainVid = $visual.find("figure").find("video");
const $visualTab = $visual.find(".tab");
const $visualTab_ul_li = $visualTab.children("ul").children("li");


/*---------- 함수호출 ----------*/
//header
headerTabFocus();
visualTabVid()

/*---------- 이벤트등록 ----------*/
//리사이즈
// $(window).resize(function(){
//     console.log($(document).width());
// });

/*-- skipNavi --*/
$("#skipNavi a").on("focusin", function(){
    $(this).addClass("on");
});
$("#skipNavi a").on("focusout", function(){
    $(this).removeClass("on");
});

/*-- header --*/
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


/*-- scroll event --*/
$(window).on("scroll", function(){

    sectionTitle("#introduce");
    subContent("#introduce");

    subContent("#product");

    sectionTitle("#history");
    subContent("#history");

    sectionTitle("#service");
    subContent("#service");

    sectionTitle("#client");

});

/*---------- 함수정의 ----------*/
/*-- header --*/
//header
function openSub(){
    $header
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

/*-- visual --*/

function visualTabVid(){
    $visualTab_ul_li.eq(0).on("click", function(){
        vidChange(0);
    });
    $visualTab_ul_li.eq(1).on("click", function(){
        vidChange(1);
    });
    $visualTab_ul_li.eq(2).on("click", function(){
        vidChange(2);
    });
    $visualTab_ul_li.eq(3).on("click", function(){
        vidChange(3);
    });
}
function vidChange(i){
    //newVid에 새로운 영상 태그 등록
    var newVid = `<figure class="newVid">
                        <video src="img/main/visual/visual_vid_${i}.mp4" loop muted autoplay></video> 
                    </figure>`;
    //추가되어있던 newVid를 제거
    $visual.find(".newVid").fadeOut(function(){
        this.remove();
    });
    //newVid를 oldVid 앞에 추가
    $visual.prepend(newVid);
    //oldVid 사라지게함
    $visual.find(".defaultVid").fadeOut(function(){
        this.remove();
    });
}

/*-- sub --*/
//scroll event sectionTitle
function sectionTitle(target){
    var currentPos = $(window).scrollTop();

    if(currentPos >= $(target).offset().top - 500){
        $(target).find(".inner").find(".sectionTitle").addClass("on");

    }else{
        $(target).find(".inner").find(".sectionTitle").removeClass("on");
    }

}
//scroll event subContent
function subContent(target){
    var currentPos = $(window).scrollTop();

    if(currentPos >= $(target).offset().top - 500){
        $(target).find(".inner").find("article").addClass("on");

        //introduce span(btn)
        if(target == "#introduce") $(target).find(".inner").find("span").addClass("on");
        //history
        if(target == "#history"){
            //counter
            counter(".count1", 120, 20);
            counter(".count2", 95, 35);
            counter(".count3", 550, 5);
            //img
            $(target).find(".pic").addClass("on");
        }

    }else{
        $(target).find(".inner").find("article").removeClass("on");

        //introduce span(btn)
        $(target).find(".inner").find("span").removeClass("on");
        //history img
        $(target).find(".pic").removeClass("on");
    }

    //product title
    (currentPos >= $("#product").offset().top - 700) ? $("#product").addClass("on") : $("#product").removeClass("on");
    
}
//service counter
function counter(el, num, time){
    var item = $(el);
    var current_num = parseInt(item.text());
    var count_num = num - current_num;

    if(current_num >= num) return;

    var timer = setInterval(function(){
        current_num++;

        if(current_num >= num){
            clearInterval(timer);
        }

        item.text(current_num);
    }, time);   

    
}
//swiper 연결
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
    autoplay: {
        delay: 3000,
        disableOnInteraction: false, //스와이프 후 자동재생
    }
});