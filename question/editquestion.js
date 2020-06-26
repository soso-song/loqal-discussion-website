$(document).ready(function() {

	//Getting the question from database
	let myquestionid = 4;
	let myquestion = questions[myquestionid];

	//Getting the question id from parameter if available
	const params = new URLSearchParams(window.location.search)
	let urlquestionid = params.get('question_id');
	if (urlquestionid != null){
		myquestionid = urlquestionid;
		myquestion = questions[myquestionid];
	}

	$('#qtitle').val(myquestion.title);
	$('#qdesc').val(myquestion.content);

	let alltags = '';
	for (let i = 0; i < myquestion.tag_list.length; i++) {
		alltags += tags[myquestion.tag_list[i]].name + ',';
	}
	$('#qtags').val(alltags);

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
		myquestion.title = mytitle;
		myquestion.content = mydesc;
		// tags should be sent to backend to see which ones we already have and which ones are new and then added to questions object
		// myquestion.tag_list = mytags

		window.location.href = "../answer/answer.html";
	}
  });

});