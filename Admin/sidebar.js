includeSidebar();

function includeSidebar() {
	const sidebar_div = document.querySelector(".sidebar");

	sidebar_div.innerHTML = "<h1><a href='admin_dashboard.html'>Dashboard</a></h1>";

	create_and_add("a", "Post Notice", sidebar_div,  "href", "#");
	const u_bookmark = document.querySelector("#rep_users");
	create_and_add("a", "Reported Users", sidebar_div, "href", "#rep_users", u_bookmark);
	const q_bookmark = document.querySelector("#rep_questions");
	create_and_add("a", "Reported Questions", sidebar_div, "href", "#rep_questions", q_bookmark);
	const a_bookmark = document.querySelector("#rep_answers");
	create_and_add("a", "Reported Answers", sidebar_div, "href", "#rep_answers", a_bookmark);
	// create_and_add("a", "Suggested Tags", sidebar_div, "href", "#");
	const hr = document.createElement("hr");
	sidebar_div.appendChild(hr);
	create_and_add("a", "All Users", sidebar_div, "href", "edit_user.html");
	create_and_add("a", "All Questions", sidebar_div, "href", "search_question.html");
	create_and_add("a", "All Answers", sidebar_div, "href", "search_answer.html");
	create_and_add("a", "All Tags", sidebar_div, "href", "edit_tags.html");

}

function create_and_add(type, text, parent, attr, attrIn, if_link=true){
	const element = document.createElement(type);
	element.innerHTML = text;
	if(if_link){
		element.setAttribute(attr, attrIn);
	}else{
		element.setAttribute(attr, "admin_dashboard.html" + attrIn);
	}
	parent.appendChild(element);
}