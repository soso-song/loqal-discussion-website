"use strict"

const postEntries = document.querySelector('#posts');
// postEntries.addEventListener('click', submit_tag);

function load_row()
{	
	//const table=document.getElementById("posts");
	let i=0;
	while(i < answers.length){
	//let row = table.insertRow(i).outerHTML=
		// const tag_names = [];
		// for (const tag_index of answers[i].tag_list){
		// 	tag_names.push(tags[tag_index].name);
		// }
		postEntries.innerHTML += 
			"<tr id='row"+i+"'>"+
				"<td>"+answers[i].id+"</td>"+
				"<td>"+answers[i].question_id+"</td>"+
				"<td>"+answers[i].answer_id+"</td>"+
				"<td>"+users[answers[i].user_id].username+"</td>"+
				"<td id='content_row"+i+"'><textarea id='content_text"+i+"' disabled>"+answers[i].content+"</textarea></td>"+
				"<td id='is_best_row"+i+"'>"+answers[i].is_best+"</td>"+
				"<td id='is_flag_row"+i+"'>"+answers[i].is_flagged+"</td>"+
				"<td>"+answers[i].time+"</td>"+
				"<td>"+
					"<input type='button' id='edit_button"+i+"' value='Edit' class='edit' onclick='edit_row("+i+")'>"+
					"<input type='button' id='save_button"+i+"' value='Save' class='save' onclick='save_row("+i+")' disabled>"+
					// "<input type='button' value='Delete' class='delete' onclick='delete_row("+i+")'>"+
				"</td>"+
			"</tr>";
		i++;
	}
}


function edit_row(no){
	document.getElementById("edit_button"+no).disabled = true;
	document.getElementById("save_button"+no).disabled = false;
	//var title=document.getElementById("title_row"+no);
	const content_text=document.getElementById("content_row"+no).firstChild;
	const is_best_cell=document.getElementById("is_best_row"+no);
	const is_flag_cell=document.getElementById("is_flag_row"+no);


	//title.innerHTML="<input type='text' id='title_text"+no+"' value='"+title_data+"'>";
	//content_cell.innerHTML="<input type='text' id='content_select"+no+"' value='"+content_cell.innerHTML+"'>";
	content_text.disabled = false;
	is_best_cell.innerHTML="<input type='button' id='is_best_select"+no+"' value='"+is_best_cell.innerHTML+"' onclick='change_is_best("+no+")'>";
	is_flag_cell.innerHTML="<input type='button' id='is_flag_select"+no+"' value='"+is_flag_cell.innerHTML+"' onclick='change_is_flag("+no+")'>";
}




function save_row(no){

	
	const content_val=document.getElementById("content_text"+no).value;
	const is_best_val=document.getElementById("is_best_select"+no).value;
	const is_flag_val=document.getElementById("is_flag_select"+no).value;
	//var tag_val=document.getElementById("tag_text"+no);


	document.getElementById("content_text"+no).disabled = true;
	document.getElementById("is_best_row"+no).innerHTML=is_best_val;
	document.getElementById("is_flag_row"+no).innerHTML=is_flag_val;
	//get all tag_id for current question

	//document.getElementById("tag_row"+no).innerHTML='';

	//below is write function to answer database
	//edit_answer(no,content_val,(is_best_val == "true"),(is_flag_val == "true"))
	answers[no].content = content_val;
	answers[no].is_best = (is_best_val == "true");
	answers[no].is_flagged = (is_flag_val == "true");
	//answers[no].tag = tag_val;
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