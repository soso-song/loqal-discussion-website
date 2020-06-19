includeSidebar();

function includeSidebar() {
	const sidebar_div = document.querySelector(".sidebar");

	sidebar_div.innerHTML = "<h2>Dashboard</h2>";
	create_and_add("a", "Post Notice", sidebar_div, "href", "#");
	create_and_add("a", "Reported Users", sidebar_div, "href", "#");
	create_and_add("a", "Reported Questions", sidebar_div, "href", "#");
	create_and_add("a", "Reported Answers", sidebar_div, "href", "#");
	create_and_add("a", "Suggested Tags", sidebar_div, "href", "#");
	const hr = document.createElement("hr");
	sidebar_div.appendChild(hr);
	create_and_add("a", "All Users", sidebar_div, "href", "edit_user.html");
	create_and_add("a", "All Questions", sidebar_div, "href", "search_question.html");
	create_and_add("a", "All Answers", sidebar_div, "href", "search_answer.html");
	create_and_add("a", "All Tags", sidebar_div, "href", "edit_tags.html");

}

function create_and_add(type, text, parent, attr="", attrIn=""){
	const element = document.createElement(type);
	element.innerHTML = text;
	if(attr != ""){
		element.setAttribute(attr, attrIn);
	}
	parent.appendChild(element);
}