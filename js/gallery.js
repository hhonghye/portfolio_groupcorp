
var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";

getFlickr(url,"-ajm");


/*--------이벤트등록--------*/


//이미지 클릭시 팝업 뜨는 이벤트
$("body").on("click", "#gallery .list li a", function(e){
    e.preventDefault();
    var img_src = $(this).attr("href");
    createPopup(img_src);

});

//팝업 close 클릭 이벤트
$("body").on("click", ".popup .close", function(){
    $(".popup").fadeOut(300, function(){
        $(".popup").remove();
    });
    $("body").css("overflow", "visible");
});

//서치 클릭 이벤트
$(".search_gallery button").on("click", function(){
    var tags = $(this).prev().val();

    getFlickr(url_search, "", tags);
});

//윈도우상에서 키보드 이벤트
$(window).on("keypress", function(e){
    // console.log(e.keyCode);
    if(e.keyCode == 13) {
        var tags = $(".search_gallery input[type=text]").val();

        getFlickr(url_search, "", tags);
    }

})


/*--------함수정의--------*/


//플리커api 함수
function getFlickr(url, id, search_tags){
    $.ajax({
        url: url,
        dataType: "json",
        data: {
            api_key: "3ebd2223315a5084a3e18bbe1f72735e",
            per_page: 30,
            format: "json",
            nojsoncallback: 1,
            user_id: id,
            tags: search_tags
        }
    })
    .success(function(data){
        var imgs = data.photos.photo;

        $("#gallery ul").empty();

        $(imgs).each(function(index, data){
            $("#gallery .list")
                .append(
                    $("<li>")
                        .append(
                            $("<a>")
                                .attr({
                                    href: "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+".jpg"
                                })
                                .append(
                                    $("<img>")
                                        .attr({
                                            src: "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+".jpg"
                                        })
                                ),
                                $("<h3>").text(data.title),
                                $("<p>").text("photo id - "+data.id)
                        )
                );
        });

        // setTimeout(function(){
        //     iso = new Isotope(".list",{
        //         itemSelector: ".list>li",
        //         columnWidth: ".list>li",
        //         transitionDuration: "0.5s",
        //         percentPosition: true,
        //         isPercent:true
        //     });
        //     $(".list").addClass("on");
        // },500);
        $(".list").addClass("on");

    
    })
    .error(function(err){
        console.log("이미지 데이터를 가져오지 못했습니다.");
    })
}

//팝업 생성 함수
function createPopup(img_src){
    $("body").append(
        $("<aside class='popup'>")
            .append(
                $("<img>").attr({src: img_src}),
                $("<span class='close'>").text("close")
            ).fadeIn(300)
    );
    $("body").css("overflow", "hidden");
}
