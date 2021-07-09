/* ------------- 지도를 띄우는 코드 작성 -------------- */
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new window.kakao.maps.LatLng(37.52801104423197, 126.87573029490142), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var branch_btns = document.querySelectorAll(".branch li a");

/* ------------- 지도에 컨트롤 올리기 -------------- */
// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/* ------------- 지도 확대 축소 막기 -------------- */
setZoomable(false);
// 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}

/* ------------- 여러개 마커 표시하기 -------------- */
var markerOption = [
	{
		title: "서울본사",
		latlng: new kakao.maps.LatLng(37.52801104423197, 126.87573029490142),
		address: "서울 양천구 목동동로 293",
        call: "02-1234-9876",
        subway : "5호선 오목교역 2번출구 횡단보도 이용 후 약 200m 이동, 오른쪽 횡단보도 이용 후 약 100m에 위치",
        bus : "간선/순환 - 571, 603, 6624, 6637, 양천02, 700",
        car : "올림픽대로 - 양화대교 남단에서 문래동 사거리 방향으로 직진, 약 10분 소요",
		imgSrc: "img/Location-marker.svg",
		imgSize: new kakao.maps.Size(54, 110),
		imgPos: {offset: new kakao.maps.Point(28, 70)},
		button: branch_btns[0]
	},
	{
		title: "광주지사",
		latlng: new kakao.maps.LatLng(35.16189869911543,126.90094449957742),
		address: "광주 북구 중가로3번길 25",
        call: "062-2345-6789",
        subway : "양동시장역 3번출구 혹은 광주역(기차) 도보 20분",
        bus : "1187, 유덕65",
        car : "광주역 - 북광주우체국 방면으로 우회전 후 492m 직진, 우회전 후 235m 직진, 좌회전 후 88m 직진 후 우측 위치",
		imgSrc: "img/Location-marker.svg",
		imgSize: new kakao.maps.Size(54, 110),
		imgPos: {offset: new kakao.maps.Point(28, 70)},
		button: branch_btns[1]
	},
	{
		title: "부산지사",
		latlng: new kakao.maps.LatLng(35.18074399423394,129.20224677482767),
		address: "부산 해운대구 송정해변로 36",
        call: "051-9876-5432",
        subway : "5호선 오목교역 2번출구 횡단보도 이용 후 약 200m 이동, 오른쪽 횡단보도 이용 후 약 100m에 위치",
        bus : "100, 100-1, 139, 141, 181, 200, 38, 39, 40, 63, 141(심야), 182, 185, 해운대구9",
        car : "송정역 - 해운대로 475m 직진 후 국립수산과학원 방면으로 좌회전 후 480m 직진, 송정해변로 송정 방면으로 우회전 후 353m 직진, 송정해변로 우회전 후 14m 이동 우측 위치",
		imgSrc: "img/Location-marker.svg",
		imgSize: new kakao.maps.Size(54, 110),
		imgPos: {offset: new kakao.maps.Point(28, 70)},
		button: branch_btns[2]
	}
];
    
for (var i = 0; i < markerOption.length; i ++) {
    
    // 마커를 생성합니다
    new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerOption[i].latlng, // 마커를 표시할 위치
        title : markerOption[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : new kakao.maps.MarkerImage(markerOption[i].imgSrc, markerOption[i].imgSize, markerOption[i].imgPos) // 마커 이미지 
	});
	
	(function(index){
		markerOption[index].button.onclick = function(e){
			e.preventDefault();

			for(var k=0; k<markerOption.length; k++){
                markerOption[k].button.classList.remove("on"); 
            }  
			markerOption[index].button.classList.add("on");

			panTo(markerOption[index].latlng);
			addressTo(markerOption[index].address);
            callTo(markerOption[index].call);
            howToGo(markerOption[index].subway, markerOption[index].bus, markerOption[index].car);
            
		}
	})(i);
}

/*-- 지도이동 --*/
function panTo(target) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = target;
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}  
/*-- 주소 --*/
function addressTo(target) {
	var address = document.querySelector(".info h2");
	address.innerText = target;
}
/*-- 전화번호 --*/
function callTo(target) {
	var call = document.querySelector(".info>p");
	call.innerText = target;
}
/*-- 지하철, 버스, 차 --*/
function howToGo(sub, bus, car){
    var howToGo = document.querySelectorAll(".info ul li p");
    howToGo[0].innerText = sub;
    howToGo[1].innerText = bus;
    howToGo[2].innerText = car;

}

/* ------------- resize -------------- */
window.onresize = function(){
	var active_btn = document.querySelector(".branch li a.on");
	var active_index = active_btn.parentNode.getAttribute("data-index");

	map.setCenter(markerOption[active_index].latlng);
}