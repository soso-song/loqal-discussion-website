



const postEntries = document.querySelector('#posts');
// postEntries.addEventListener('click', submit_tag);

function load_row()
{	
	//var table=document.getElementById("posts");
	var i=0;
	while(i < questions.length){
	//var row = table.insertRow(i).outerHTML=
		var tag_names = [];
		for (const tag_index of questions[i].tag_list){
			tag_names.push(tags[tag_index].name);
		}
		postEntries.innerHTML += 
			"<tr id='row"+i+"'>"+
				"<td id='title_row"+i+"'>"+questions[i].title+"</td>"+
				"<td id='content_row"+i+"'>"+questions[i].content+"</td>"+
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
	var title=document.getElementById("title_row"+no);
	var content=document.getElementById("content_row"+no);
	var tag=document.getElementById("tag_row"+no);
	var is_flag_cell=document.getElementById("is_flag_row"+no);
	var is_reso_cell=document.getElementById("is_reso_row"+no);


	// var title_data=title.innerHTML;
	// var content_data=content.innerHTML;
	//var tag_data=tag.innerHTML;

	title.innerHTML="<input type='text' id='title_text"+no+"' value='"+title.innerHTML+"'>";
	content.innerHTML="<input type='text' id='content_text"+no+"' value='"+content.innerHTML+"'>";
	is_flag_cell.innerHTML="<input type='button' id='is_flag_select"+no+"' value='"+is_flag_cell.innerHTML+"' onclick='change_is_flag("+no+")'>";
	is_reso_cell.innerHTML="<input type='button' id='is_reso_select"+no+"' value='"+is_reso_cell.innerHTML+"' onclick='change_is_reso("+no+")'>";
	// get and display current tags
	var question_tags = [];
	for (const tag_index of questions[no].tag_list){
		question_tags.push(tags[tag_index]);
	}
	// making adding tag options
	var html_tag = '';
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
	var title_val=document.getElementById("title_text"+no).value;
	var content_val=document.getElementById("content_text"+no).value;
	var is_flag_val=document.getElementById("is_flag_select"+no).value;
	var is_reso_val=document.getElementById("is_reso_select"+no).value;
	//var tag_val=document.getElementById("tag_text"+no);

	document.getElementById("title_row"+no).innerHTML=title_val;
	document.getElementById("content_row"+no).innerHTML=content_val;
	document.getElementById("is_flag_row"+no).innerHTML=is_flag_val;
	document.getElementById("is_reso_row"+no).innerHTML=is_reso_val;
	//get all tag_id for current question

	//document.getElementById("tag_row"+no).innerHTML='';
	var tag_div = document.getElementById("tag_row"+no);
	var tag_text = [];
	var tag_id = [];
	var i = 1;
	while(i < tag_div.childElementCount){
		if(tag_div.children[i].value != -1){
			tag_id.push(tag_div.children[i].value);
			tag_text.push(tag_div.children[i].options[tag_div.children[i].selectedIndex].text);
		}
		i++;
	}
	tag_div.innerHTML=tag_text;

	questions[no].tag_list = tag_id;

	questions[no].title = title_val;
	questions[no].content = content_val;
	questions[no].is_flagged = (is_flag_val == "true");
	questions[no].is_resolved = (is_reso_val == "true");
	//questions[no].tag = tag_val;
	document.getElementById("edit_button"+no).disabled = false;
	document.getElementById("save_button"+no).disabled = true;

}

function delete_row(no){
	document.getElementById("row"+no+"").outerHTML="";
	// questions.remove_index();
}


function add_tag_row(no){
	var tag=document.getElementById("tag_row"+no);
	var html_tag = '<select id="html_tag">';
	for(const tag_elem of tags){
		html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>";	
	}
	html_tag += "<option value=-1>remove</option>";
	html_tag += '</select>';
	tag.innerHTML += html_tag;
}


function change_is_flag(no){
	var is_flag_button=document.getElementById("is_flag_select"+no);
	if(is_flag_button.value == "true"){
		is_flag_button.value = false;
	}else{
		is_flag_button.value = true;
	}
}

function change_is_reso(no){
	var is_reso_button=document.getElementById("is_reso_select"+no);
	if(is_reso_button.value == "true"){
		is_reso_button.value = false;
	}else{
		is_reso_button.value = true;
	}
}