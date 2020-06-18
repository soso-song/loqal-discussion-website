const user = users[2];

const userEditForm = document.querySelector('#editForm');
console.log(user.username);
userEditForm.addEventListener('submit',edit);

document.querySelector('#userName').defaultValue=user.username;
document.querySelector('#newPassword').defaultValue=user.password;

function edit(e){
    e.preventDefault();
    const newUserName= document.querySelector('#userName').value;
	const newPassword = document.querySelector('#newPassword').value;
    const newConfirmPassword = document.querySelector('#confirmPassword').value;
    const newPhoto = document.querySelector('#photoscr').value;
    user.Name=newUserName;
    user.password=newPassword;
    user.photosrc=newPhoto;
    console.log(newUserName);
}