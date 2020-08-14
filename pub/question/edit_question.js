"use strict"

$(document).ready(function() {

	//Getting the question from database
	let myquestionid;
	let myquestion;
	let currentuser;

	fetch('/users/current')
	.then((res) => {
		if (res.status === 200) {
	        return res.json();
	    } else {
	        alert('Could not get question');
	    } 
	})
	.then((json) => {
		currentuser = json._id;
		getQuestionByURL();
	})
	.catch((error) => {
		console.log(error)
	})


	// find question with given question id in URL
	function getQuestionByURL() {
		const params = new URLSearchParams(window.location.search)
		const urlquestionid = params.get('question_id');

		if (urlquestionid != null){
			myquestionid = urlquestionid;
			getQuestionByID(myquestionid).then((question) => {
				myquestion = question;
				if(myquestion.user == currentuser){
					$(document).prop('title', 'Edit Question - ' + question.title);
					showQuestionInfo();	
				}
				else {
					alert('You have no permission to edit this question!');
					window.location.href = '/answer?question_id=' + myquestionid;
				}
				
			});
		}
	}

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

	function showQuestionInfo(){
		//Populating fields with current question data
		$('#qtitle').val(myquestion.title);
		$('#qdesc').val(myquestion.content);

		let alltags = '';
		const url = '/tag/names';

		const data = {
			ids: myquestion.tags
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
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			alltags = json.join();
			$('#qtags').val(alltags);
			// Setting initial values
			previewTitle();
			previewDesc();
			previewTags();
		})
		.catch((error) => {
			console.log(error);
		})

		
	}
	
	

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
			// And redirect the user to the newly updated question
			createTags(mytags.split(',')).then((mytags) => {
				userUpdateQuestion(myquestionid ,mytitle, mydesc, mytags);
			})
			.catch((error) => {
				console.log(error);
			})
		}
	});

});
