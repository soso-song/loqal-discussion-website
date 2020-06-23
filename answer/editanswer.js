$(document).ready(function() {

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
		// And redirect the user to the newly created question
		window.location.href = "../answer/answer.html";
	}
  });

});