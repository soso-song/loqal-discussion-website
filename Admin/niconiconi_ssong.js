
// // questions from database
// questions = [];

// // temporary post class and answer class
// class Post{
// 	constructor(title, content, user, tag){	
// 		this.title = title;
// 		this.content = content;
// 		this.user = user;
// 		this.tag = tag;
// 		this.is_flagged = user.flagged;			// in case flagged user making function
// 		this.answer = [];
// 		this.time = new Date().toLocaleTimeString();
// 	}

// 	add_answer(new_answer){
// 		this.answer.push(new_answer);
// 	}
// }
// class Answer{
// 	constructor(content, user){
// 		this.content = content;
// 		this.user = user;
// 		this.is_flagged = user.flagged;			// in case flagged user making function
// 		this.time = new Date().toLocaleTimeString();
// 	}
// }


// // post are made by some users
// questions.push(new Post('1st question title a1','1st qustion content a2', 'user1', 'tag is general'));
// questions.push(new Post('2st question title a3','2st qustion content a4', 'user2', 'tag is general'));
// questions.push(new Post('3st question a4 title','3st qustion content', 'user3', 'tag is pin_by_author'));
// questions.push(new Post('4st question title','4st qustion content', 'user1', 'tag is flagged_by_user'));
// // user make new answer note: when we are answering post, we should already know where is it
// questions[1].add_answer(new Answer('answering xcc to post1', 'user1'));
// questions[1].add_answer(new Answer('answering cxx to post1', 'user2'));
// questions[2].add_answer(new Answer('answering xcc to post2', 'user2'));
// questions[3].add_answer(new Answer('answering to post3', 'user1'));



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
	load_result_question();
	load_result_answer();
}


const questionResultEntries = document.querySelector('#questionResult');
const answerResultEntries = document.querySelector('#answerResult');
function load_result_question(){	
	//var table=document.getElementById("questionResult");
	var i=0;
	while(i < questions.length){
	//var row = table.insertRow(i).outerHTML=
		questionResultEntries.innerHTML +=
			"<tr>"+
				"<td>"+questions[i].id+"</td>"+
				"<td>"+questions[i].title+"</td>"+
				"<td>"+questions[i].content+"</td>"+
				"<td>"+questions[i].user_id+"</td>"+
				"<td>"+questions[i].tag_list+"</td>"+
				"<td>"+questions[i].is_flagged+"</td>"+
				"<td>"+questions[i].time+"</td>"+
			"</tr>";
		i++;
	}
}

function load_result_answer(){	
	//var table=document.getElementById("questionResult");
	var i=0;
	while(i < answers.length){
	//var row = table.insertRow(i).outerHTML=
		answerResultEntries.innerHTML +=
			"<tr>"+
				"<td>"+answers[i].id+"</td>"+
				"<td>"+answers[i].question_id+"</td>"+
				"<td>"+answers[i].content+"</td>"+
				"<td>"+answers[i].user_id+"</td>"+
				"<td>"+answers[i].is_best+"</td>"+
				"<td>"+answers[i].is_flagged+"</td>"+
				"<td>"+answers[i].time+"</td>"+
			"</tr>";
		i++;
	}
}




const postEntries = document.querySelector('#posts');
// postEntries.addEventListener('click', submit_tag);


function load_row()
{	
	//var table=document.getElementById("posts");
	var i=0;
	while(i < questions.length){
	//var row = table.insertRow(i).outerHTML=
		postEntries.innerHTML += "<tr id='row"+i+"'><td id='title_row"+i+"'>"+questions[i].title+"</td><td id='content_row"+i+"'>"+questions[i].content+"</td><td>"+questions[i].user+"</td><td id='tag_row"+i+"'>"+questions[i].tag+"</td><td>"+questions[i].is_flagged+"</td><td>"+questions[i].answer.length+"</td><td>"+questions[i].time+"</td><td><input type='button' id='edit_button"+i+"' value='Edit' class='edit' onclick='edit_row("+i+")'><input type='button' id='save_button"+i+"' value='Save' class='save' onclick='save_row("+i+")'><input type='button' value='Delete' class='delete' onclick='delete_row("+i+")'></td></tr>";
		i++;
	}
}


