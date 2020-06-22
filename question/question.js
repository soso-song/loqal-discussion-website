$(document).ready(function() {
	
	$('#qtitle').on('input', function() {
		const titleString = $('#qtitle').val();
		if(titleString.length<1){
			$('#ptitle').text("Title");
			$('#ptitle').addClass("gray");
		}else{
			$('#ptitle').text(titleString);
			$('#ptitle').removeClass("gray");
		}
	});
	
	$('#qdesc').on('input', function() {
		const descString = $('#qdesc').val();
		if(descString.length<1){
			$('#pdesc').text("Description");
			$('#pdesc').addClass("gray");
		}else{
			$('#pdesc').text(descString);
			$('#pdesc').removeClass("gray");	
		}
	});
	
	$('#qtags').on('input', function() {
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
		window.location.href = "../answer/answer.html";
	}
  });

});