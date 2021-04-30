// JavaScript Document

$(function(){
	$(window).load(function(){
		var h = window.innerHeight,
			h_sc = document.getElementById('scroller').offsetHeight;
		var h_blog = h-h_sc-10;
		$('.blogs').css("height",h_blog+"px");
	});
	
	$(window).resize(function(){
		var h = window.innerHeight,
			h_sc = document.getElementById('scroller').offsetHeight;
		var h_blog = h-h_sc-10;
		$('.blogs').css("height",h_blog+"px");
	})
});

