$("input[type=submit]").on("click",function(e){     
    //return값이 false면 result.html으로 넘어가는것 방지
    if(!isCheck("terms")) e.preventDefault();

    if(!isTxt("userid", 5)) e.preventDefault();
    if(!isPwd("pwd1","pwd2")) e.preventDefault();
    if(!isCheck("gender")) e.preventDefault();
    if(!isTxt("email1")) e.preventDefault();
    if(!isSelect("email2")) e.preventDefault();
});

function isTxt(name, length){
    var $txt = $("input[name="+name+"]");
    var txt = $txt.val();
    //초기화
    $txt.parent().children("p").eq(0).css({display: "none"});
    $txt.parent().children("p").eq(1).css({display: "none"});
    $txt.removeClass("error");
    
    //텍스트박스가 빈칸인지 판별
    if(txt == ""){
        $("input[name="+name+"]").addClass("error");
        $("input[name="+name+"]").parent().children("p").eq(0).css({display: "block"});
        return false;
    }
    //텍스트 길이가 5자 미만인지 판별
    else if(txt.length < length){
        $("input[name="+name+"]").addClass("error");
        $("input[name="+name+"]").parent().children("p").eq(1).css({display: "block"});
        return false;
    }else{
        return true;
    }
}
function isPwd(name1, name2){
    var $pwd1 = $("input[name="+name1+"]");
    var $pwd2 = $("input[name="+name2+"]");
    var pwd1 = $pwd1.val();
    var pwd2 = $pwd2.val();

    var isConfirm = false;
    var i = 0;

    //숫자, 영문자, 특수문자 정규 표현식 
    var num = /[0-9]/;
    var eng = /[a-zA-Z]/;
    var specific = /[~!@#$%^&*()_+\[\]-]/;

    //초기화
    for(var k=0 ; k<6 ; k++){
        $pwd1.parent().children("p").eq(k).css({display: "none"});
    }
    $("input[type=password]").removeClass("error");

    //비밀번호 두 칸이 빈칸인지 판별
    if(pwd1 == "" || pwd2 == ""){
        $pwd1.parent().children("p").eq(0).css({display: "block"});
        $("input[type=password]").addClass("error");
        return isConfirm;
    }//그리고 두 값이 같은지 판별
    else if(pwd1 == pwd2){
        //5자 이상
        if(pwd1.length >=5){
            i++;
        }else{
            $pwd1.parent().children("p").eq(2).css({display: "block"});
        }
        //숫자포함
        if(num.test(pwd1)){
            i++;
        }
        else{
            $pwd1.parent().children("p").eq(3).css({display: "block"});
        }
        //특수문자포함
        if(specific.test(pwd1)){
            i++;
        }
        else{
            $pwd1.parent().children("p").eq(4).css({display: "block"});
        }
        //영문자 포함
        if(eng.test(pwd1)){
            i++;
        }
        else{
            $pwd1.parent().children("p").eq(5).css({display: "block"});
        }

        //모든 조건을 만족
        if(i == 4){
            isConfirm = true;
            console.log(isConfirm);
            return isConfirm;
        }else{
            $("input[type=password]").addClass("error");
            return isConfirm;
        }
    }
    //두 값이 같지 않다면
    else{
        $pwd1.parent().children("p").eq(1).css({display: "block"});
        $("input[type=password]").addClass("error");
        return isConfirm;
    };
}
function isCheck(name){
    var isCheck = $("input[name="+name+"]").is(":checked");
    $("input[name="+name+"]").siblings("p").css({display: "none"});
    
    if(isCheck){
        return true;
    }else{
        $("input[name="+name+"]").siblings("p").css({display: "block"});
        if(name == "terms"){
            alert("약관에 모두 동의하셔야 회원가입이 가능합니다.");
        }
        return false;
    }
}
function isSelect(name){
    var selected = $("select[name="+name+"]").children("option:selected").val();
    $("select[name="+name+"]").siblings("p").eq(1).css({display: "none"});
    $("select[name="+name+"]").removeClass("error");

    if(selected == ""){
        $("select[name="+name+"]").addClass("error");
        $("select[name="+name+"]").siblings("p").eq(1).css({display: "block"});
        return false;
    }else{
        return true;
    }
}