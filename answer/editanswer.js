$(document).ready(function() {

	let whichAnswer = 4;
	let whichQustion = answers[whichAnswer].question_id;

	//Getting the answer id from parameter if available
	const params = new URLSearchParams(window.location.search)
	let urlanswerid = params.get('answer_id');
	if (urlanswerid != null){
		whichAnswer = urlanswerid;
		whichQustion = answers[whichAnswer].question_id;
	}

	$('#qdesc').val(answers[whichAnswer].content);

$('#questionForm').submit(function(e) {
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
		window.location.href = `../answer/answer.html?question_id=${whichQustion}`;
	}
  });

});