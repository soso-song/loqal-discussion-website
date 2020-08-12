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
		
		right.innerHTML = "<p></p>";
		const button = document.createElement("button");
		if(report.type === 'u'){
			rep_u_count++;
			getUserInfo(report.targetId,data=>{
				type_output = "User"; 
				html_name = "/user/user_profile.html?user_id=" + report.targetId;
				left.innerHTML = "<p>Reported: <strong>" + data.username + "</strong></p>";
				rep_users.appendChild(div);

				button.setAttribute("onclick", " location.href='" + html_name + "' ");
				button.innerHTML = "View " + type_output;
				right.children[0].appendChild(button);
				right.innerHTML += `<p><button class='uflag'>Flag ${type_output}</button></p>`;
				right.innerHTML += `<p><button id="${report._id}" class='udeny'>Deny</button></p>`;

				let uflag = document.querySelectorAll(".uflag");
				let udeny = document.querySelectorAll(".udeny");
				
				let flag_button = uflag[uflag.length-1];
				flag_button.addEventListener('click', flag_report);
				flag_button.myParam = ['u',report._id,report.targetId];

				//uflag[uflag.length-1].addEventListener('click', flag_report);
				udeny[udeny.length-1].addEventListener('click', deny_report);
			});
		}else if(report.type === 'q'){
			rep_q_count++;
			getQuestionInfo(report.targetId,data=>{
				left.innerHTML = "<p>Reported: <strong>" + data.question.title + "</strong></p>";
				type_output = "Question"; 
				html_name = "/answer?question_id=" + report.targetId;
				rep_ques.appendChild(div);

				button.setAttribute("onclick", " location.href='" + html_name + "' ");
				button.innerHTML = "View " + type_output;
				right.children[0].appendChild(button);
				right.innerHTML += `<p><button class='qflag'>Flag ${type_output}</button></p>`;
				right.innerHTML += `<p><button id="${report._id}" class='qdeny'>Deny</button></p>`;

				let qflag = document.querySelectorAll(".qflag");
				let qdeny = document.querySelectorAll(".qdeny");

				let flag_button = qflag[qflag.length-1];
				flag_button.addEventListener('click', flag_report);
				flag_button.myParam = ['q',report._id,report.targetId];

				//qflag[qflag.length-1].addEventListener('click', flag_report);
				qdeny[qdeny.length-1].addEventListener('click', deny_report);
			});
		}else if(report.type === 'a'){
			rep_a_count++;
			getAnswerInfo(report.targetId,data=>{
				type_output = "Answer";
				html_name = `/answer?question_id=${data.question._id}#${report.targetId}`;
				left.innerHTML = "<p>Reported: <strong>" + data.answer.content + "</strong></p>";
				rep_ans.appendChild(div);

				button.setAttribute("onclick", " location.href='" + html_name + "' ");
				button.innerHTML = "View " + type_output;
				right.children[0].appendChild(button);
				right.innerHTML += `<p><button class='aflag'>Flag ${type_output} </button></p>`;
				right.innerHTML += `<p><button id="${report._id}" class='adeny'>Deny</button></p>`;

				let aflag = document.querySelectorAll(".aflag");
				let adeny = document.querySelectorAll(".adeny");

				let flag_button = aflag[aflag.length-1];
				flag_button.addEventListener('click', flag_report);
				flag_button.myParam = ['a',report._id,report.targetId];

				adeny[adeny.length-1].addEventListener('click', deny_report);
			});
		}
		getUserInfo(report.user,data=>{
			left.innerHTML += "<p>Reported by: " + data.username + "</p>";
			left.innerHTML += "<p>Reason: " + report.reason + "</p>";
			//left.innerHTML += "<p>Report ID:<strong>"+report._id+"</strong></p>"
			left.innerHTML += "<p class='report_time'>Reported at:  " + report.time + "</p>";

		});
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
}




function flag_report(e){
	const para = e.currentTarget.myParam;
	const type = para[0];
	const report_id = para[1];
	const target_id = para[2];

	switch(type){
		case 'u':
		//http://localhost:5000/users/flag/5f2f8690dd8ed22c0c074d5d
			//users[report.rep_unique_id].is_flagged = true;	// TODO: modifying an user in database
			flag_user(target_id);
			//console.log('user');
			break;
		case 'q':
			flag_question(target_id);
			//questions[report.rep_unique_id].is_flagged = true;	// TODO: modifying a question in database
			//console.log('quest');
			break;
		case 'a':
			flag_answer(target_id);
			//answers[report.rep_unique_id].is_flagged = true;	// TODO: modifying an answer in database
			//console.log('answ');
			break;
	}
	// remove current lrdiv
	const curr_lrdiv = e.target.parentElement.parentElement.parentElement;
	remove_lrdiv(curr_lrdiv,report_id);
}

function flag_user(id){
	const url = '/users/flag/' + id;
	const data = {
        flag:true
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
function flag_question(id){
	const url = '/questions/flag/' + id;
	const data = {
        flag:true
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
function flag_answer(id){
	const url = '/answers/flag/' + id;
	const data = {
        flag:true
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