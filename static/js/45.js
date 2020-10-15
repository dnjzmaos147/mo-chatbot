var daelimBot = {};
daelimBot.avatar = "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99B174335A03F9A02A";

var user = {};

var sd_replace = sd.replace(/&#39\;/gi , "\"" );
sd_replace = sd_replace.slice(1,-1);


var dArr = sd_replace.split("}") ;
var sdArr = []

var delComma = [];

for(var i=0; i<dArr.length-1; i++){
  sdArr.push(dArr[i]+"}");
}

for(var i=1; i<sdArr.length; i++){
  let fix = sdArr[i].slice(2);
  delComma.push(fix);
}

var json_sdArr = [];

for(var i=0; i<delComma.length; i++){
  var jsd = JSON.parse(delComma[i]);
  json_sdArr.push(jsd);
}




//시간 am pm 확인
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//채팅 입력함수 who -> daelimBot(봇 왼쪽), user(사용자 오른쪽)       text -> 채팅내용      time -> 채팅올라오는 딜레이 시간
function insertChat(who, text, time) {
    if (time === undefined) {
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());

    if (who == "daelimBot") {
        control = '<li style="width:100%">' +
            '<div class="msj macro">' +
            '<div class="avatar"><img class="img-circle" style="width:100px; height:100px;" src="' + daelimBot.avatar + '" /></div>' +
            '<div class="text text-l">' +
            '<p>' + text + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '</div>' +
            '</li>';
    } else {
        control = '<li style="width:100%;">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +
            '<div class="user-text">' + text + '</div>' +
            '<div><small class="user-text-time">' + date + '</small></div>' +
            '<p> </p>'
        '</div>' +
            '<div class="avatar" style="padding:0px 0px 0px 10px !important"></div>' +
            '</li>';
    }
    setTimeout(
        function () {
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);

}

//채팅창 비우는 함수
function resetChat() {
    $("ul").empty();
}

// 텍스트 입력했을때
$(".mytext").on("keydown", function (e) {
    var text = "";
    if (e.which == 13) {
        text = $(this).val();
        if (text !== "") {
            insertChat("user", text);
            $(this).val('');
            // 노가다의 시작 빼에에에에에ㅔ에에에에에엑   여기다가 if문으로 다 노가다...
            if ((text.includes('안녕')) || (text.includes('하이')) || (text.includes('반가워'))) {
                insertChat("daelimBot", `ㅎㅇ`, 700)
            }else if ((text.includes('홈페이지')) || (text.includes('사이트')) || (text.includes('페이지'))) {
                insertChat("daelimBot", "학교 홈페이지 주소는<a href='https://www.daelim.ac.kr/hme/main.do' target='_blank'>www.daelim.ac.kr</a>입니다." , 700)
            }else if ((text.includes('지원금')) || (text.includes('학비')) || (text.includes('장학'))) {
                schoolExpenses()
                
            }else if ((text.includes('학과소개')) || (text.includes('학과안내')) || (text.includes('모바일인터넷'))|| (text.includes('과소개'))) {
                introduceMobile()
                
            }else if ((text.includes('홍보')) || (text.includes('영상')) || (text.includes('학교소개'))|| (text.includes('학교안내'))|| (text.includes('대림대'))) {
                introduceSchool()
            }else if((text.includes('월'))){
              getSchedule(text);
            }
            else if ((text.includes('학사일정')) || (text.includes('학과일정')) || (text.includes('일정'))|| (text.includes('교내일정'))|| (text.includes('스케줄'))) {
              insertChat("daelimBot", `알고싶은 날짜(월)를 알려주세요.`, 700);
            }
        }
    }
});



//엔터키말고 버튼눌러도 채팅올라가게 하기
$('body > div > div > div:nth-child(2) > span').click(function () {
    $(".mytext").trigger({ type: 'keydown', which: 13, keyCode: 13 });
})

//-- Clear Chat
resetChat();

//처음시작할때 문구
insertChat("daelimBot", "안녕하세요 대림대 챗봇입니다.", 0);
insertChat("daelimBot", `무엇을 도와드릴까요?<br>
                <button onclick='introduceSchool()'>학교소개</button>
                <button onclick='introduceMobile()'>학과안내</button>
                <button onclick='schoolExpenses()'>장학금</button>
`, 700);

//장학금 버튼 내용
function scholarship(scholarshipType){
    switch (scholarshipType) {
        case '성적':
          insertChat("daelimBot", "성적장학 안내를 해드릴게요!");
          insertChat("daelimBot", `<b>-신입생 수암장학:</b><br>
            1. 수시 및 정시전형에 합격한 자로서 입학성적이 전형별 수석인 학생<br>
            2. 직전학기 수강신청과목 낙제 없이, 15학점이상취득, 해당학과 매학기 평점평균4.0이상유지<br>
            <b>-신입생 입학우수장학:</b><br>
            수시 및 정시전형에 합격한 자로서 입학성적이 전형별/학과별 수석인 학생(수업료 1학년 1학기 감면)
          `, 700);
          insertChat("daelimBot", `<b>-재학생 성적장학:</b><br>
            1. 성적 우수자 중 학과 배정예산 범위 내에서 학과(부)장의 추천을 받은 학생<br>
            2. 직전학기 수강신청과목 낙제 없이 15학점 이상 취득<br>
            <b>-재학생 성적장학2:</b><br>
            1. 학회장, 학사학위(전공심화), 산업체위탁생인 학생 중 학과(부) 배정예산 범위 내에서 학과(부)장의 추천을 받은 학생<br>
            2. 직전학기 수강신청과목 낙제 없이, 15학점 이상 취득, 평점평균 3.0 이상<br>(단, 학사학위는 직전학기 10학점 이상 취득, 평점평균 3.0 이상)<br>
            <b>-재학생 면학장학: 수업료의 20% 감면(단, 군위탁은 30%)</b><br>
            1. 산업체위탁과정 학생<br>
            2. 직전학기 15학점 이상 취득, 평점평균 1.6 이상
          `, 1400);
          insertChat("daelimBot", `
                <button onclick='scholarship("성적")'>성적장학</button>
                <button onclick='scholarship("복지")'>복지장학</button>
                <button onclick='scholarship("근로")'>근로장학</button>
                <button onclick='scholarship("봉사")'>봉사장학</button>
                <button onclick='scholarship("특별")'>특별장학</button>`, 2100)
          break;
        case '봉사':
          insertChat("daelimBot", "봉사장학 안내를 해드릴게요!");
          insertChat("daelimBot", `<b>-봉사A: (수업료 전액 감면)</b><br>
          1. 총학생회장, 대의원의장<br>
          2. 직전학기 평점평균 2.6이상(신입생의 경우에는 성적 제한 없음)<br>
          <b>-봉사B: (수업료 50% 감면-지급)</b><br>
          1. 학회장, 학보사 및 방송국국장<br>
            2. 직전학기 평점평균 2.6이상(신입생의 경우에는 성적 제한 없음)
          `, 700);
          insertChat("daelimBot", `
                <button onclick='scholarship("성적")'>성적장학</button>
                <button onclick='scholarship("복지")'>복지장학</button>
                <button onclick='scholarship("근로")'>근로장학</button>
                <button onclick='scholarship("봉사")'>봉사장학</button>
                <button onclick='scholarship("특별")'>특별장학</button>`, 1400)
          break;
        case '복지':
          insertChat("daelimBot", "복지장학 안내를 해드릴게요!");
          insertChat("daelimBot", `<b>-교내복지장학: (소득분위별 장학금지급)</b><br>
          1. 국가장학정책(지침)에 따른 해당학기 소득분위 확인자. 단, 산업체위탁 및 학사학위 전공심화 학생은 제외<br>
          2. 직전학기 평점평균 2.6 이상(신입생 및 장애학생은 성적제한 없음)<br>
            <b>-대림나눔장학A: (수업료의 50% 추가지급)</b><br>
            장애인복지법에 따른 장애증명서 또는 장애증(사본)을 제출한 학생으로 해당학기 소득분위 5분위 이내인자
          `, 700);
          insertChat("daelimBot", `
                <button onclick='scholarship("성적")'>성적장학</button>
                <button onclick='scholarship("복지")'>복지장학</button>
                <button onclick='scholarship("근로")'>근로장학</button>
                <button onclick='scholarship("봉사")'>봉사장학</button>
                <button onclick='scholarship("특별")'>특별장학</button>`, 1400)
          break;
        case '근로':
          insertChat("daelimBot", "근로장학 안내를 해드릴게요!");
          insertChat("daelimBot", `<b>-교내근로장학: (매월지급)</b><br>
            1. 학과 및 부서에 근로를 제공한 재학생<br>
            2. 직전학기 평점평균 1.6 이상(신입생은 성적무관)<br>
            3. 시급은 매년 정부에서 고시하는 최저임금에 준하여 지급<br>
          `, 700);
          insertChat("daelimBot", `
                <button onclick='scholarship("성적")'>성적장학</button>
                <button onclick='scholarship("복지")'>복지장학</button>
                <button onclick='scholarship("근로")'>근로장학</button>
                <button onclick='scholarship("봉사")'>봉사장학</button>
                <button onclick='scholarship("특별")'>특별장학</button>`, 1400)
          break;
        case '특별':
          insertChat("daelimBot", "특별장학 안내를 해드릴게요!");
          insertChat("daelimBot", `<b>-보훈장학: (수업료 전액 감면)</b><br>
          1. 보훈대상자 자녀 및 국가유공자 본인, 북한이탈주민으로 해당 부처에서<br>
            발급하는 학비면제대상자 증명서를 제출한 학생<br>
            2. 자격과 면제 범위는 보훈관계법령 등에 의함(직전학기 평점평균 1.6이상)<br>
          <b>-대림가족장학: (수업료 전액감면)</b><br>
            1. 대림대학교 재직 중인 교직원의 직계가족(본인, 자녀, 배우자 포함)으로<br>
            직전학기 평점평균 2.6이상인 학생. 단, 신입생은 성적제한 없음<br>
            2. 겸임교수, 시간강사, 명예교수는 교직원의 범위에서 제외<br>
            3. 해당학기 최초 등록일부터 최종 등록마감일까지 재직 확인자<br>
          `, 700);
          insertChat("daelimBot", `<b>-대림사랑장학: (각 30만원 생활비성 장학금으로 지급)</b><br>
          우리대학에 직계존비속(형제자매, 부부포함)이 2인 이상 재학 중이거나, 부모<br>
            모두 우리대학 졸업생인 동문자녀가 재학 중인 학생<br>
          <b>-대림다문화장학: (수업료의 30% 지급)</b><br>
          1. 다문화가족지원법 제2조에 의거 이루어진 가정의 자녀로서 관련 증빙자료를
          제출한 학생<br>
          2. 직전학기 평점평균 2.6이상(신입생의 경우에는 성적 제한 없음)<br>
          `, 1400);
          insertChat("daelimBot", `
                <button onclick='scholarship("성적")'>성적장학</button>
                <button onclick='scholarship("복지")'>복지장학</button>
                <button onclick='scholarship("근로")'>근로장학</button>
                <button onclick='scholarship("봉사")'>봉사장학</button>
                <button onclick='scholarship("특별")'>특별장학</button>`, 2100)
          break;
      }
}   

function schoolExpenses(){
    insertChat("daelimBot", "장학금 안내를 해드릴게요! 장학금은 성적장학,<br> 복지장학, 근로장학, 봉사장학, 특별장학이 있습니다.", 700)
                insertChat("daelimBot", `원하시는 장학안내를 알려주세요.<br>
                <button onclick='scholarship("성적")'>성적장학</button>
                <button onclick='scholarship("복지")'>복지장학</button>
                <button onclick='scholarship("근로")'>근로장학</button>
                <button onclick='scholarship("봉사")'>봉사장학</button>
                <button onclick='scholarship("특별")'>특별장학</button>`, 1400)
}

function introduceSchool(){
    insertChat("daelimBot", "저희 대림대학교를 소개하겠습니다. ", 300)
                insertChat("daelimBot", `
                <b>대림대학교</b>는 산업체 현장에서 요구되는 현장직무역량을 갖춘<br>
                전문직업인을 양성하는 최고의 특성화된 전문직업교육기관을 지향합니다.<br>
                <br>
                최고수준의 고등직업교육기관으로서 기업의 요구적합한<br>
                ACE 인재를 양성하기 위해서 <b>학생중심, 현장교육중심, 수요중심, 취업중심의</b><br>
                대학을 만들어 가고 있습니다.<br>
                <br>
                학생, 학부모님 그리고 기업고객 여러분!<br>
                학생이 중심이 되는 한국 최고의 특성화된 전문대학교를<br>
                학생 여러분들과 교직원들이 함께 만들어 가겠습니다.<br>
                <br>
                `, 700)
                insertChat("daelimBot", `
                <b>교육목표</b><br>
                1. 직업교육으로 사명감이 투철한 전문직업인재양성<br>
                2. 혁신교육으로 지속적 혁신을 주도하는 문제해결능력을 보유한 인재 양성<br>
                3. 체험적 인성교육으로 배려하고 협력하는 인재 양성<br>
                <br>
                <img src='https://www.daelim.ac.kr/resources/hme/images/univ_info/talented.jpg' style='width:400px; height:480px'/><br>
                <b>홍보영상</b><br>
                <iframe width="500" height="300" src="https://www.youtube.com/embed/tOOrb0Qnw0w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `, 1500)
}

function introduceMobile (){
    insertChat("daelimBot", "모바일인터넷 학과소개를 해드릴게요.", 700)
                insertChat("daelimBot", `
                <b>4차산업 시대에 요구하는 모바일 분야 전문가 양성</b><br>
                모바일인터넷과는 전통적인 IT 기술에서 모바일 서비스 기술로 IT 기술이 급속한 패러다임의 변화를 보이고 있는 가운데<br>
                모바일 분야 산업계 맞춤형 전문 인력을 양성하기 위해서 2011년 신설된 학과이다.<br>

                모바일 분야 현장밀착형 교육의 실현을 위해 본 학과는 3대 운영 전략을 도입한다.<br>
                첫째, 모바일 분야 현장에 바로 적용되는 맞춤형 교육과정을 도입한다.<br>
                둘째, 현직 모바일 산업계에 근무하는 실무 전문가를 교수진으로 초빙한다.<br>
                셋째, 철저한 프로젝트 실무중심 교육을 실시하고 나아가 산업체 인턴십 학기제를 시행한다.<br>

                모바일인터넷과는 상기한 3대 운영 전략의 내실적 추진을 통해 모바일 분야 산업계 맞춤형<br> 전문인력의 양성 및 취업 연계까지의<br> one-stop 교육체제를 구축한다.<br>
                <br>
                모바일인터넷과 <a href='https://dept.daelim.ac.kr/mbi/mainPage.do' target='_blank'>홈페이지 바로가기</a>
                `, 1400)
}



function getSchedule(text){
  let monthArr = "";
  let arr = [];
  if(text.includes("11월")){

    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '11'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `11월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("12월")){

    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '12'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `12월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("3월")){

    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '03'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `3월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("4월")){

    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '04'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `4월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("5월")){
    
    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '05'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `5월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("6월")){
  
    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '06'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `6월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("7월")){
    
    for(let i=0; i<json_sdArr.length; i++){
      
      if (json_sdArr[i].month == '07'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `7월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("8월")){
   
    for(let i=0; i<json_sdArr.length; i++){
 
      if (json_sdArr[i].month == '08'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `8월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("9월")){

    for(let i=0; i<json_sdArr.length; i++){
    
      if (json_sdArr[i].month == '09'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `9월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("10월")){
  
    for(let i=0; i<json_sdArr.length; i++){

      if (json_sdArr[i].month == '10'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `10월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("1월")){
   
    for(let i=0; i<json_sdArr.length; i++){
    
      if (json_sdArr[i].month == '01'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `1월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }else if(text.includes("2월")){

    for(let i=0; i<json_sdArr.length; i++){
  
      if (json_sdArr[i].month == '02'){
        monthArr += json_sdArr[i].date+ '&nbsp;-&nbsp;'+json_sdArr[i].title+"<br>";
      }
    }
    insertChat('daelimBot', `2월 학사일정을 안내할게요.<br> ${monthArr}<br>`, 700);
  }
}


