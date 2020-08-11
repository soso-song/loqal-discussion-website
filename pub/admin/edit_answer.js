"use strict"

//connect and get variabe from db
let questions;
let currentuser;
let dict = {};	// dictionary for mapping row number to question_id/answer_id

const postEntries = document.querySelector('#posts');
// postEntries.addEventListener('click', submit_tag);


checkAdminUser().then((res) => {
	if (res){
		currentuser = res;
		getAllQuestions();
	}
})
.catch((error) => {
	console.log(error);
})


async function getAllQuestions(){
	await fetch('/questions')
	.then((res) => {
		if (res.status === 200) {
           return res.json();
       	} else {
            alert('Could not get questions');
       	} 
	})
	.then((json) => {
		questions = json;
		load_row();
	})
	.catch((error) => {
		console.log(error)
	})
}




async function load_row()
{	
	let i=0;
	console.log(questions)
	for (const question of questions){

		for (const answer of questions[i].answers){
			await getUserInfo(answer.user)
			.then((a_user) => {
				postEntries.innerHTML += 
					"<tr id='row"+i+"'>"+
					"<td>"+question.title+"</td>"+
					"<td>"+a_user.username+"</td>"+
					"<td id='content_row"+i+"'><textarea id='content_text"+i+"' disabled>"+answer.content+"</textarea></td>"+
					"<td id='is_best_row"+i+"'>"+answer.isBest+"</td>"+
					"<td id='is_flag_row"+i+"'>"+answer.isFlagged+"</td>"+
					"<td>"+answer.lastUpdated+"</td>"+
					"<td>"+
						"<input type='button' id='edit_button"+i+"' value='Edit' class='edit' onclick='edit_row("+i+")'>"+
						"<input type='button' id='save_button"+i+"' value='Save' class='save' onclick='save_row("+i+")' disabled>"+
						// "<input type='button' value='Delete' class='delete' onclick='delete_row("+i+")'>"+
					"</td>"+
				"</tr>";

				dict[i] = question._id + "/" + answer._id;
				i++;
			})
		}
	}
	



}


function edit_row(no){
	document.getElementById("edit_button"+no).disabled = true;
	document.getElementById("save_button"+no).disabled = false;
	//var title=document.getElementById("title_row"+no);
	const content_text=document.getElementById("content_row"+no).firstChild;
	const is_best_cell=document.getElementById("is_best_row"+no);
	const is_flag_cell=document.getElementById("is_flag_row"+no);

	content_text.disabled = false;
	is_best_cell.innerHTML="<input type='button' id='is_best_select"+no+"' value='"+is_best_cell.innerHTML+"' onclick='change_is_best("+no+")'>";
	is_flag_cell.innerHTML="<input type='button' id='is_flag_select"+no+"' value='"+is_flag_cell.innerHTML+"' onclick='change_is_flag("+no+")'>";
}




function save_row(no){
	const content_val=document.getElementById("content_text"+no).value;
	if (content_val.length < 1){
		window.alert("Answer can not be empty!");
		return;
	}
	const is_best_val=document.getElementById("is_best_select"+no).value;
	const is_flag_val=document.getElementById("is_flag_select"+no).value;
	//var tag_val=document.getElementById("tag_text"+no);


	document.getElementById("content_text"+no).disabled = true;
	document.getElementById("is_best_row"+no).innerHTML=is_best_val;
	document.getElementById("is_flag_row"+no).innerHTML=is_flag_val;
	//get all tag_id for current question

	//document.getElementById("tag_row"+no).innerHTML='';

	//below is write function to answer database
	updateAnswer(content_val, (is_best_val == "true"), (is_flag_val == "true"), no);


	// answers[no].content = content_val;
	// answers[no].is_best = (is_best_val == "true");
	// answers[no].is_flagged = (is_flag_val == "true");
	document.getElementById("edit_button"+no).disabled = false;
	document.getElementById("save_button"+no).disabled = true;

}

function delete_row(no){
	document.getElementById("row"+no+"").outerHTML="";
	// answers.remove_index();
}


function change_is_best(no){
	let is_flag_button=document.getElementById("is_best_select"+no);
	if(is_flag_button.value == "true"){
		is_flag_button.value = false;
	}else{
		is_flag_button.value = true;
	}
}
function change_is_flag(no){
	let is_flag_button=document.getElementById("is_flag_select"+no);
	if(is_flag_button.value == "true"){
		is_flag_button.value = false;
	}else{
		is_flag_button.value = true;
	}
}

function updateAnswer(content, isBest, isFlagged, no){

		const url = '/editAnswer/'+ dict[no];

		let data = {
			content: content,
			isBest: isBest,
			isFlagged: isFlagged
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
		.then(function(res) {
			if (res.status == 403){
				alert('You have no permission to edit this answer!');
				fetch('/answer?question_id=' + whichQuestion)
				.then((res)=>{
					window.location.href = res.url;
				})
				.catch((error) => {
					console.log(error);
				})
			}
		})
		.catch((error) => {
			console.log(error)
		})
	}