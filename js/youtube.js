
callData();

//썸네일 onclick 이벤트 등록
$("body").on("click", ".thumbnail a", function(e){
    e.preventDefault();
    var videoId = $(this).attr("href");
    createPopup(videoId);
    $("body").css({overflow: "hidden"});
});

//popup close 클릭 이벤트
$("body").on("click", ".popup .close", function(){
    $(this).parent(".popup").fadeOut(300, function(){
        $(this).parent(".popup").remove();
    });
    $("body").css({overflow: "visible"});
});




//Youtube data 불러오는 함수 정의
function callData(){
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        dataType:"jsonp",
        data:{
            part:"snippet",
            key: "AIzaSyD9-sPn5Yod86JXZq6J3yIVlF92BD28QeY", 
            maxResults: 10, 
            playlistId : "PLJdfyLd9bUGuDNLBmOO8K5WWtPK41X0O1"
        }
    })
    .success(function(data){
        console.log(data.items);

        var item = data.items;

        $(item).each(function(index,data){

            var title = data.snippet.title;
            var title_length = title.length;
            (title_length>40) ? title = title.substr(0, 40)+"..." : title;

            var subTxt = data.snippet.description;
            var subTxt_length = subTxt.length;
            (subTxt_length>50) ? subTxt = subTxt.substr(0,50)+"..." : subTxt;

            var subDate = data.snippet.publishedAt;
            subDate = subDate.split("T")[0];

            $("#wrap .list-wrapper").append(
                $("<article class='list'>")
                    .append(
                        $("<div class='thumbnail'>")
                            .append(
                                $("<a>")
                                    .attr({href: data.snippet.resourceId.videoId})
                                    .css({backgroundImage :"url("+ data.snippet.thumbnails.high.url +")"})
                            ),
                        $("<div class='contents'>")
                            .append(
                                $("<h2>").text(title),
                                $("<p>").text(subTxt),
                                $("<span>").text(subDate)
                            )
                    )
            )
        });
        
        
    })
    .error(function(err){
        console.log("데이터를 불러오는데 실패하였습니다.ㅜㅜ");
    })
}


//popup 함수 정의
function createPopup(videoId){
    $("body").append(
        $("<aside class='popup'>")
            .append(
                $("<img class='loading'>").attr({src: "img/loading_rolling.svg"}),
                $("<div class='contents'>")
                    .append(
                        $("<iframe>")
                            .attr({
                                src: "https://www.youtube.com/embed/"+videoId,
                                frameborder: "0",
                                width: "100%",
                                height: "100%",
                                allowfullscreen: "true"
                            })
                    ),
                $("<span class='close'>").text("close")
            )
    )
    setTimeout(function(){
        $(".popup .contents").fadeIn(500, function(){
            $(this).prev().remove();
        })
    },500)
}




