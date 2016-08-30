<?php
/**
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 *
 */

// variables for output model
$pfSet1 = <<<DOC
{
	"headerClr": "#ccc",
	"nav": "float: left; width: 100%; background: #333;",
	"startTime": "function startTime() { var today=new Date(); var h=today.getHours(); var m=today.getMinutes(); var s=today.getSeconds(); if (m < 10) m = '0' + m; if (s < 10) s = '0' + s; document.getElementById('clocktxt').innerHTML = h + ':' + m + ':' + s; var t = setTimeout(function(){startTime()}, 500);}"
}
DOC;

$pfSet2 = <<<DOC
{
	"comment1": "",
	"comment2": "",
	"caption": "NASA's Terra satellite passed over Karina in the eastern Pacific <br> Ocean on Aug. 14 at 2:40 pm. EDT when it was still a hurricane",
	"image": {
		"src": "/images/pfm/karina_storm1.jpg",
		"altSrc": "http://media.eurekalert.org/multimedia_prod/pub/web/77823_web.jpg"
	},
	"imageType": ["gif", "jpg", "jpeg", "png", "tif"], 		
	"grid": {
		"gridRow1": {
			"city": "New York",
			"name": "Jonesy Band",
			"age": 16,
			"education": "No College"
		},
		"gridRow2": {
			"city": "Chicago",
			"name": "Mary Kay",
			"age": 35,
			"education": "Graduate School"
		},
		"gridRow3": {
			"city": "Los Angeles",
			"name": "James Franco",
			"age": 28,
			"education": "College"
		},
		"gridRow4": {
			"city": "San Diego",
			"name": "Ellen Compell",
			"age": 20,
			"education": "Some College"
		}
	}
}
DOC;

$pfSet3 = <<<DOC
{
	"caption_cn": "美国宇航局Terra卫星在8月14日下午2:40<br>美国东部时间越过卡琳娜时它还是一个飓风",		
	"image_cn": {
		"src": "/images/pfm/karina_storm2.jpg",
		"altSrc": "http://media.eurekalert.org/multimedia_prod/pub/web/77824_web.jpg"
	},
	"imageType_cn": ["gif格式", "jpg格式", "jpeg格式", "png格式", "tif格式"],
	"grid_cn": {
		"gridRow1": {
			"city": "纽约",
			"name": "Jonesy Band",
			"age": 16,
			"education": "大学以下"
		},
		"gridRow2": {
			"city": "芝加哥",
			"name": "Mary Kay",
			"age": 35,
			"education": "研究生"
		},
		"gridRow3": {
			"city": "洛杉矶",
			"name": "James Franco",
			"age": 28,
			"education": "大学"
		},
		"gridRow4": {
			"city": "圣地亚哥",
			"name": "Ellen Compell",
			"age": 20,
			"education": "未完成大学"
		}
	}
}
DOC;
?>
