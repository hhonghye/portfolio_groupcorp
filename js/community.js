const url = "data/board.json"; //상대경로x?
const boardTarget = $("#board .table_wrap");
const faqTarget = $("#faq");
const resultBoardData = callBoardData(url);
const resultFaqData = callFaqData(url);

createBoardTable(boardTarget, resultBoardData);
createFaqTable(faqTarget, resultFaqData);

/*---------- 이벤트등록 ----------*/

//scroll subTitle event
$(window).on("scroll", function(){
    subTitle("#faq");
    subTitle("#board");
});


/*---------- 함수정의 ----------*/

function callBoardData(url){
    let result;
    $.ajax({
        url : url,
        data : "json",
        async : false
    })
    .success(function(data){

        result = data.board;

    })
    .error(function(err){
        console.log(err);
    });
    return result;
}
function callFaqData(url){
    let result;
    $.ajax({
        url : url,
        data : "json",
        async : false
    })
    .success(function(data){

        result = data.faq;

    })
    .error(function(err){
        console.log(err);
    });
    return result;
}

function createBoardTable(target,data){
    target.append(
        $("<table>")
            .attr("summery", "자유게시판의 글번호, 제목, 작성자, 작성일")
            .append(
                $("<caption class='hidden'>").text("자유게시판"),
                $("<thead>")
                    .append(
                        $("<tr>")
                            .append(
                                "<th scope='col'>No</th>"
                                // "<th scope='col'>제목</th>",
                                // "<th scope='col'>작성자</th>",
                                // "<th scope='col'>작성일</th>"
                            )
                    ),
                $("<tbody>")
            )
    )
    for(let key in data[0]){
        target.find("thead tr").append(
            $("<th scope='col'>").text(key)
        )
    }

    for(let i=0 ; i<data.length ; i++){
        target.find("tbody").prepend(
            $("<tr>")
                .append(
                    $("<td>").text(i+1),
                    $("<td>").append(
                        $("<a>").attr("href", "#").text(data[i]["제목"])
                    ),
                    $("<td>").text(data[i]["작성자"]),
                    $("<td>").text(data[i]["작성일"])
                )
        )
    }
}
function createFaqTable(target,data){
    target.append(
        $("<dl>")
    )
    for(let i=0 ; i<data.length ; i++){
        target.find("dl")
            .append(
                $("<dt>").text(data[i].title),
                $("<dd>").text(data[i].content)
            )
    }
}

/*---------- toggle ----------*/

var $faq_wrap = $(".faq_wrap");
var $faq_btns = $faq_wrap.find("dt");
var $faq_boxs = $faq_wrap.find("dd");
var enableClick = true;

faqToggle();

function faqToggle(){
    $faq_btns.on("click", function(){
        if(enableClick){
            enableClick = false;

            var isOn = $(this).hasClass("on");
            $faq_btns.removeClass("on");
            $faq_boxs.slideUp();

            if(isOn){
                $(this).removeClass("on");
                $(this).next().slideUp(function(){
                    enableClick = true;
                });
            }else{
                $(this).addClass("on");
                $(this).next().slideDown(function(){
                    enableClick = true;
                });
            }
        }
    })
}
