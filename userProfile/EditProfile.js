let user;
const userEditForm = document.querySelector('#editForm');
userEditForm.addEventListener('submit',edit);
function load(e){
    document.querySelector('#userName').innerHTML=user.Name;
    document.querySelector('newPassword').innerHTML=user.password;
}


function edit(e){
    const newUserName= document.querySelector('userName').value;
	const newPassword = document.querySelector('#newBookAuthor').value;
    const newConfirmPassword = document.querySelector('#confirmPassword').value;
    const newPhoto = document.querySelector('#photoscr').value;
    console.log(newUserName);
}