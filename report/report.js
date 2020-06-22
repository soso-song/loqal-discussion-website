var target_type = 'u';
var target_id = 2;
var user_id = 1;
// above variables should be passed and get when user cleck report button

// suppose we already got correct above variables
document.getElementById("targetType").value = target_type;
document.getElementById("targetId").value = target_id;
document.getElementById("user").value = user_id;

var head_line = document.getElementById("reportHeadline");
if (target_type == 'u') {
	head_line.innerHTML = "Report a User";
}else if(target_type == 'q'){
	head_line.innerHTML = "Report a Question";
}else if(target_type == 'a'){
	head_line.innerHTML = "Report a Answer";
}

function submitReport(){
	var reason = document.getElementById("reasonTextArea").value;
	//below is add report function to report list on database
	//add_report(new Report(target_type,target_id,user_id,reason));
	reports.push(new Report(target_type,target_id,user_id,reason));
	
	alert("submitted");
	//location.href = "../user/userdashboard.html";
}

