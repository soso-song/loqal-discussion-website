"use strict"
includeSidebar();

function includeSidebar() {
	const sidebar_div = document.querySelector(".sidebar");

	sidebar_div.innerHTML = "<a href='/'><img id='logo' src='../images/logo.png'></a>"
	sidebar_div.innerHTML += "<h1><a href='/admin/dashboard'>Admin Dashboard</a><a href='/dashboard'>Regular Dashboard</a></h1>";

	
	const u_bookmark = document.querySelector("#rep_users");
	create_and_add("a", "Reported Users", sidebar_div, "href", "#rep_users", u_bookmark);
	const q_bookmark = document.querySelector("#rep_questions");
	create_and_add("a", "Reported Questions", sidebar_div, "href", "#rep_questions", q_bookmark);
	const a_bookmark = document.querySelector("#rep_answers");
	create_and_add("a", "Reported Answers", sidebar_div, "href", "#rep_answers", a_bookmark);
	// create_and_add("a", "Suggested Tags", sidebar_div, "href", "#");
	const hr = document.createElement("hr");
	sidebar_div.appendChild(hr);
	create_and_add("a", "Post Notice", sidebar_div,  "href", "/admin/notice");
	create_and_add("a", "All Users", sidebar_div, "href", "/admin/edituser");
	create_and_add("a", "All Questions", sidebar_div, "href", "/admin/editquestion");
	create_and_add("a", "All Answers", sidebar_div, "href", "/admin/editanswer");
	create_and_add("a", "All Tags", sidebar_div, "href", "/admin/edittag");

}

function create_and_add(type, text, parent, attr, attrIn, if_link=true){
	const element = document.createElement(type);
	element.innerHTML = text;
	if(if_link){
		element.setAttribute(attr, attrIn);
	}else{
		element.setAttribute(attr, "/admin/dashboard" + attrIn);
	}
	parent.appendChild(element);
}

function readableDate(passedDate){
  // Based on solution from 
  // https://stackoverflow.com/questions/8362952/javascript-output-current-datetime-in-yyyy-mm-dd-hhmsec-format
  const formatDate = new Date(passedDate);
  const dateString =
  formatDate.getUTCFullYear() + "/" +
      ("0" + (formatDate.getUTCMonth()+1)).slice(-2) + "/" +
      ("0" + formatDate.getUTCDate()).slice(-2) + " " +
      ("0" + formatDate.getUTCHours()).slice(-2) + ":" +
      ("0" + formatDate.getUTCMinutes()).slice(-2) + ":" +
      ("0" + formatDate.getUTCSeconds()).slice(-2);
  return dateString;
}