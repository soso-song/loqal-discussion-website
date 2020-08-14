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
const tagResultEntries = document.querySelector('#tagResult');

if ((search_key != null)&&(search_key != '')){
	search_question(search_key);
	search_answer(search_key);
	search_tag(search_key);
}




function load_result_question(questions){	
	let i=0;
	questionResultEntries.innerHTML = '';

	if(questions.length == 0){
		questionResultEntries.innerHTML+="No questions were found.";
		return;
	}
	// get the mapping of user id to user instance
	const user_ids = questions.map(q => q.user);
	getUserList(user_ids).then((user_mapping) => {
		while(i < questions.length){
			const curr_question = questions[i];
			const userInfo = user_mapping[curr_question.user];
			const question_answer_nums = curr_question.answers.length;
			let is_resolved = "Unresolved";
			if(curr_question.isResolved){
				is_resolved = "Resolved";
			}
			questionResultEntries.innerHTML+=`<div class="shortquestion">
	        <a class="squestion" href="/answer?question_id=${curr_question._id}">${curr_question.title}</a>
	        <div class="sinfo">Asked by <a href="/profile?user_id=${curr_question.user}">${userInfo.displayname}</a> - ${curr_question.time} -  ${question_answer_nums} Answers - ${is_resolved}</div>
	        </div>`;
			i++;
		}
	})

}

function load_result_answer(questions){	
	let i=0;
	answerResultEntries.innerHTML = '';
	if(questions.length == 0){
		answerResultEntries.innerHTML+="No answers were found.";
		return;
	}

	const user_ids = questions.map(q => q.user);
	getUserList(user_ids).then((user_mapping) => {
		while(i < questions.length){
			const curr_question = questions[i];
			const userInfo = user_mapping[curr_question.user];
			const curr_answers = curr_question.answers.filter(ans => ans.content.includes(search_key));
			
			let color = '';
			if(i%2){
				color = 'style="background-color:#cccccc"';
			}
			curr_answers.forEach(answer => {
				answerResultEntries.innerHTML+=`<div ${color} class="shortquestion">
					<a class="sanswer" href="/answer?question_id=${curr_question._id}#${answer._id}">${answer.content}</a>
					<div class="sinfo">Answered by <a href="/profile?user_id=${answer.user}">${userInfo.displayname}</a> - ${answer.time}</div>
					</div>`;
			});
			i++;
		}
	})
}

function load_result_tag(questions){	
	let i=0;
	tagResultEntries.innerHTML = '';
	if(!questions){ 												//questions = false
		tagResultEntries.innerHTML+="Tag name not exist.";
		return;
	}else if(questions.length == 0){								//questions = []
		tagResultEntries.innerHTML+="No questions were found.";
		return;
	}

	const user_ids = questions.map(q => q.user);
	getUserList(user_ids).then((user_mapping) => {
		while(i < questions.length){
			const curr_question = questions[i];
			const userInfo = user_mapping[curr_question.user];
			const question_answer_nums = curr_question.answers.length;
			let is_resolved = "Unresolved";
			if(curr_question.isResolved){
				is_resolved = "Resolved";
			}
			tagResultEntries.innerHTML+=`<div class="shortquestion">
            <a class="squestion" href="/answer?question_id=${curr_question._id}">${curr_question.title}</a>
            <div class="sinfo">Asked by <a href="/profile?user_id=${curr_question.user}">${userInfo.displayname}</a> - ${curr_question.time} -  ${question_answer_nums} Answers - ${is_resolved}</div>
        	</div>`;
			i++;
		}
	})
	
}









function search_question(search_key){
	const question_url = '/questions/search/'+search_key;
	const question_request = new Request(question_url, {
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
}

function search_answer(search_key){
	const answer_url = '/answers/search/'+search_key;
	const answer_request = new Request(answer_url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
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
		load_result_answer(data);
	})
	.catch((error) => {
		console.log(error)
	});
}

function search_tag(tagname){
	const tag_url = '/questions/tags/'+tagname.toLowerCase();
	const tag_request = new Request(tag_url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});
	fetch(tag_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			//alert('could not get tags');
		}
	})
	.then(data => {
		//console.log(data);
		load_result_tag(data);
	})
	.catch((error) => {
		console.log(error)
	});
}