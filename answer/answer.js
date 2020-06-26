
	$('#ptitle').text(myquestion.title);
	$('#pdesc').text(myquestion.content);

	for (let i = 0; i < myquestion.tag_list.length; i++) {
		const newDiv = '<span class="tag">' + tags[myquestion.tag_list[i]].name + '</span>';
		$('#ptags').prepend(newDiv);
	}

	//<div id="pdate">Asked by <a href="">John Appleseed (@jseed)</a>. June 17, 2020 at 14:30.</div>
	$('#pdate').html('Asked by <a href="../user/userprofile.html?user_id='+myquestion.user_id+ '">'
	+
	users[myquestion.user_id].display_name
	+
	" (@"
	+
	users[myquestion.user_id].username
	+
	")</a> "
	+
	myquestion.time
	+
	"."
	);

	let extrabutt = "<a href='../report/report.html?type=q&target_id="+myquestionid+"&user_id="+currentuser+"&back_url="+window.location.href+"'>Report this question</a>";
	if(currentuser == myquestion.user_id){
		extrabutt += ' <a href="../question/editquestion.html">Edit question</a> <a href="javascript:void(0);" id="solvedbutt">Mark Solved</a>'
	}
	$('#pbutts').html(extrabutt);
	
	for (let i = 0; i < answers.length; i++) {
		if(answers[i].question_id == myquestionid){
			let report_answer_btn_url = "../report/report.html?type=a&target_id="+answers[i].id+"&user_id="+currentuser+"&back_url="+window.location.href;
			let oneanswer = '<div class="answer"><div class="answertext">'
			+
			answers[i].content
			+
			'</div><div class="answerinfo">Answered by <a href="../user/userprofile.html?user_id='+answers[i].user_id+'">' + users[answers[i].user_id].display_name + ' (@' + users[answers[i].user_id].username + ')</a>. ' +answers[i].time+'. </div>'
			;

			if(currentuser == answers[i].user_id){
				oneanswer += "<div class='answerbuttons'> <a href="+report_answer_btn_url+">Report this answer</a> <a href='../answer/editanswer.html'>Edit Answer</a>";
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

	$('body').on('click', '.pickbest', function () {
		$('#isbest').removeAttr('id');
		$(this).parent().parent().attr('id', 'isbest');
		//Send data to server to mark answer as best and remove previous best answer if it exists
	  });



	$("#solvedbutt").click(function(){
		const solvstatus = $('#pinfo').text();
		if(solvstatus === 'Solved'){
			$('#solvedbutt').text('Mark Solved');
			$('#pinfo').attr('class','red');
			$('#pinfo').text('Unsolved');
	
		}else{
			$('#solvedbutt').text('Mark Unsolved');
			$('#pinfo').attr('class','green');
			$('#pinfo').text('Solved');
		}
		//Send data to server to mark question as solved or unsolved
	});

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
		answers.push(new Answer(myanswer, currentuser, myquestionid));

		let newDiv = '<div class="answer"><div class="answertext">'
		+
		myanswer
		+
		'</div><div class="answerinfo">Answered by <a href="../user/userprofile.html?user_id='+currentuser+'">' + users[currentuser].display_name + ' (@' + users[currentuser].username + ')</a>. ' +'Just now'+'. </div>'
		+
		'<div class="answerbuttons"> <a href="">Report this answer</a> <a href="../answer/editanswer.html">Edit Answer</a>'
		;

	if(currentuser == myquestion.user_id){
		newDiv += ' <a href="javascript:void(0);" class="pickbest">Pick as Best Answer</a></div></div>';
	} else{
		newDiv += '</div></div>'
	}
		
		$('#answers').prepend(newDiv);

	}
  });