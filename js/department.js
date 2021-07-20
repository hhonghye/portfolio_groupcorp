/*---------- 이벤트등록 ----------*/

$(document).ready(function() {
    subTitle("#story");
});

//scroll subTitle event
$(window).on("scroll", function(){
    subTitle("#story");
    subTitle("#organization");
});