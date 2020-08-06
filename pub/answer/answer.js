"use strict"

//Getting the main question from database
let myquestionid = 4;
let currentuser = curr_user.id;
let myquestion = questions[4];

fetch('/currentuser')
.then((res) => {
	if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
    } else {
        alert('Could not get user');
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
			showQuestion();
		})
		.then((res) => {
			setOnclicks();
		})
	}
}


function showQuestion(){
	$('#ptitle').text(myquestion.title);
	$('#pdesc').text(myquestion.content);

	// TODO: add the tag list
	// for (let i = 0; i < myquestion.tag_list.length; i++) {
	// 	const newDiv = '<span class="tag">' + tags[myquestion.tag_list[i]].name + '</span>';
	// 	$('#ptags').prepend(newDiv);
	// }

	getUserInfo(myquestion.user).then((quesUser) => {
		$('#pdate').html('Asked by <a href="../user/user_profile.html?user_id='+myquestion.user+ '">'
			+
			quesUser.displayname
			+
			" (@"
			+
			quesUser.username
			+
			")</a> "
			+
			myquestion.time
			+
			"."
		);
	})
	

	let extrabutt = "<a href='../report/report.html?type=q&target_id="+myquestionid+"&user_id="+currentuser+"&back_url="+window.location.href+"'>Report this question</a>";

	let is_solved = "Mark Solved";
	if(myquestion.isResolved){
		is_solved = "Mark Unsolved";
	}

	if(myquestion.isResolved){
		$('#pinfo').html("Solved");
	}else{
		$('#pinfo').html("Unsolved");
	}

	if(currentuser == myquestion.user){
		extrabutt += ` <a href="../question/edit_question.html?question_id=${myquestionid}">Edit question</a> <a href="javascript:void(0);" id="solvedbutt">${is_solved}</a>`
	}


	$('#pbutts').html(extrabutt);

	
	// Displaying the list of answers for this question
	for (let i = 0; i < answers.length; i++) {
		if(answers[i].question_id == myquestionid){

			let report_answer_btn_url = "../report/report.html?type=a&target_id="+answers[i].id+"&user_id="+currentuser+"&back_url="+window.location.href;
			let oneanswer = '<div class="answer"><div class="answertext">'
			+
			answers[i].content
			+
			'</div><div class="answerinfo">Answered by <a href="../user/user_profile.html?user_id='+answers[i].user_id+'">' + users[answers[i].user_id].display_name + ' (@' + users[answers[i].user_id].username + ')</a>. ' +answers[i].time+'. </div>'
			;

			if(currentuser == answers[i].user_id){
				oneanswer += "<div class='answerbuttons'> <a href="+report_answer_btn_url+">Report this answer</a> <a href='../answer/edit_answer.html?answer_id="+answers[i].id+"'>Edit Answer</a>";
			} else{
				oneanswer += "<div class='answerbuttons'> <a href="+report_answer_btn_url+">Report this answer</a>";
			}

			if(currentuser == myquestion.user_id){
				oneanswer += ' <a href="javascript:void(0);" class="pickbest">Pick as Best Answer</a></div></div>';
			} else{
				oneanswer += '</div></div>'
			}

			$('#answers').prepend(oneanswer);
		}
	}

	// set all the onclick setting after constructing the page
	
}


function setOnclicks(){
	// Handling selecting best answer
	$('body').on('click', '.pickbest', function () {
		$('#isbest').removeAttr('id');
		$(this).parent().parent().attr('id', 'isbest');
		//Send data to server to mark answer as best and remove previous best answer if it exists
	});


	// Marking question as solved or unsolved
	$("#solvedbutt").click(function(){
		
		const solvstatus = $('#pinfo').text();
		let isResolved;
		if(solvstatus === 'Solved'){
			$('#solvedbutt').text('Mark Solved');
			$('#pinfo').attr('class','red');
			$('#pinfo').text('Unsolved');
			isResolved = false;
		}else{
			$('#solvedbutt').text('Mark Unsolved');
			$('#pinfo').attr('class','green');
			$('#pinfo').text('Solved');
			isResolved = true;
		}
		//Send data to server to mark question as solved or unsolved
		updateQuestion(myquestionid, myquestion.title, myquestion.content, myquestion.tags, isResolved);
	});

	// A New answer is submitted
	$('#answerForm').submit(function(e) {
	    e.preventDefault();

		let hasError = false;
		$('#myans').prev().prev().text('');

	    const myanswer = $('#myans').val();

	    if (myanswer.length<1) {
			hasError = true;
			$('#myans').prev().prev().text('Your answer cannot be empty');
	    }

		if(!hasError){
			// Send the new answer to backend
			answers.push(new Answer(myanswer, currentuser, myquestionid));
			//Answer add to database-----------
			saveAnswer(myanswer,myquestionid);
			//---------------------------------
			let newDiv = '<div class="answer"><div class="answertext">'
			+
			myanswer
			+
			'</div><div class="answerinfo">Answered by <a href="../user/user_profile.html?user_id='+currentuser+'">' + users[currentuser].display_name + ' (@' + users[currentuser].username + ')</a>. ' +'Just now'+'. </div>'
			+
			'<div class="answerbuttons"> <a href="">Report this answer</a> <a href="../answer/edit_answer.html">Edit Answer</a>'
			;

			if(currentuser == myquestion.user_id){
				newDiv += ' <a href="javascript:void(0);" class="pickbest">Pick as Best Answer</a></div></div>';
			} else{
				newDiv += '</div></div>'
			}
			
			$('#answers').prepend(newDiv);
			$('#myans').val("");
		}
	});
}






function saveAnswer(myanswer,myquestionid){
	const url = '/questions/'+myquestionid;

	let data = {
		content: myanswer
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
		//window.location.href = res.url;
	}).catch((error) => {
		console.log(error)
	})
}
