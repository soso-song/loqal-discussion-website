"use strict"
const allNotices = document.querySelector("#allNotices");
var fs = require("fs");
show_all();
function show_all(){
	// TODO: get notices from database
	for (const notice of notices){
		show_notice(notice);
 	}
}

function show_notice(notice, front=false){
	const div = document.createElement("div");
	div.className = 'notice_block';
	div.innerHTML = "<h3>" + notice.title + "</h3> <hr>";
	div.innerHTML += "<p>" + notice.content + "</p>";
	const user = users[notice.user_id];
	div.innerHTML += "<p class='sign_notice'><a class='admin_name'>" + user.display_name + "(@" + user.username + ")</a>   <a class='post_time'>  " + notice.time + "</a>";
	if (!front){
		allNotices.appendChild(div);	// after existing blocks
	} else{
		allNotices.insertBefore(div, allNotices.children[1]);
	}
}



const noticeForm = document.querySelector("#noticeForm");
noticeForm.addEventListener('submit', submit_notice);

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

	const content = noticeForm.elements['noticeContent'].value;
	if (title.length > 1000){
		document.querySelector("#contentError").innerHTML = "Content must be within 1000 characters";
		return;
	} else {
		document.querySelector("#contentError").innerHTML = "";
		noticeForm.reset();
	}
	const new_notice = new Notice(title, content, 2); // TODO: need to change input user id
	// TODO: adding new notice to database
	let noticeString = {"title":new_notice.title, "content":new_notice.content, user_id};
	fs.writeFile("notice.json",noticeString);
	function noticeBackend(){
		const url ='/notice';
		
	}
	notices.push(new_notice);
	show_notice(new_notice, true);
}