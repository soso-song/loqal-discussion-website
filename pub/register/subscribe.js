"use strict"

let currentuser;
let tags;

const params = new URLSearchParams(window.location.search)
let back_url = params.get('back_url');

$(document).ready(function() {
	// get current user
	const url = '/currentuser';
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
  		const url = '/popularTags';

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
			let newDiv = `<a href="javascript:void(0);" class="interactivetag">${tags[i].name}<span class="tagside">Follow</span></a>`
			if(currentuser.tags.includes(tags[i]._id)){
				newDiv = `<a href="javascript:void(0);" class="interactivetag">${tags[i].name}<span class="tagside">Unfollow</span></a>`
				$('#currenttags').prepend(newDiv);
			}else if (limit < 10){
				$('#alltags').prepend(newDiv);
			}
		}
	}
	
	

	$('body').on('click', '.interactivetag', function () {
		const myVal = $(this).find( "span" ).text();
		if(myVal === "Follow"){
			$(this).find( "span" ).text("Unfollow");
			// Remove this tag from user by sending a post request to backend
		}else{
			$(this).find( "span" ).text("Follow");
			// Add new tag to user by sending a post request to backend
		}
	});

	$('body').on('click', '#continue', function () {
		const myVal = $(this).find( "span" ).text();
		if(myVal === "Follow"){
			$(this).find( "span" ).text("Unfollow");
			// Remove this tag from user by sending a post request to backend
		}else{
			$(this).find( "span" ).text("Follow");
			// Add new tag to user by sending a post request to backend
		}

		if(!back_url){
			location.href = "../user/user_dashboard.html";
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
			let newTag = `<a href="javascript:void(0);" class="interactivetag">${formattedString}<span class="tagside">Unfollow</span></a>`
			$('#currenttags').prepend(newTag);
		}
  	});



});