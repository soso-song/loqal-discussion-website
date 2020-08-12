"use strict"
const userEditForm = document.querySelector('#editForm');
userEditForm.addEventListener('submit',edit);

function edit(e){
    e.preventDefault();
    
    let hasError = false;

    $('#changeerror').text('');

    const password = $('#pword').val();
    const passwordConfirm = $('#cpword').val();

    if (password !== passwordConfirm) {
        $('#changeerror').text('Passwords do not match');
        hasError = true;
    }

    if (password.length < 6) {
		$('#changeerror').text('Password must be at least 6 characters long');
		hasError = true;
	}

    if(!hasError){
        const url = '/users/password'

        const data = {
            password: password,
        }
    
        const request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
    
        fetch(request)
		.then(function(res) {
			if (res.redirected) {
				window.location.href = res.url;
			}

			if (res.status === 200) {
				//console.log(res.statusText)
			} else {
                $('#changeerror').text('Could not change the password');
			}
		}).catch((error) => {
			//console.log(error)
		})
	}
}