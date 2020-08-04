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
			//window.location.href = "subscribe.html";
			registerBackend(username, email, displayName, password)
		}
	});

	function registerBackend(passedUsername, passedEmail, passedName, passedPass) {
		// the URL for the request
		const url = '/users';
	
		// The data we are going to send in our request
		let data = {
			email: passedEmail,
			password: passedPass,
			username: passedUsername,
			displayname: passedName
		}

		// Create our request constructor with all the parameters we need
		const request = new Request(url, {
			method: 'post', 
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		});
	
		// Send the request with fetch()
		fetch(request)
		.then(function(res) {
	
			if (res.redirected) {
				window.location.href = res.url;
			}
			// Handle response we get from the API.
			// Usually check the error codes to see what happened.
			const message = document.querySelector('#message')
			if (res.status === 200) {
				// If student was added successfully, tell the user.
				console.log('Added student')
				message.innerText = 'Success: Added a student.'
				message.setAttribute("style", "color: green")
			   
			} else {
				// If server couldn't add the student, tell the user.
				// Here we are adding a generic message, but you could be more specific in your app.
				message.innerText = 'Could not add student'
				message.setAttribute("style", "color: red")
		 
			}
			log(res)  // log the result in the console for development purposes,
							  //  users are not expected to see this.
		}).catch((error) => {
			log(error)
		})
	}

	$('#loginForm').submit(function(e) {
		e.preventDefault();

		let hasError = true;

		$('#loginuser').prev().prev().text('');

		const email = $('#loginuser').val();
		const password = $('#loginpass').val();
		
		/*
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
		*/

		const url = '/users/login';
	
		// The data we are going to send in our request
		let data = {
			email: email,
			password: password,
		}

		// Create our request constructor with all the parameters we need
		const request = new Request(url, {
			method: 'post', 
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		});
	
		// Send the request with fetch()
		fetch(request)
		.then(function(res) {
	
			if (res.redirected) {
				window.location.href = res.url;
			}
			// Handle response we get from the API.
			// Usually check the error codes to see what happened.
			const message = document.querySelector('#message')
			if (res.status === 200) {
				// If student was added successfully, tell the user.
				console.log('Added student')
				message.innerText = 'Success: Added a student.'
				message.setAttribute("style", "color: green")
			   
			} else {
				// If server couldn't add the student, tell the user.
				// Here we are adding a generic message, but you could be more specific in your app.
				message.innerText = 'Could not add student'
				message.setAttribute("style", "color: red")
		 
			}
			log(res)  // log the result in the console for development purposes,
							  //  users are not expected to see this.
		}).catch((error) => {
			log(error)
		})

	});

});