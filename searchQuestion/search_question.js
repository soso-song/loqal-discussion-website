

const searchQuestionForm = document.querySelector('#searchQuestionForm');
searchQuestionForm.addEventListener('submit', search_questions);

function search_questions(e) {
	e.preventDefault();
	const keyword = searchQuestionForm.elements['keyword'].value;
	// console.log(searchQuestionForm.elements['keyword']);
	// console.log(keyword);
	result_ques = [];
	result_answ = [];
	for(curr_que of questions){
		if(curr_que.title.includes(keyword) || curr_que.content.includes(keyword)){
			result_ques.push(curr_que);
			//console.log(curr_que);
		}
	}
	for(curr_ans of answers){
		if(curr_ans.content.includes(keyword)){
			result_answ.push(curr_ans)
		}
	}
	console.log('ques_result:');
	console.log(result_ques);
	console.log('answ_result:');
	console.log( result_answ);
	// document.write(result_post);
	// document.write(result_answ);
	load_result_question(result_ques);
	load_result_answer(result_answ);
}


const questionResultEntries = document.querySelector('#questionResult');
const answerResultEntries = document.querySelector('#answerResult');
function load_result_question(questions){	
	//var table=document.getElementById("questionResult");
	var i=0;
	questionResultEntries.innerHTML = '';
	

	while(i < questions.length){
	//var row = table.insertRow(i).outerHTML=
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

			// "<tr>"+
			// 	"<td>"+questions[i].id+"</td>"+
			// 	"<td>"+questions[i].title+"</td>"+
			// 	"<td>"+questions[i].content+"</td>"+
			// 	"<td>"+users[questions[i].user_id].username+"</td>"+
			// 	"<td>"+tag_names+"</td>"+
			// 	"<td>"+questions[i].is_flagged+"</td>"+
			// 	"<td>"+questions[i].time+"</td>"+
			// "</tr>";
		i++;
	}
}

function load_result_answer(answers){	
	//var table=document.getElementById("questionResult");
	var i=0;
	answerResultEntries.innerHTML = '';
	while(i < answers.length){
	//var row = table.insertRow(i).outerHTML=
		answerResultEntries.innerHTML +=
			"<div class='shortquestion'>"+
				"<a class='sanswer' href='../answer/answer.html'>"+answers[i].content+"</a>"+
				"<div class='sinfo'>In reply to <a href='#'>"+questions[answers[i].question_id].title+"</a> - "+questions[i].time+"</div>"+
			"</div>"
			// "<tr>"+
			// 	"<td>"+answers[i].id+"</td>"+
			// 	"<td>"+answers[i].question_id+"</td>"+
			// 	"<td>"+answers[i].content+"</td>"+
			// 	"<td>"+users[answers[i].user_id].username+"</td>"+
			// 	"<td>"+answers[i].is_best+"</td>"+
			// 	"<td>"+answers[i].is_flagged+"</td>"+
			// 	"<td>"+answers[i].time+"</td>"+
			// "</tr>";
		i++;
	}
}


