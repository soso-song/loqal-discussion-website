const rep_users = document.querySelector("#rep_users");
const rep_ques = document.querySelector("#rep_questions");
const rep_ans = document.querySelector("#rep_answers");

load_all_reports();
function load_all_reports(){
	
	let rep_u_count = 0;
	let rep_q_count = 0;
	let rep_a_count = 0;
	for (const report of reports){
		if (report.is_reviewed){
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
				left.innerHTML = "<p>Reported: <strong>" + users[report.rep_unique_id].username + "</strong></p>";
				type_output = "User"; 
				html_name = "edit_user.html";
				rep_users.appendChild(div);
				break;
			case 'q':
				rep_q_count++;
				left.innerHTML = "<p>Reported: <strong>" + questions[report.rep_unique_id].title + "</strong></p>";;
				type_output = "Question"; 
				html_name = "#";
				rep_ques.appendChild(div);
				break;
			case 'a':
				rep_a_count++;
				left.innerHTML = "<p>Reported: <strong>" + answers[report.rep_unique_id].content + "</strong></p>";;
				type_output = "Answer";
				html_name = "#";
				rep_ans.appendChild(div);
				break;
		}
		left.innerHTML += "<p>Reported by: " + users[report.rep_user].username + "</p>";
		left.innerHTML += "<p>Reason: " + report.reason + "</p>";
		left.innerHTML += "<p>Report ID (for current implemention only):<strong>"+report.id+"</strong></p>"
		right.innerHTML = "<p></p>";
		const button = document.createElement("button");
		button.setAttribute("onclick", " location.href='" + html_name + "' ");
		button.innerHTML = "View " + type_output;
		right.children[0].appendChild(button);
		right.innerHTML += "<p><button class='flag'>Flag "+ type_output +"</button></p>";
		right.innerHTML += "<p><button class='deny'>Deny</button></p>";
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


const all_flags = document.querySelectorAll(".flag");
const all_denies = document.querySelectorAll(".deny");
let j;
for (j = 0; j < reports.length; j++){
	all_flags[j].addEventListener('click', flag_report);
	all_denies[j].addEventListener('click', deny_report);
}


function flag_report(e){
	e.preventDefault();
	const report_id = parseInt(e.target.parentElement.parentElement.parentElement.children[0].children[3].children[0].innerHTML);
	const report = reports[report_id];
	report.is_reviewed = true;
	// TODO : mark user id who reviewed this report
	switch(report.type){
		case 'u':
			users[report.rep_unique_id].is_flagged = true;
			break;
		case 'q':
			questions[report.rep_unique_id].is_flagged = true;
			break;
		case 'a':
			answers[report.rep_unique_id].is_flagged = true;
			break;
	}
	// remove current lrdiv
	const curr_lrdiv = e.target.parentElement.parentElement.parentElement;
	remove_lrdiv(curr_lrdiv);
}


function deny_report(e){
	e.preventDefault();
	const report_id = parseInt(e.target.parentElement.parentElement.parentElement.children[0].children[3].children[0].innerHTML);
	const report = reports[report_id];
	report.is_reviewed = true;
	// TODO : mark user id who reviewed this report
	// remove current lrdiv
	const curr_lrdiv = e.target.parentElement.parentElement.parentElement;
	remove_lrdiv(curr_lrdiv);
}



function remove_lrdiv(curr_lrdiv){
	const parent = curr_lrdiv.parentElement;
	parent.removeChild(curr_lrdiv);
	if(parent.children.length === 1){
		const div = document.createElement("div");
		div.className = 'lrDiv';
		parent.appendChild(div);
	}
}



