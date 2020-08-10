"use strict"

$(document).ready(function() {

	function previewTitle() {
        const titleString = $('#qtitle').val();
		if(titleString.length<1){
			$('#ptitle').text("Title");
			$('#ptitle').addClass("gray");
		}else{
			$('#ptitle').text(titleString);
			$('#ptitle').removeClass("gray");
		}
	}

	function previewDesc() {
        const descString = $('#qdesc').val();
		if(descString.length<1){
			$('#pdesc').text("Description");
			$('#pdesc').addClass("gray");
		}else{
			$('#pdesc').text(descString);
			$('#pdesc').removeClass("gray");	
		}
	}

	function previewTags() {
        $('#ptags').empty();
		const alltags = $('#qtags').val();
		const septags = alltags.split(',');
		for (let i = 0; i < septags.length; i++) {
			const formattedString = septags[i].trim().replace(/\s+/g, '-').toLowerCase();
			if(formattedString.length>0){
				const myTag = document.createElement('span')
				myTag.className = 'tag'
				myTag.appendChild(document.createTextNode(formattedString))
				$('#ptags').append(myTag);
			}
		}
	}
	
	// Setting initial values
	previewTitle();
	previewDesc();
	previewTags();

	// Setting values on change
	$('#qtitle').on('input', function() {
		previewTitle();
	});
	
	$('#qdesc').on('input', function() {
		previewDesc();
	});
	
	$('#qtags').on('input', function() {
		previewTags();
	});

	$('#questionForm').submit(function(e) {
		e.preventDefault();

		let hasError = false;

		$('#qtitle').prev().prev().text('');
		$('#qdesc').prev().prev().text('');
		$('#qtags').prev().prev().text('');

		const mytitle = $('#qtitle').val();
		const mydesc = $('#qdesc').val();
		const mytags = $('#qtags').val();

		if (mytitle.length < 1) {
			$('#qtitle').prev().prev().text('This field cannot be empty');
			hasError = true;
		}

		if (mydesc.length < 1) {
			$('#qdesc').prev().prev().text('This field cannot be empty');
			hasError = true;
		}

		if (mytags.length < 1) {
			$('#qtags').prev().prev().text('This field cannot be empty');
			hasError = true;
		}

		if(!hasError){
			// At this stage we will send data to backend
			// And redirect the user to the newly created question
			// window.location.href = "../answer/answer.html";
			createTags(mytags.split(',')).then((mytags) => {
				saveQuestion(mytitle, mydesc, mytags);
			})
		}
	});

	function saveQuestion(mytitle, mydesc, mytags){
		const url = '/questions';

		let data = {
			title: mytitle,
			content: mydesc,
			tags: mytags
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
			window.location.href = res.url;
		}).catch((error) => {
			console.log(error)
		})
	}

	async function createTags(tag_names){
		const url = '/tag';
		const url_c = '/countTagUse/';

		let data;
		let request;

		const mytags = [];

		for(let tag_name of tag_names){
			data = { name: tag_name };

			request = new Request(url, {
				method: 'post',
				body: JSON.stringify(data),
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
			})

			await fetch(request).then((res) => {
				return res.json();
			}).then((json) => {
				mytags.push(json.tag._id);
				// count this use of tag
				request = new Request(url_c+json.tag._id, {
					method: 'PATCH',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					}
				})
				fetch(request).then()
				.catch((error) => {
					console.log(error);
				})
			})
			.catch((error) => {
				console.log(error);
			})
		}

		return mytags;
	}
});

