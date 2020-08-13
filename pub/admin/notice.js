"use strict"
const actNotices = document.querySelector("#actNotices");
const passNotices = document.querySelector("#passNotices");
// var fs = require("fs");

checkAdminUser().then((res) => {
	if (res){
		render_notices();
	}
})
.catch((error) => {
	console.log(error);
})


function render_notices(){
	const url = '/notice';
	const get_request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});
	fetch(get_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			alert('could not get notices');
		}
	})
	.then(data => {
		//console.log(data);
		data.forEach(notice => show_notice(notice));
		//load_result_question(data);
	})
	.catch((error) => {
		console.log(error)
	});
}

function show_notice(notice){
	const div = document.createElement("div");
	div.className = 'notice_block';
	div.innerHTML = "<h3>" + notice.title + "</h3> <hr>";
	div.innerHTML += "<p>" + notice.content + "</p>";
	getUserInfo(notice.user).then(userInfo => {
		div.innerHTML += `<div class='notice_info_btn' id="pbutts"><a href="/admin/editnotice?notice_id=${notice._id}">Edit notice</a></div>`;
		div.innerHTML += `<div class='notice_info'><a class='admin_name' href="/profile?user_id=${notice.user}">${userInfo.displayname}(@${userInfo.username})</a> - <a class='post_time'>${notice.time}</a></div>`;
	})
	if (notice.isShowing){
		actNotices.appendChild(div);
	} else{
		passNotices.appendChild(div);
	}
}

const noticeForm = document.querySelector("#noticeForm");
noticeForm.addEventListener('submit', submit_notice);




function post_notice(mytitle, mydesc){
	const url = '/notice';
	const data = {
		title: mytitle,
		content: mydesc
	}

	const notice_request = new Request(url, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(notice_request)
	.then(res => {
		//
	})
	.catch((error) => {
		console.log(error)
	});
}

function submit_notice(e){
	e.preventDefault();

	const title = noticeForm.elements['noticeTitle'].value;
	if (title === ''){
		document.querySelector("#titleError").innerHTML = "Please type in a title";
		return;
	} else if (title.length > 80){
		document.querySelector("#titleError").innerHTML = "Title must be within 80 characters";
		return;
	} else {
		document.querySelector("#titleError").innerHTML = "";
	}

	let content = noticeForm.elements['noticeContent'].value;
	if (content ===''){
		content = "null";
	}
	if (title.length > 1000){
		document.querySelector("#contentError").innerHTML = "Content must be within 1000 characters";
		return;
	} else {
		document.querySelector("#contentError").innerHTML = "";
		noticeForm.reset();
	}

	post_notice(title,content);
	window.location.href = '/admin/notice';
}