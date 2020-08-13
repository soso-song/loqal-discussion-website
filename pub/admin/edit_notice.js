"use strict"

function click_bool(){
	let btn = document.getElementById("qactive");
	if(btn.value == 'true'){
		btn.value = false;
	}else{
		btn.value = true;
	}
}

$(document).ready(function() {

	//Getting the question from database
	let myquestionid;
	//let myquestion;
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
		const urlquestionid = params.get('notice_id');

		if (urlquestionid != null){
			myquestionid = urlquestionid;
			getNoticeById(myquestionid, showQuestionInfo);
		}
	}

	function showQuestionInfo(myquestion){
		$('#qtitle').val(myquestion.title);
		$('#qdesc').val(myquestion.content);
		$('#qactive').val(myquestion.isShowing);
	}
	
	

	$('#questionForm').submit(function(e) {
		e.preventDefault();

		let hasError = false;

		const mytitle = $('#qtitle').val();
		const mydesc = $('#qdesc').val();
		const myactive = $('#qactive').val();

		if (mytitle.length < 1) {
			$('#qtitle').prev().prev().text('This field cannot be empty');
			hasError = true;
		}

		if (mydesc.length < 1) {
			$('#qdesc').prev().prev().text('This field cannot be empty');
			hasError = true;
		}

		if(!hasError){
			updateNotice(myquestionid ,mytitle, mydesc, myactive)
			window.location.href = '/admin/notice';
		}
	});
});