function edit_row(no){
	var title=document.getElementById("title_row"+no);
	var content=document.getElementById("content_row"+no);
	var tag=document.getElementById("tag_row"+no);

	var title_data=title.innerHTML;
	var content_data=content.innerHTML;
	var tag_data=tag.innerHTML;

	title.innerHTML="<input type='text' id='title_text"+no+"' value='"+title_data+"'>";
	content.innerHTML="<input type='text' id='content_text"+no+"' value='"+content_data+"'>";
	tag.innerHTML="<input type='text' id='tag_text"+no+"' value='"+tag_data+"'>";
}

function save_row(no){
	var title_val=document.getElementById("title_text"+no).value;
	var content_val=document.getElementById("content_text"+no).value;
	var tag_val=document.getElementById("tag_text"+no).value;

	document.getElementById("title_row"+no).innerHTML=title_val;
	document.getElementById("content_row"+no).innerHTML=content_val;
	document.getElementById("tag_row"+no).innerHTML=tag_val;
	questions[no].title = title_val;
	questions[no].content = content_val;
	questions[no].tag = tag_val;
}

function delete_row(no){
	document.getElementById("row"+no+"").outerHTML="";
}


// function add_row()
// {
// 	var table=document.getElementById("posts");
// 	var i=(table.rows.length)-1;
// 	var row = table.insertRow(i).outerHTML="<tr id='row"+i+"'><td id='name_row"+i+"'>"+new_name+"</td><td id='country_row"+i+"'>"+new_country+"</td><td id='age_row"+i+"'>"+new_age+"</td><td><input type='button' id='edit_button"+i+"' value='Edit' class='edit' onclick='edit_row("+i+")'> <input type='button' id='save_button"+i+"' value='Save' class='save' onclick='save_row("+i+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+i+")'></td></tr>";

// 	document.getElementById("new_name").value="";
// 	document.getElementById("new_country").value="";
// 	document.getElementById("new_age").value="";
// }


// "<tr id='row"+i+"'><td id='name_row"+i+"'>"+new_name+"</td><td id='country_row"+i+"'>"+new_country+"</td><td id='age_row"+i+"'>"+new_age+"</td><td><input type='button' id='edit_button"+i+"' value='Edit' class='edit' onclick='edit_row("+i+")'> <input type='button' id='save_button"+i+"' value='Save' class='save' onclick='save_row("+i+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+i+")'></td></tr>"




// <tr id="row1">
// 	<td id="name_row1">Ankit</td>
// 	<td id="country_row1">India</td>
// 	<td id="age_row1">20</td>
// 	<td>
// 		<input type="button" id="edit_button1" value="Edit" class="edit" onclick="edit_row('1')">
// 		<input type="button" id="save_button1" value="Save" class="save" onclick="save_row('1')">
// 		<input type="button" value="Delete" class="delete" onclick="delete_row('1')">
// 	</td>
// </tr>


// function returnBookToLibrary(e){
// 	e.preventDefault();
// 	// check if return button was clicked, otherwise do nothing.
// 	let hasBook = e.target.classList.contains('return');
// 	if (!hasBook){return;}
// 	// Call removeBookFromPatronTable()
// 	let theBook = libraryBooks[parseInt(e.target.parentElement.parentElement.children[0].innerText)];
// 	removeBookFromPatronTable(theBook);
// 	// Change the book object to have a patron of 'null'
// 	theBook.patron = null;
// }


// // Creates and adds a new patron
// function addNewPatron(e) {
// 	e.preventDefault();

// 	// Add a new patron to global array
// 	const newPatron = new Patron(patronAddForm.elements['newPatronName'].value);
// 	patrons.push(newPatron);

// 	// Call addNewPatronEntry() to add patron to the DOM
// 	addNewPatronEntry(newPatron);
// }

