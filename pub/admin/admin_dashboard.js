"use strict"

const rep_users = document.querySelector("#rep_users");
const rep_ques = document.querySelector("#rep_questions");
const rep_ans = document.querySelector("#rep_answers");
let admin_user = null;

checkAdminUser().then((res) => {
	if (res){
		show_reports();
		admin_user = res._id;
	}
})
.catch((error) => {
	console.log(error);
})


function show_reports(){
	const report_url = '/report';
	const report_request = new Request(report_url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});
	fetch(report_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			alert('could not get reports');
		}
	})
	.then(data => {
		render_reports(data);
	})
	.catch((error) => {
		console.log(error)
	});
}


function render_reports(reports){
	
	let rep_u_count = 0;
	let rep_q_count = 0;
	let rep_a_count = 0;

	for (const report of reports){
		if (report.isReviewed){
			continue;
		}
		const div = document.createElement("div");
		div.className = 'lrDiv';
		const left = document.createElement("div");
		left.className = 'leftDiv';
		const right = document.createElement("div");
		right.className = 'rightDiv';
		div.appendChild(left);
		div.appendChild(right);

		let type_output;
		let html_name;
		switch(report.type){
			case 'u':
				rep_u_count++;
				getUserInfo(report.targetId,data=>{
					left.innerHTML = "<p>Reported: <strong>" + data.username + "</strong></p>";
				});
				type_output = "User"; 
				html_name = "/user/user_profile.html?user_id=" + report.targetId;
				rep_users.appendChild(div);
				break;
			case 'q':
				rep_q_count++;
				getQuestionInfo(report.targetId,data=>{
					left.innerHTML = "<p>Reported: <strong>" + data.question.title + "</strong></p>";
				});
				type_output = "Question"; 
				html_name = "/answer?question_id=" + report.targetId;
				rep_ques.appendChild(div);
				break;
			case 'a':
				rep_a_count++;
				getAnswerInfo(report.targetId,data=>{
					left.innerHTML = "<p>Reported: <strong>" + data.answer.content + "</strong></p>";
					type_output = "Answer";
					html_name = `/answer?question_id=${data.question._id}#${report.targetId}`;
				});
				rep_ans.appendChild(div);
				break;
		}
		getUserInfo(report.user,data=>{
			left.innerHTML += "<p>Reported by: " + data.username + "</p>";
			left.innerHTML += "<p>Reason: " + report.reason + "</p>";
			//left.innerHTML += "<p>Report ID:<strong>"+report._id+"</strong></p>"
			left.innerHTML += "<p class='report_time'>Reported at:  " + report.time + "</p>";

		});
		right.innerHTML = "<p></p>";
		const button = document.createElement("button");
		if(report.type === 'a'){
			getAnswerInfo(report.targetId,data=>{
				button.setAttribute("onclick", " location.href='" + html_name + "' ");
				button.innerHTML = "View " + type_output;
				right.children[0].appendChild(button);
				right.innerHTML += `<p><button id="${report._id}" class='aflag'>Flag ${type_output} </button></p>`;
				right.innerHTML += `<p><button id="${report._id}" class='adeny'>Deny</button></p>`;
				let aflags = document.querySelectorAll(".aflag");
				let adenies = document.querySelectorAll(".adeny");
				aflags[aflags.length-1].addEventListener('click', flag_report);
				adenies[adenies.length-1].addEventListener('click', deny_report);
				
			});
		}else{
			button.setAttribute("onclick", " location.href='" + html_name + "' ");
			button.innerHTML = "View " + type_output;
			right.children[0].appendChild(button);
			right.innerHTML += `<p><button id="${report._id}" class='flag'>Flag ${type_output}</button></p>`;
			right.innerHTML += `<p><button id="${report._id}" class='deny'>Deny</button></p>`;
		}
	}
	if (rep_u_count === 0){
		const div = document.createElement("div");
		div.className = 'lrDiv';
		rep_users.appendChild(div);
	}
	if (rep_q_count === 0){
		const div = document.createElement("div");
		div.className = 'lrDiv';
		rep_ques.appendChild(div);
	}
	if (rep_a_count === 0){
		const div = document.createElement("div");
		div.className = 'lrDiv';
		rep_ans.appendChild(div);
	}
	const all_flags = document.querySelectorAll(".flag");
	const all_denies = document.querySelectorAll(".deny");
	for (let j = 0; j < reports.length-rep_a_count; j++){
		all_flags[j].addEventListener('click', flag_report);
		all_denies[j].addEventListener('click', deny_report);
	}
}




