"use strict"

$(document).ready(function() {
	let whichAnswer;
	let whichQuestion;

	//Getting the answer id from parameter if available
	const params = new URLSearchParams(window.location.search)
	const urlquestionid = params.get('question_id');
	const urlanswerid = params.get('answer_id');
	if (urlanswerid != null && urlquestionid != null){
		whichAnswer = urlanswerid;
		whichQuestion = urlquestionid;
		getAnswer();
	}


	$('#answerForm').submit(function(e) {
		e.preventDefault();

		let hasError = false;

		$('#qdesc').prev().prev().text('');

		const mydesc = $('#qdesc').val();

		if (mydesc.length < 1) {
			$('#qdesc').prev().prev().text('This field cannot be empty');
			hasError = true;
		}

		if(!hasError){
			// At this stage we will send data to backend
			// And redirect the user to the updated answer
			saveAnswer(mydesc);
		}
	});


	function getAnswer(){
		const url = '/answers/'+ whichQuestion + '/' + whichAnswer;

		fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			// Populating the field with the current answer
			$('#qdesc').val(json.content);
			$(document).prop('title', 'Edit Answer - '+ json.content);
			return;
		})
		.catch((error) => {
			console.log(error)
		})
	}

	function saveAnswer(mydesc){
		const url = '/answers/'+ whichQuestion + '/' + whichAnswer;

		let data = {
			content: mydesc
		}

		const request = new Request(url, {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		});

		fetch(request)
		.then(function(res) {
			if (res.status == 403){
				alert('You have no permission to edit this answer!');
				fetch('/answer?question_id=' + whichQuestion)
				.then((res)=>{
					window.location.href = res.url;
				})
				.catch((error) => {
					console.log(error);
				})
			} else {
				window.location.href = res.url;
			}
		})
		.catch((error) => {
			console.log(error)
		})
	}

});