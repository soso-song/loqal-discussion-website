"use strict"
const allNotices = document.querySelector("#allNotices");
var fs = require("fs");

checkAdminUser().then((res) => {
	if (res){
		currentuser = res;
		getAllnotices();
	}
})
.catch((error) => {
	console.log(error);
})


async function getAllnotices(){
	await fetch('/notice')
	.then((res) => {
		if (res.status === 200) {
           return res.json();
       	} else {
            alert('Could not get notices');
       	} 
	})
	.then((json) => {
		notices = json;
		load_row();
	})
	.catch((error) => {
		console.log(error)
	})
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
	let noticeString = {"title":new_notice.title, "content":new_notice.content, "user":curr_user, "time":Date.now};
	function saveNotice(notice){
		const url ='/notice';
		const request = new Request(url, {
			method: 'post',
			body: JSON.stringify(notice),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		});
		fetch(request)
		.then(function(res) {
			window.location.href = res.url;
		}).catch((error) => {
			console.log(error)
		})
	}

	notices.push(new_notice);
	show_notice(new_notice, true);
}