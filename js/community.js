const url = "data/board.json"; //상대경로x?
const target = $(".community .inner .table_wrap");
const resultData = callData(url);

createTable(target, resultData);

function callData(url){
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

function createTable(target,data){
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