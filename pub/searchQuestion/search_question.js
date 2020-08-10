"use strict"
const params = new URLSearchParams(window.location.search)
let search_key = params.get('search_key');
// above variables should be passed and get when user cleck search button

//connect and get variabe from db
//questions = pull_questions();
//answers = pull_answers();


// init:
const questionResultEntries = document.querySelector('#questionResult');
const answerResultEntries = document.querySelector('#answerResult');

if ((search_key != null)&&(search_key != '')){
	search_keyword();
}

// // code below is for normal page user
// function search_questions() {
// 	const keyword = search_key;
// 	let result_ques = [];
// 	let result_answ = [];

// 	//This simple way of searching would later be implemented in backend
// 	for(let curr_que of questions){
// 		if(curr_que.title.includes(keyword) || curr_que.content.includes(keyword)){
// 			result_ques.push(curr_que);
// 		}
// 	}
// 	for(let curr_ans of answers){
// 		if(curr_ans.content.includes(keyword)){
// 			result_answ.push(curr_ans)
// 		}
// 	}

// 	load_result_question(result_ques);
// 	load_result_answer(result_answ);
// }


function search_keyword(mytitle, mydesc, mytags){
	
	const keyword = search_key;

	const question_url = '/questions/search/'+search_key;
	const question_request = new Request(question_url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});
	

	const answer_url = '/questions/answers/search/'+search_key;
	const answer_request = new Request(answer_url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});


	fetch(question_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			alert('could not get questions');
		}
	})
	.then(data => {
		load_result_question(data);
	})
	.catch((error) => {
		console.log(error)
	});

	fetch(answer_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			alert('could not get answers');
		}
		
	})
	.then(data => {
		// console.log('answers');
		// console.log(data);
		load_result_answer(data);
	})
	.catch((error) => {
		console.log(error)
	});
}


function load_result_question(questions){	
	let i=0;
	questionResultEntries.innerHTML = '';
	while(i < questions.length){
		const curr_question = questions[i];
		const question_answer_nums = curr_question.answers.length;
		let is_resolved = "Unresolved";
		if(curr_question.isResolved){
			is_resolved = "Resolved";
		}
		getUserInfo(curr_question.user).then(userInfo => {
			questionResultEntries.innerHTML+=`<div class="shortquestion">
            <a class="squestion" href="/answer?question_id=${curr_question._id}">${curr_question.title}</a>
            <div class="sinfo">Asked by <a href="../user/user_profile.html?user_id=${curr_question.user}">${userInfo.displayname}</a> - ${curr_question.time} -  ${question_answer_nums} Answers - ${is_resolved}</div>
        	</div>`;
		})
		i++;
	}
	if(questions.length == 0){
		questionResultEntries.innerHTML+="No results were found. Try searching for 'q' for demo purposes.";
	}
}

function load_result_answer(questions){	
	let i=0;
	answerResultEntries.innerHTML = '';
	while(i < questions.length){
		const curr_question = questions[i];
		const curr_answers = curr_question.answers.filter(ans => ans.content.includes(search_key));
		let color = '';
		if(i%2){
			color = 'style="background-color:#cccccc"';
		}
		curr_answers.forEach(answer => {

			getUserInfo(answer.user).then(userInfo => {
					answerResultEntries.innerHTML+=`<div ${color} class="shortquestion">
					<a class="sanswer" href="/answer?question_id=${curr_question._id}#${answer._id}">${answer.content}</a>
					<div class="sinfo">Answered by <a href="../user/user_profile.html?user_id=${answer.user}">${userInfo.displayname}</a> - ${answer.time}</div>
				</div>`;
			})
		});
		i++;
	}

	if(answers.length == 0){
		answerResultEntries.innerHTML+="No results were found. Try searching for 'q' for demo purposes.";
	}
}








