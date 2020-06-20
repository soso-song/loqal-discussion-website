$(document).ready(function() {
	
  $('#registerForm').submit(function(e) {
    e.preventDefault();
	
	let hasError = false;
	
	$('#dname').prev().prev().text('');
	$('#rmail').prev().prev().text('');
	$('#pword').prev().prev().text('');
	$('#cpword').prev().prev().text('');
	
    const displayName = $('#dname').val();
    const email = $('#rmail').val();
	const username = $('#uname').val();
    const password = $('#pword').val();
	const passwordConfirm = $('#cpword').val();

    if (displayName.length < 1) {
      $('#dname').prev().prev().text('This field is required');
		hasError = true;
    }

    if (email.length < 1) {
		$('#rmail').prev().prev().text('This field is required');
		hasError = true;
    }

    if (password.length < 8) {
	  $('#pword').prev().prev().text('Password must be at least 8 characters long');
		hasError = true;
    }

	if (password !== passwordConfirm) {
	  $('#cpword').prev().prev().text('Password do not match');
		hasError = true;
    }

	if(!hasError){
		window.location.href = "../index.html";
	}
  });

$('#loginForm').submit(function(e) {
    e.preventDefault();

	let hasError = false;

	$('#loginuser').prev().prev().text('');

    const username = $('#loginuser').val();
    const password = $('#loginpass').val();

    if ((username !== "admin") || (password !== "admin")) {
      $('#loginuser').prev().prev().text('Invalid Username or password');
		hasError = true;
    }

	if(!hasError){
		window.location.href = "../index.html";
	}
  });

});