"use strict";

async function checkAdminUser(){
	let currentuser = null;

	await fetch('/users/current')
	.then((res) => {
		if (res.status === 200) {
	        return res.json();
	    } else {
	        alert('Could not get user');
	    } 
	})
	.then((json) => {
		if (json.isAdmin){
			currentuser = json;
		}
		else {
			alert('You are not an Admin user!');
			fetch('/login').then((res) => {
				window.location.href = res.url;
			})
			.catch((error) => {
				console.log(error);
			})
		}
	})
	.catch((error) => {
		console.log(error)
	})
	return currentuser;
}