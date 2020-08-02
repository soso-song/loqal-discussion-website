"use strict"

$(document).ready(function() {
	
	$('#registerForm').submit(function(e) {
		e.preventDefault();
		
		let hasError = false;
		
		$('#dname').prev().prev().text('');
		$('#uname').prev().prev().text('');
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
		
		if (username.length < 1) {
			$('#uname').prev().prev().text('This field is required');
			hasError = true;
		}

		for (let i = 0; i < users.length; i++) {
			if((users[i].username == username)){
				$('#uname').prev().prev().text('Username already exists');
				hasError = true;
			}
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
			// At this stage we will send these data to backend
			// Create the new user and redirect the user to subscribe to tags
			window.location.href = "subscribe.html";
		}
	});

	$('#loginForm').submit(function(e) {
		e.preventDefault();

		let hasError = true;

		$('#loginuser').prev().prev().text('');

		const username = $('#loginuser').val();
		const password = $('#loginpass').val();
		
		for (let i = 0; i < users.length; i++) {
			if((users[i].username == username) && (users[i].password == password)){
				hasError = false;
			}
		}

		if(!hasError){
			// At this stage we will log the user in by communicating with backend
			window.location.href = "../user/user_dashboard.html";
		}else{
			$('#loginuser').prev().prev().text('Invalid Username or password');
		}

	});

});