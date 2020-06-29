"use strict"

const postEntries = document.querySelector('#posts');
// postEntries.addEventListener('click', submit_tag);

function load_row()
{	
	//const table=document.getElementById("posts");
	let i=0;
	while(i < tags.length){
	//const row = table.insertRow(i).outerHTML=
		// const tag_names = [];
		// for (const tag_index of answers[i].tag_list){
		// 	tag_names.push(tags[tag_index].name);
		// }
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
	//const title=document.getElementById("title_row"+no);
	//const id_cell=document.getElementById("id_row"+no);
	// const is_geo_cell=document.getElementById("is_geo_row"+no);
	const name_cell=document.getElementById("name_row"+no);


	//title.innerHTML="<input type='text' id='title_text"+no+"' value='"+title_data+"'>";
	//id_cell.innerHTML="<input type='text' id='content_select"+no+"' value='"+id_cell.innerHTML+"'>";
	// is_geo_cell.innerHTML="<input type='button' id='is_geo_select"+no+"' value='"+is_geo_cell.innerHTML+"' onclick='change_is_geo("+no+")'>";
	name_cell.innerHTML="<input type='text' id='name_select"+no+"' value='"+name_cell.innerHTML+"'>";
}




function save_row(no){
	const name_val=document.getElementById("name_select"+no).value;

	if(name_val.length < 1){
		window.alert('Tag name can not be empty!');
		return;
	}

	document.getElementById("name_row"+no).innerHTML=name_val;

	tags[no].name = name_val;
	document.getElementById("edit_button"+no).disabled = false;
	document.getElementById("save_button"+no).disabled = true;

}

function delete_row(no){
	document.getElementById("row"+no+"").outerHTML="";
}
