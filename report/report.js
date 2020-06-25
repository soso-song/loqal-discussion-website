const params = new URLSearchParams(window.location.search)
let target_type = params.get('type');
let target_id = params.get('target_id');
let user_id = params.get('user_id');
let back_url = params.get('back_url');
// <a href='../report/report.html?type=q&target_id="+myquestionid+"&user_id="+currentuser+"'>Report this question</a>
// above variables should be passed and get when user cleck report button

// suppose we already got correct above variables
document.getElementById("targetType").value = target_type;
document.getElementById("targetId").value = target_id;
document.getElementById("user").value = user_id;

let head_line = document.getElementById("reportHeadline");
let type;
if (target_type == 'u') {
	type = "user";
	head_line.innerHTML = "Report an User";
}else if(target_type == 'q'){
	type = "question";
	head_line.innerHTML = "Report a Question";
}else if(target_type == 'a'){
	type = "answer";
	head_line.innerHTML = "Report an Answer";
}

function submitReport(){
	let reason = document.getElementById("reasonTextArea").value;
	//below is add report function to report list on database
	//add_report(new Report(target_type,target_id,user_id,reason));
	if (reason.length < 15){
		// alert("submitted");
		document.getElementById("reasonAreaError").innerHTML = 'tell us more about this ' + type + " (length:" + reason.length + "<15)";
	}else{
		reports.push(new Report(target_type,target_id,user_id,reason));
		goBackUrl();
	}
	if(!back_url){
		alert("error, report btn didn't pass url param to this page to redirect back");
	}else{
		alert("report submitted, redirect back");
		location.href = back_url;
	}
}

function goBackUrl(){
	if(!back_url){
		alert("error, report btn didn't pass url param to this page to redirect back");
	}else{
		location.href = back_url;
	}
}