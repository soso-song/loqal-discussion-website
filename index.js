"use strict"

$(document).ready(function() {

	$('#searchForm').submit(function(e) {
    e.preventDefault();

    const searchinput = $('#searchinput').val();

	  window.location.href = `../searchQuestion/search_question.html?search_key=${searchinput}`;
  });

});