const newuser = users[2];

const userEditForm = document.querySelector('#editForm');
userEditForm.addEventListener('submit',edit);


function edit(e){
    e.preventDefault();
    let changed =0;
    const newUserName= document.querySelector('#userName').value;
	const newPassword = document.querySelector('#newPassword').value;
    const newConfirmPassword = document.querySelector('#confirmPassword').value;
    const newPhoto = document.querySelector('#photoSrc').value;
    if (newUserName !== null){
        user.Name=newUserName;
        changed = 1;
    }
    if ((newPassword == newConfirmPassword) && (newPassword !== null)){
        user.password=newPassword;
        changed = 1;
    } else{
        window.alert("You passward and confirm password is not same")
    }
    if (newPhoto!==null)
    {
        user.photosrc=newPhoto;
        changed = 1;
    }
    if (changed = 1)
    {
        window.alert("Your profile has been changed");
    }
}