"use strict"

//connect and get variabe from db
//tags = pull_tags();

const postEntries = document.querySelector('#posts');
checkAdminUser().then((res) => {
	if (res){
		currentuser = res;
		getAlltags();
	}
})
.catch((error) => {
	console.log(error);
})


async function getAlltags(){
	await fetch('/tag')
	.then((res) => {
		if (res.status === 200) {
           return res.json();
       	} else {
            alert('Could not get tags');
       	} 
	})
	.then((json) => {
		tags = json;
		load_row();
	})
	.catch((error) => {
		console.log(error)
	})
}

function load_row()
{	
	postEntries.innerHTML = "";
	let i=0;
	while(i < tags.length){
		postEntries.innerHTML += 
			"<tr id='row"+i+"'>"+
				"<td>"+tags[i].id+"</td>"+
				// "<td id='is_geo_row"+i+"'>"+tags[i].is_geo+"</td>"+
				"<td id='name_row"+i+"'>"+tags[i].name+"</td>"+
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
	const name_cell=document.getElementById("name_row"+no);
	
	name_cell.innerHTML="<input type='text' id='name_select"+no+"' value='"+name_cell.innerHTML+"'>";
}




function save_row(no){
	const name_val=document.getElementById("name_select"+no).value;

	if(name_val.length < 1){
		window.alert('Tag name can not be empty!');
		return;
	}

	document.getElementById("name_row"+no).innerHTML=name_val;
	//connect and save variabe to db
	//push_name(name_val);
	tags[no].name = name_val;
	document.getElementById("edit_button"+no).disabled = false;
	document.getElementById("save_button"+no).disabled = true;

}

function delete_row(no){
	document.getElementById("row"+no+"").outerHTML="";
}


function add_tag(){
	const tag_name=document.getElementById("tagName").value;
	const tag_erro=document.getElementById("addTagError");
	//check errors
	let is_exist = false;
	let is_empty = tag_name == "";
	let curr_tag;
	if (!is_empty){
		for(curr_tag of tags){
			if(tag_name == curr_tag.name){
				is_exist = true;
				break;
			}
		}
	}
	//handling errors
	if(is_empty){
		tag_erro.innerHTML = "please enter a tag name";
		return;
	}else if(is_exist){
		tag_erro.innerHTML = "tag exist with id: " + curr_tag.id;
		return;
	}

	//no error, saving data
	tags.push(new Tag(tag_name));
	load_row();
}