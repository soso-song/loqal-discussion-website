"use strict"

//connect and get variabe from db
//questions = pull_questions();
//tags = pull_tags();

const postEntries = document.querySelector('#posts');
// postEntries.addEventListener('click', submit_tag);

function load_row()
{	
	//const table=document.getElementById("posts");
	let i=0;
	while(i < questions.length){
	//const row = table.insertRow(i).outerHTML=
		const tag_names = [];
		for (const tag_index of questions[i].tag_list){
			tag_names.push(tags[tag_index].name);
		}
		postEntries.innerHTML += 
			"<tr id='row"+i+"'>"+
				"<td id='title_row"+i+"'><textarea id='title_text"+i+"' disabled>"+questions[i].title+"</textarea></td>"+
				"<td id='content_row"+i+"'><textarea id='content_text"+i+"' disabled>"+questions[i].content+"</textarea></td>"+
				"<td>"+users[questions[i].user_id].username+"</td>"+
				"<td id='tag_row"+i+"'>"+tag_names+"</td>"+
				"<td id='is_flag_row"+i+"'>"+questions[i].is_flagged+"</td>"+
				"<td id='is_reso_row"+i+"'>"+questions[i].is_resolved+"</td>"+
				//"<td>"+questions[i].answer.length+"</td>"+
				"<td>"+questions[i].time+"</td>"+
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
	const title=document.getElementById("title_row"+no).firstChild;
	const content=document.getElementById("content_row"+no).firstChild;
	const tag=document.getElementById("tag_row"+no);
	const is_flag_cell=document.getElementById("is_flag_row"+no);
	const is_reso_cell=document.getElementById("is_reso_row"+no);


	// const title_data=title.innerHTML;
	// const content_data=content.innerHTML;
	//const tag_data=tag.innerHTML;
	title.disabled = false;
	content.disabled = false;
	// title.innerHTML="<textarea id='title_text"+no+"'>"+title.innerHTML+"</textarea>";
	// content.innerHTML="<textarea id='content_text"+no+"'>"+content.innerHTML+"</textarea>";
	is_flag_cell.innerHTML="<input type='button' id='is_flag_select"+no+"' value='"+is_flag_cell.innerHTML+"' onclick='change_is_flag("+no+")'>";
	is_reso_cell.innerHTML="<input type='button' id='is_reso_select"+no+"' value='"+is_reso_cell.innerHTML+"' onclick='change_is_reso("+no+")'>";
	// get and display current tags
	const question_tags = [];
	for (const tag_index of questions[no].tag_list){
		question_tags.push(tags[tag_index]);
	}
	// making adding tag options
	let html_tag = '';
	for(const curr_tag of question_tags){
		html_tag += '<select id="html_tag">';
		for(const tag_elem of tags){
			if(curr_tag.id == tag_elem.id){
				html_tag += "<option value="+tag_elem.id+" selected>"+tag_elem.name +"</option>";	
			}else{
				html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>";	
			}
		}
		html_tag += "<option value=-1>remove</option>";
		html_tag += '</select>';
	}
	//tag.innerHTML = "<div id='tag_text"+no+">'";
	tag.innerHTML = "<input type='button' value='Add Tag' class='add_tag' onclick='add_tag_row("+no+")'>";
	tag.innerHTML += html_tag;
	//tag.innerHTML="<input type='text' id='tag_text"+no+"' value='"+tag_data+"'>";
	
	//let html_com_tag = '';
}


function save_row(no){
	const title_val=document.getElementById("title_text"+no).value;
	if (title_val.length < 1){
		window.alert('Question title can not be empty!');
		return;
	}

	const content_val=document.getElementById("content_text"+no).value;
	if (content_val.length < 1){
		window.alert('Question content can not be empty!');
		return;
	}

	const is_flag_val=document.getElementById("is_flag_select"+no).value;
	const is_reso_val=document.getElementById("is_reso_select"+no).value;


	//get all tag_id for current question
	const tag_div = document.getElementById("tag_row"+no);
	const tag_text = new Set();
	const tag_id = new Set();

	let i = 1;
	while(i < tag_div.childElementCount){
		if(tag_div.children[i].value != -1){
			tag_id.add(parseInt(tag_div.children[i].value));
			tag_text.add(tag_div.children[i].options[tag_div.children[i].selectedIndex].text);
		}
		i++;
	}
	// this if statement checks the tag is not empty
	if(tag_id.size == 0){
		console.log("no change due to tag list is empty");
		alert("no change due to tag list is empty, question index: " + no);
		return;
	}
	// above are get value part
	// below are set value part
	//set html values
	tag_div.innerHTML= Array.from(tag_text);
	document.getElementById("title_text"+no).disabled = true;
	document.getElementById("content_text"+no).disabled = true;
	document.getElementById("is_flag_row"+no).innerHTML=is_flag_val;
	document.getElementById("is_reso_row"+no).innerHTML=is_reso_val;

	//below is write function to questions database
	//edit_question(no,tag_id,title_val,content_val,(is_flag_val == "true"),(is_reso_val == "true"))
	questions[no].tag_list = Array.from(tag_id);
	questions[no].title = title_val;
	questions[no].content = content_val;
	questions[no].is_flagged = (is_flag_val == "true");
	questions[no].is_resolved = (is_reso_val == "true");
	document.getElementById("edit_button"+no).disabled = false;
	document.getElementById("save_button"+no).disabled = true;
}

function delete_row(no){
	document.getElementById("row"+no+"").outerHTML="";
	// questions.remove_index();
}


function add_tag_row(no){
	const tag=document.getElementById("tag_row"+no);
	let html_tag = '<select id="html_tag">';
	for(const tag_elem of tags){
		html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>";	
	}
	html_tag += "<option value=-1>remove</option>";
	html_tag += '</select>';
	// save the index of each assigned option
	let options = tag.children;
	let selected_index = []
	for (let i = 1; i < options.length; i++) {
	  selected_index.push(options[i].selectedIndex);
	}
	// add new variable
	tag.innerHTML += html_tag;
	// re-select selected options
	for (let i = 1; i < options.length-1; i++) {
	  options[i].selectedIndex = selected_index[i-1];
	}
}


function change_is_flag(no){
	const is_flag_button=document.getElementById("is_flag_select"+no);
	if(is_flag_button.value == "true"){
		is_flag_button.value = false;
	}else{
		is_flag_button.value = true;
	}
}

function change_is_reso(no){
	const is_reso_button=document.getElementById("is_reso_select"+no);
	if(is_reso_button.value == "true"){
		is_reso_button.value = false;
	}else{
		is_reso_button.value = true;
	}
}