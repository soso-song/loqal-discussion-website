load_all_reports();
function load_all_reports(){
	const rep_users = document.querySelector("#rep_users");
	const rep_ques = document.querySelector("#rep_questions");
	const rep_ans = document.querySelector("#rep_answers");
	let rep_u_count = 0;
	let rep_q_count = 0;
	let rep_a_count = 0;
	for (const report of reports){
		const div = document.createElement("div");
		div.className = 'lrDiv';
		const left = document.createElement("div");
		left.className = 'leftDiv';
		const right = document.createElement("div");
		right.className = 'rightDiv';
		div.appendChild(left);
		div.appendChild(right);

		let type_output;
		switch(report.type){
			case 'u':
				console.log('hi');
				rep_u_count++;
				left.innerHTML = "<p>Reported: " + users[report.rep_unique_id].username + "</p>";
				type_output = "User"; 
				rep_users.appendChild(div);
				break;
			case 'q':
				rep_q_count++;
				left.innerHTML = "<p>Reported: " + questions[report.rep_unique_id].title + "</p>";;
				type_output = "Question"; 
				rep_ques.appendChild(div);
				break;
			case 'a':
				rep_a_count++;
				left.innerHTML = "<p>Reported: " + answers[report.rep_unique_id].content + "</p>";;
				type_output = "Answer"; 
				rep_ans.appendChild(div);
				break;
		}
		left.innerHTML += "<p>Reported by: " + users[report.rep_user].username + "</p>";
		left.innerHTML += "<p>Reason: " + report.reason + "</p>";
		right.innerHTML = "<p><button class='flag_user'>View "+ type_output +"</button></p>";
		right.innerHTML += "<p><button class='flag_user'>Flag "+ type_output +"</button></p>";
		right.innerHTML += "<p><button class='flag_user'>Deny</button></p>";
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




