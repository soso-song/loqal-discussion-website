"use strict"

//connect and get variabe from db
//tags = pull_tags();
let currentuser;
let currTags;
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
	const url = '/tag';
	const get_request =  new Request(url,{
		method:"get",
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});
	fetch(get_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			alert('could not get notices');
		}
	})
	.then(data => {
		console.log(data);
		currTags = data;
		load_row(currTags);
	})
	.catch((error) => {
		console.log(error)
	});
}

function load_row(currTags)
{	
	postEntries.innerHTML = "";
	let i=0;
	while(i < currTags.length){
		postEntries.innerHTML += 
			"<tr id='row"+i+"'>"+
				"<td id=tagId"+i+">"+currTags[i]._id+"</td>"+
				// "<td id='is_geo_row"+i+"'>"+tags[i].is_geo+"</td>"+
				"<td id='name_row"+i+"'>"+currTags[i].name+"</td>"+
				"<td>"+
					"<input type='button' id='edit_button"+i+"' value='Edit' class='edit' onclick='edit_row("+i+")'>"+
					"<input type='button' id='save_button"+i+"' value='Save' class='save' onclick='save_row("+i+")' disabled>"+
					// "<input type='button' value='Delete' class='delete' onclick='delete_row("+i+")'>"+
				"</td>"+
				"<td>"+currTags[i].count+"</td>"
			"</tr>";
		i++;
	}
}


function edit_row(no){
	document.getElementById("edit_button"+no).disabled = true;
	document.getElementById("save_button"+no).disabled = false;
	const name_cell=document.getElementById("name_row"+no);
	const url = '/tag';
	name_cell.innerHTML="<input type='text' id='name_select"+no+"' value='"+name_cell.innerHTML+"'>";
}




function save_row(no){
	var url = '/tag/';
	const id =  document.getElementById("tagId"+no).innerHTML;
	url = url+id;
	const name_val = document.getElementById("name_select"+no).value;
	if(name_val.length < 1){
		window.alert('Tag name can not be empty!');
		return;
	}
	let data = {
		name:name_val
	}
	const get_request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
	});
	fetch(get_request)
		.then(function(res) {
			if (res.status == 403){
				alert('You have no permission to edit this tag!');
			} else {
				alert("Successful");
			}
		})
		.catch((error) => {
			console.log(error)
	})
	
	document.getElementById("name_row"+no).innerHTML=name_val;

	//connect and save variabe to db
	//push_name(name_val);
	tags[no].name = name_val;
	document.getElementById("edit_button"+no).disabled = false;
	document.getElementById("save_button"+no).disabled = true;

}

function delete_row(no){
	var url = "/tag";
	document.getElementById("row"+no+"").outerHTML="";
	const get_request =  new Request(url,{
		method:"delete",
		headers: {
			'Accept': 'application/json, text/plain, */*',
		}
	});
	fetch(get_request)
	.then(res => {
		if(res.status === 200){
			return res.json();
		}else{
			alert('could not get notices');
		}
	})
	.then(data => {
		//console.log(data);
		data.forEach(notice => show_notice(notice));
		//load_result_question(data);
	})
	.catch((error) => {
		console.log(error)
	});
}


function add_tag(){
	const tag_name=document.getElementById("tagName").value;
	const tag_erro=document.getElementById("addTagError");
	//check errors
	let is_exist = false;
	let is_empty = tag_name == "";
	if(is_empty){
		tag_erro.innerHTML = "please enter a tag name";
		return;
	}else if(is_exist){
		tag_erro.innerHTML = "tag exist with id: " + curr_tag.id;
		return;
	}
	const url = '/tag';
	//no error, saving data
	let data = {
		"name":tag_name
	}
	const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {}).catch((error) => {
        log(error)
    })
	// tags.push(new Tag(tag_name));
	getAlltags();
}