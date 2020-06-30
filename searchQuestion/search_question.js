"use strict"

const params = new URLSearchParams(window.location.search)
let search_key = params.get('search_key');
// above variables should be passed and get when user cleck search button

// init:
const questionResultEntries = document.querySelector('#questionResult');
const answerResultEntries = document.querySelector('#answerResult');

if ((search_key != null)&&(search_key != '')){
	search_questions();
}

// code below is for normal page user
function search_questions() {
	const keyword = search_key;
	let result_ques = [];
	let result_answ = [];

	//This simple way of searching would later be implemented in backend
	for(let curr_que of questions){
		if(curr_que.title.includes(keyword) || curr_que.content.includes(keyword)){
			result_ques.push(curr_que);
		}
	}
	for(let curr_ans of answers){
		if(curr_ans.content.includes(keyword)){
			result_answ.push(curr_ans)
		}
	}

	load_result_question(result_ques);
	load_result_answer(result_answ);
}


function load_result_question(questions){	
	let i=0;
	questionResultEntries.innerHTML = '';

	while(i < questions.length){
		let tag_names = [];
		for (const tag_index of questions[i].tag_list){
			tag_names.push(tags[tag_index].name);
		}
		let question_answer_nums = 0;
		for (const ans of answers){
			if (ans.question_id == questions[i].id){
				question_answer_nums += 1;
			}
		}

		let is_resolved = "Unresolved";
		if(questions[i].is_resolved){
			is_resolved = "Resolved";
		}

		questionResultEntries.innerHTML+=`<div class="shortquestion">
            <a class="squestion" href="../answer/answer.html?question_id=${questions[i].id}">${questions[i].title}</a>
            <div class="sinfo">Asked by <a href="../user/userprofile.html?user_id=${questions[i].user_id}">${users[questions[i].user_id].username}</a> - ${questions[i].time} -  ${question_answer_nums} Answers - ${is_resolved}</div>
        </div>`;

		i++;
	}

	if(questions.length == 0){
		questionResultEntries.innerHTML+="No results were found. Try searching for 'q' for demo purposes.";
	}
}

function load_result_answer(answers){	
	let i=0;
	answerResultEntries.innerHTML = '';
	while(i < answers.length){
		answerResultEntries.innerHTML+=`	<div class="shortquestion">
			<a class="sanswer" href="../answer/answer.html?question_id=${answers[i].question_id}">${answers[i].content}</a>
			<div class="sinfo">In reply to <a href="../answer/answer.html?question_id=${answers[i].question_id}">${questions[answers[i].question_id].title}</a> - ${answers[i].time}</div>
		</div>`;
		i++;
	}

	if(answers.length == 0){
		answerResultEntries.innerHTML+="No results were found. Try searching for 'q' for demo purposes.";
	}
}