function flag_report(e){
	e.preventDefault();
	const report_id = e.target.id;//parseInt(e.target.parentElement.parentElement.parentElement.children[0].children[3].children[0].innerHTML);
	// TODO: get report instance from database
	// const report = reports[report_id];
	// report.is_reviewed = true;
	// report.reviewedBy = curr_user.id;

	switch(report.type){
		case 'u':
			users[report.rep_unique_id].is_flagged = true;	// TODO: modifying an user in database
			break;
		case 'q':
			questions[report.rep_unique_id].is_flagged = true;	// TODO: modifying a question in database
			break;
		case 'a':
			answers[report.rep_unique_id].is_flagged = true;	// TODO: modifying an answer in database
			break;
	}
	// remove current lrdiv
	const curr_lrdiv = e.target.parentElement.parentElement.parentElement;
	remove_lrdiv(curr_lrdiv,report_id);
}







function deny_report(e){
	e.preventDefault();
	const report_id = e.target.id;//e.target.parentElement.parentElement.parentElement.children[0].children[3].children[0].innerHTML;
	// console.log(report_id);
	// console.log(e.target);
	// const report = reports[report_id];	// TODO: get report instance from database
	// report.is_reviewed = true;
	// report.reviewedBy = curr_user.id;
	// // remove current lrdiv
	const curr_lrdiv = e.target.parentElement.parentElement.parentElement;
	remove_lrdiv(curr_lrdiv,report_id);
}



function remove_lrdiv(curr_lrdiv,report_id){
	const parent = curr_lrdiv.parentElement;
	parent.removeChild(curr_lrdiv);
	if(parent.children.length === 1){
		const div = document.createElement("div");
		div.className = 'lrDiv';
		parent.appendChild(div);
	}
	resloveReport(report_id);
}


function resloveReport(report_id){
	const url = '/reports/' + report_id;
	const data = {
        reviewer:admin_user,
        isReviewed:true
	}

	const request = new Request(url, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request)
	.then()
	.catch((error) => {
		console.log(error);
	})
}


// below are my non async type functions different with shared
function getUserInfo(user_id, callBack){
	const url = '/users/' + user_id;
	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request)
	.then((res) => {
		if (res.status === 200) {
           	// return a promise that resolves with the JSON body
           	return res.json();
       	} else {
            // alert('Could not get user.');
       	} 
	})
	.then(data => {
		callBack(data);
		// userInfo = {
  //          	displayname: data.displayname,
  //          	username: data.username
  //       };
	})
	.catch((error) => {
		console.log(error)
	})
}


function getQuestionInfo(id, callBack){
	const url = '/questions/' + id;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request)
	.then((res) => {
		if (res.status === 200) {
           // return a promise that resolves with the JSON body
           return res.json();
       	} else {
            alert('Could not get question');
       	} 
	})
	.then(data => {
		callBack(data);
		//question = json.question;
	})
	.catch((error) => {
		console.log(error)
	})
}

function getAnswerInfo(id, callBack){
	const url = '/answerByAnsId/' + id;
	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	fetch(request)
	.then((res) => {
		if (res.status === 200) {
           	return res.json();
       	} else {
            // alert('Could not get user.');
       	} 
	})
	.then(data => {
		callBack(data);
	})
	.catch((error) => {
		console.log(error)
	})
}