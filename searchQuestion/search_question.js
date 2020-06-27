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
	result_ques = [];
	result_answ = [];
	for(curr_que of questions){
		if(curr_que.title.includes(keyword) || curr_que.content.includes(keyword)){
			result_ques.push(curr_que);
		}
	}
	for(curr_ans of answers){
		if(curr_ans.content.includes(keyword)){
			result_answ.push(curr_ans)
		}
	}

	load_result_question(result_ques);
	load_result_answer(result_answ);
}



function load_result_question(questions){	
	var i=0;
	questionResultEntries.innerHTML = '';

	while(i < questions.length){
		var tag_names = [];
		for (const tag_index of questions[i].tag_list){
			tag_names.push(tags[tag_index].name);
		}
		var question_answer_nums = 0;
		for (const ans of answers){
			if (ans.question_id == questions[i].id){
				question_answer_nums += 1;
			}
		}

		var is_resolved = "Unresolved";
		if(questions[i].is_resolved){
			is_resolved = "Resolved";
		}
		questionResultEntries.innerHTML +=
			"<div class='shortquestion'>"+
				"<a class='squestion' href='../answer/answer.html'>"+questions[i].title+"</a>"+
				"<div class='sinfo'>Asked by <a href='#''>"+users[questions[i].user_id].username+"</a> - "+questions[i].time+" - "+question_answer_nums+" Answers - "+is_resolved+"</div>"+
			"</div>";

		i++;
	}
}

function load_result_answer(answers){	
	var i=0;
	answerResultEntries.innerHTML = '';
	while(i < answers.length){
		answerResultEntries.innerHTML +=
			"<div class='shortquestion'>"+
				"<a class='sanswer' href='../answer/answer.html'>"+answers[i].content+"</a>"+
				"<div class='sinfo'>In reply to <a href='#'>"+questions[answers[i].question_id].title+"</a> - "+questions[i].time+"</div>"+
			"</div>"
		i++;
	}
}


