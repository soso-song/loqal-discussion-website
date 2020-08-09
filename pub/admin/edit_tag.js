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
// 	await fetch('/tag')
// 	.then((res) => {
// 		if (res.status === 200) {
//            return res.json();
//        	} else {
//             alert('Could not get tags');
//        	} 
// 	})
// 	.then((json) => {
// 		var currTags = json;
// 		log("hello");
// 		log(currTags);
// 		// load_row(currTags);
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})
// }
// function load_row(){
// 	getAlltags();
// }
function load_row(currTags)
{	
	postEntries.innerHTML = "";
	let i=0;
	while(i < currTags.length){
		postEntries.innerHTML += 
			"<tr id='row"+i+"'>"+
				"<td>"+currTags[i].name+"</td>"+
				// "<td id='is_geo_row"+i+"'>"+tags[i].is_geo+"</td>"+
				"<td id='name_row"+i+"'>"+currTags[i].name+"</td>"+
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
	// let curr_tag;
	// if (!is_empty){
	// 	for(curr_tag of tags){
	// 		if(tag_name == curr_tag.name){
	// 			is_exist = true;
	// 			break;
	// 		}
	// 	}
	// }
	// //handling errors
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
    .then(function(res) {

        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        // const message = document.querySelector('#message')
        // if (res.status === 200) {
        //     // If student was added successfully, tell the user.
        //     console.log('Added tag')
        //     message.innerText = 'Success: Added a student.'
        //     message.setAttribute("style", "color: green")
           
        // } else {
        //     // If server couldn't add the student, tell the user.
        //     // Here we are adding a generic message, but you could be more specific in your app.
        //     message.innerText = 'Could not add student'
        //     message.setAttribute("style", "color: red")
     
        // }
        // log(res)  // log the result in the console for development purposes,
        //                   //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
	// tags.push(new Tag(tag_name));
	getAlltags();
}