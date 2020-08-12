"use strict"

$(document).ready(function() {

	$('#searchForm').submit(function(e) {
    e.preventDefault();

    const searchinput = $('#searchinput').val();

	  window.location.href = `/search?search_key=${searchinput}`;
  });

});

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