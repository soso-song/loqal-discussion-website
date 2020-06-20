$(document).ready(function() {

	/*$(".commentreplybutt").click(function(){
		$(this).text("this was clicked");
	});*/

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
		const newDiv = '<div class="answer"><div class="answertext">' + myanswer + '</div><div class="answerinfo">answered by Knower, June 17, 2020 at 14:30</div></div>'
		$('#answers').prepend(newDiv);
	}
  });

});