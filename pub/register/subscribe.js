"use strict"

let currentuser;
let tags;

const params = new URLSearchParams(window.location.search)
let back_url = params.get('back_url');

$(document).ready(function() {

	// get current user
	const url = '/users/current';
	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	})

	fetch(request)
	.then((res) => {
		if (res.status === 200) {
	        // return a promise that resolves with the JSON body
	        return res.json();
	    } else {
	        alert('Could not get user');
	    } 
	})
	.then((json) => {
		currentuser = json;
		getPopularTags();
	})
	.catch((error) => {
		console.log(error)
	})


	// get the list of tags sorted in decreasing number of usage
	function getPopularTags(){
  		const url = '/tag/popular';

		fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			tags = json;
			showTags();
		})
		.catch((error) => {
			console.log(error)
		})
  	}

  	



	function showTags(){
		// limit the number of popular tags showing
		let limit = 0;
		// Display the current user tags
		for (let i = 0; i < tags.length; i++) {
			let newDiv = '<a href="javascript:void(0);" class="interactivetag" id="' + tags[i]._id + '">' + tags[i].name + '<span class="tagside">Follow</span></a>';
			if(currentuser.tags.includes(tags[i]._id)){
				newDiv = '<a href="javascript:void(0);" class="interactivetag" id="' + tags[i]._id + '">' + tags[i].name + '<span class="tagside">Unfollow</span></a>';
				$('#currenttags').prepend(newDiv);
			}else if (limit < 10){
				$('#alltags').prepend(newDiv);
			}
		}
	}

	$('body').on('click', '.interactivetag', function (e) {
		e.preventDefault();
		const myVal = $(this).find( "span" ).text();
		if(myVal === "Follow"){
			$(this).find( "span" ).text("Unfollow");
			// Add new tag to user by sending a post request to backend
			if (e.target.id == "") {
				followTag(e.target.parentElement.id);
			}else {
				followTag(e.target.id);
			}
		}else{
			$(this).find( "span" ).text("Follow");
			// Remove this tag from user by sending a post request to backend
			if (e.target.id == "") {
				unfollowTag(e.target.parentElement.id);
			}else {
				unfollowTag(e.target.id);
			}
		}
	});

	$('body').on('click', '#continue', function () {
		if(!back_url){
			location.href = "/dashboard";
		}else{
			location.href = back_url;
		}
	});


	$('#tagForm').submit(function(e) {
		e.preventDefault();

		let hasError = false;

		$('#newtag').prev().text('');

		const newTagVal = $('#newtag').val();
		const formattedString = newTagVal.trim().replace(/\s+/g, '-').toLowerCase();

		if (formattedString.length < 1) {
			$('#newtag').prev().text('This field cannot be empty');
			hasError = true;
		}

		if(!hasError){
			// At this stage we will send data to backend to add tag to user and will get the tag id from back-end
			customTag(formattedString);
			
		}
  	});


  	function followTag(tag_id){
		const url = '/tag/follow/' + tag_id + '/' + currentuser._id;

		const request = new Request(url, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		});

		fetch(request).then()
		.catch((error) => {
			console.log(error);
		})
	}

	function unfollowTag(tag_id){
		const url = '/tag/unfollow/' + tag_id + '/' + currentuser._id;

		const request = new Request(url, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		});

		fetch(request).then()
		.catch((error) => {
			console.log(error);
		})
	}

	function customTag(tag_name){
		const url = '/tag';

		tag_name = tag_name.trim().replace(/ /g, '-');

		let data = {
			name: tag_name
		}

		const request = new Request(url, {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		});

		fetch(request)
		.then(function(res) {
			return res.json();
		})
		.then((json) => {
			let newTag = '<a href="javascript:void(0);" class="interactivetag" id="' + json.tag._id + '">' + json.tag.name + '<span class="tagside">Unfollow</span></a>';
			$('#currenttags').prepend(newTag);
			followTag(json.tag._id);
		})
		.catch((error) => {
			console.log(error)
		})
	}
});