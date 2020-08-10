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
	currentuser = json;
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
			if(myquestion.answers.length > 0){
				showAnswers();
			}
		})
		.then((res) => {
			setOnclicks();
		})
	}
}


function showQuestion(){
	$('#ptitle').text(myquestion.title);
	$('#pdesc').text(myquestion.content);

	let newDiv = '';
	// TODO: add the tag list
	for (let i = 0; i < myquestion.tags.length; i++) {
		// get tag names
		fetch('/tag/' + myquestion.tags[i])
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			newDiv = '<span class="tag">' + json.tag.name + '</span>';
			$('#ptags').prepend(newDiv);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	getUserInfo(myquestion.user).then((quesUser) => {
		$('#pdate').html('Asked by <a href="../user/user_profile.html?user_id='+myquestion.user+ '">'
			+
			quesUser.displayname
			+
			" (@"
			+
			quesUser.username
			+
			")</a> - "
			+
			readableDate(myquestion.time)
		);
	})
	

	let extrabutt = "<a href='../report/report.html?type=q&target_id="+myquestionid+"&user_id="+currentuser._id+"&back_url="+window.location.href+"'>Report this question</a>";

	let is_solved = "Mark Solved";
	if(myquestion.isResolved){
		is_solved = "Mark Unsolved";
	}

	if(myquestion.isResolved){
		$('#pinfo').html("Solved");
		$('#pinfo').attr('class','green');
	}else{
		$('#pinfo').html("Unsolved");
	}

	if(currentuser._id == myquestion.user){
		extrabutt += ` <a href="../question/edit_question.html?question_id=${myquestionid}">Edit question</a> <a href="javascript:void(0);" id="solvedbutt">${is_solved}</a>`
	}


	$('#pbutts').html(extrabutt);
}

let i = 0;
async function showAnswers(){
	let answer = myquestion.answers[i];

	await getUserInfo(answer.user).then((ansUser) => {

		let report_answer_btn_url = "../report/report.html?type=a&target_id="+answer._id+"&user_id="+currentuser._id+"&back_url="+window.location.href;
		
		let bestText = ''
		if(answer.isBest){
			bestText = "id='isbest'"
		}

		let oneanswer = '<div '+bestText+' class="answer"><div id="'+answer._id+'" class="answertext">'
		+
		answer.content
		+
		'</div><div class="answerinfo">Answered by <a href="../user/user_profile.html?user_id='+answer.user+'">' + ansUser.displayname + ' (@' + ansUser.username + ')</a> - ' +readableDate(answer.time)+' </div>'
		;

		if(currentuser._id == answer.user){
			oneanswer += "<div class='answerbuttons'> <a href="+report_answer_btn_url+">Report this answer</a> <a href='../answer/edit_answer.html?question_id="
					  + myquestionid + "&answer_id="+answer._id+"'>Edit Answer</a>";
		} else{
			oneanswer += "<div class='answerbuttons'> <a href="+report_answer_btn_url+">Report this answer</a>";
		}

		if(currentuser._id == myquestion.user){
			oneanswer += ' <a href="javascript:void(0);" onclick="'+ `pickAsBest('${myquestionid}', '${answer._id}')` +'" class="pickbest">Pick as Best Answer</a></div></div>';
		} else{
			oneanswer += '</div></div>'
		}

		$('#answers').prepend(oneanswer);
		i++;
	})
	.catch((error) => {
		console.log(error);
	})

	if(i < myquestion.answers.length){
		showAnswers();
	}else{
		goAnchor();
	}
}

function pickAsBest(questionid, answerid){	
	const url = `/bestanswer/${questionid}/${answerid}`;

	const request = new Request(url, {
		method: 'post', 
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
	});

	fetch(request)
	.then(function(res) {
		//console.log(res)
		if (res.status === 200) {
			console.log("picked");
		} else {
			console.log("not picked");
		}
	}).catch((error) => {
		//console.log(error)
	})
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
			//Answer add to database-----------
			let newDiv = '';
			saveAnswer(myanswer,myquestionid).then((res) => {
				console.log(myquestionid);
				newDiv = "<div class='answerbuttons'> <a href=''>Report this answer</a> <a href='../answer/edit_answer.html?question_id="
				+ myquestionid + "&answer_id=" + res + "'>Edit Answer</a>";
				return res;
			})
			.then((res) => {
				newDiv = "<div class='answer'><div class='answertext'>"
				+
				myanswer
				+
				"</div><div class='answerinfo'>Answered by <a href='../user/user_profile.html?user_id="+currentuser._id+"''>" + currentuser.displayname + " (@" + currentuser.username + ")</a>. Just now. </div>"
				+
				newDiv;

				if(currentuser._id == myquestion.user){
					newDiv += ' <a href="javascript:void(0);" onclick="'+ `pickAsBest('${myquestionid}', '${res}')` +'" class="pickbest">Pick as Best Answer</a></div></div>';
				} else{
					newDiv += '</div></div>'
				}
				
				$('#answers').prepend(newDiv);
				$('#myans').val("");
			})
			//---------------------------------
			
		}
	});
}






async function saveAnswer(myanswer,myquestionid){
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

	let answer_id;
	await fetch(request)
	.then(function(res) {
		return res.json();
		return res.json();
	})
	.then((json) => {
		answer_id = json._id;
	})
	.catch((error) => {
		console.log(error)
	})
	return answer_id;
}

function getAnchor() {
    let currentUrl = document.URL,
	urlParts   = currentUrl.split('#');
    return (urlParts.length > 1) ? urlParts[1] : null;
}

function goAnchor() {
	let element_to_scroll_to = document.getElementById(getAnchor());
	if(element_to_scroll_to){
		element_to_scroll_to.scrollIntoView({ behavior: 'smooth'});
	}
}