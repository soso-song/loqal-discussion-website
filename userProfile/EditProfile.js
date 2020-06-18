let user;
const userEditForm = document.querySelector('#editForm');
console.log(userEditForm);
userEditForm.addEventListener('submit',edit);
document.querySelector('#userName').innerHTML=user.Name;
document.querySelector('newPassword').innerHTML=user.password;


function edit(e){
    e.preventDefault();
    const newUserName= document.querySelector('userName').value;
	const newPassword = document.querySelector('#newBookAuthor').value;
    const newConfirmPassword = document.querySelector('#confirmPassword').value;
    const newPhoto = document.querySelector('#photoscr').value;
    user.Name=newUserName;
    user.password=newPassword;
    user.photosrc=newPhoto;
    console.log(newUserName);
}