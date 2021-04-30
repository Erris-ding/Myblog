// JavaScript Document
var index = 0;
var mvIdx = 0;
var cnt = document.getElementById('scroller');
var img0 = document.getElementById('img0'),
	img1 = document.getElementById('img1'),
	img2 = document.getElementById('img2'),
	img3 = document.getElementById('img3'),
	img4 = document.getElementById('img4');

function anime(obj, target) {
	var r = 0;
	clearInterval(obj.timer);
	if(target == 1){
		r = -2;
	}
	obj.timer = setInterval(function () {
		if (mvIdx >= 100) {
			mvIdx = 0;
			clearInterval(obj.timer);
		}
		else {
			mvIdx++;
			img0.style.left = (1+r-index)*100 + (mvIdx * target) + '%';
			img1.style.left = (2+r-index)*100 + (mvIdx * target) + '%';
			img2.style.left = (3+r-index)*100 + (mvIdx * target) + '%';
			img3.style.left = (4+r-index)*100 + (mvIdx * target) + '%';
			img4.style.left = (5+r-index)*100 + (mvIdx * target) + '%';
//			console.log(index, Number(img1.style.left.replace('%', '')));
		}
	}, 10)
}

function reset(dir){
	var r;
	if(dir>0){
		r = 0;
	}else{
		r = -400;
	}
	img0.style.left = 0 + r + '%';
	img1.style.left = 100 + r + '%';
	img2.style.left = 200 + r + '%';
	img3.style.left = 300 + r + '%';
	img4.style.left = 400 + r + '%';
}

function toLeft() {
	index = (index + 4) % 5;
	if(index == 4){
		reset(-1);
	}
	else{
		anime(cnt, 1);
	}
	document.getElementById('dot' + index).style.background = 'RGBA(240, 60, 60, 0.8)';
				document.getElementById('dot' + ((index + 4) % 5)).style.background = 'RGBA(220, 220, 220, 0.5)';
				document.getElementById('dot' + ((index + 1) % 5)).style.background = 'RGBA(220, 220, 220, 0.5)';
//	console.log(index);
}

function toRight() {
	index = (index + 1) % 5;
	if(index == 0){
		reset(1);
	}
	else{
		anime(cnt, -1);
	}
	document.getElementById('dot' + index).style.background = 'RGBA(240, 60, 60, 0.8)';
				document.getElementById('dot' + ((index + 4) % 5)).style.background = 'RGBA(220, 220, 220, 0.5)';
				document.getElementById('dot' + ((index + 1) % 5)).style.background = 'RGBA(220, 220, 220, 0.5)';
//	console.log(index);
}

var interval = setInterval(toRight, 6400);

cnt.addEventListener('mouseenter', function (event) {
	clearInterval(interval);
})

cnt.addEventListener('mouseleave', function (event) {
	interval = setInterval(toRight, 4000);
})