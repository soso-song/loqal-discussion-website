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

		if (email.length < 1) {
			$('#rmail').prev().prev().text('This field is required');
			hasError = true;
		}

		if (password.length < 3) {
		$('#pword').prev().prev().text('Password must be at least 3 characters long');
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

			if (res.status === 200) {
				//console.log(res.statusText)
			} else {
		 		$('#registerbackerror').text('There was a problem creating this user');
			}
		}).catch((error) => {
			//console.log(error)
		})
	}

	$('#loginForm').submit(function(e) {
		e.preventDefault();

		let hasError = false;

		$('#loginuser').prev().prev().text('');

		const email = $('#loginuser').val();
		const password = $('#loginpass').val();
		
		if (email.length < 1) {
			$('#loginuser').prev().prev().text('This field is required');
			hasError = true;
		}

		if (password.length < 1) {
			$('#loginuser').prev().prev().text('This field is required');
			hasError = true;
		}

		if(!hasError){
		
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
				if (res.status === 200) {
					//
				} else {
					$('#loginuser').prev().prev().text('Could not log in');
				}
			}).catch((error) => {
				console.log(error)
			})
		
		}

	});

});