const user = users[2];

const userEditForm = document.querySelector('#editForm');
userEditForm.addEventListener('submit',edit);


function edit(e){
    e.preventDefault();
    const newUserName= document.querySelector('#userName').value;
	const newPassword = document.querySelector('#newPassword').value;
    const newConfirmPassword = document.querySelector('#confirmPassword').value;
    const newPhoto = document.querySelector('#photoSrc').value;
    if (newUserName !== null){
        user.Name=newUserName;
    }
    if (newPassword == newConfirmPassword){
        user.password=newPassword;
    } else{
        window.alert("You passward and confirm password is not same")
    }
    if (newPhoto!==null)
    {
        user.photosrc=newPhoto;
    }

    console.log(user.Name)
}