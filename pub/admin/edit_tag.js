"use strict"

//connect and get variabe from db
//tags = pull_tags();
let currentuser;
let currTags;
const postEntries = document.querySelector('#posts');
const tag_erro = document.getElementById("addTagError");
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
		currTags = data;
		load_rows(currTags);
	})
	.catch((error) => {
		console.log(error)
	});
}

function load_rows(currTags){	
	postEntries.innerHTML = "";
	let tag_num=0;
	while(tag_num < currTags.length){
		load_row(currTags[tag_num],tag_num)
		tag_num++;
	}
}

function load_row(tag, tag_num){
	postEntries.innerHTML += 
		"<tr id='row"+tag_num+"'>"+
			"<td id='name_row"+tag_num+"'>"+tag.name+"</td>"+
			"<td>"+
				"<input type='button' id='edit_button"+tag_num+"' value='Edit' class='edit' onclick='edit_row("+tag_num+")'>"+
				"<input type='button' id='save_button"+tag_num+"' value='Save' class='save' onclick='save_row("+tag_num+")' disabled>"+
			"</td>"+
			"<td>"+tag.count+"</td>"
		"</tr>";
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
	// const id =  document.getElementById("tagId"+no).innerHTML;
	url += currTags[no]._id;
	
	const name_val = document.getElementById("name_select"+no).value.trim().replace(/ /g, '-');
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
			if (res.status == 400){
				alert('Tag with this tag name already exist!');
			} else {
				alert("Successful");
				document.getElementById("name_row"+no).innerHTML=name_val;
				document.getElementById("edit_button"+no).disabled = false;
				document.getElementById("save_button"+no).disabled = true;
			}
		})
		.catch((error) => {
			console.log(error)
	})
	
	

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
		data.forEach(notice => show_notice(notice));
	})
	.catch((error) => {
		console.log(error)
	});
}


function add_tag(){
	let tag_name = document.getElementById("tagName").value;
	tag_name = tag_name.trim().replace(/ /g, '-'); // replace spaces in tag name to '-'
	if(tag_name == ""){
		tag_erro.innerHTML = "please enter a tag name";
		return;
	}
	//no error, saving data
	const url = '/tag';
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
    fetch(request)
    .then(res => {
    	if(res.status === 200){
    		return res.json();
    	}else{
    		handle_addTag(null,true);
    	}
    })
    .then(data => {
    	handle_addTag(data,false);
    })
    .catch((error) => {
        console.log(error)
    })
}

function handle_addTag(data, status_error){
	//check errors
	const is_exist = data.duplicate;
	if(status_error){
		tag_erro.innerHTML = "server error";
		return;
	}else if(is_exist){
		tag_erro.innerHTML = "tag existed";
		return;
	}// assume no error->tag add success -> just push data to table
	currTags.push(data.tag);
	load_row(data.tag,currTags.length-1);
}