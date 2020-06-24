"use strict"
const user = users[2];

const userEditForm = document.querySelector('#editForm');
userEditForm.addEventListener('submit',edit);
userEditForm.addEventListener('change', update_photo);


load_profile(user);
function load_profile(user){
    document.querySelector('#userName').value = user.username;
    document.querySelector('#displayName').value = user.display_name;
    document.querySelector('#email').value = user.email;
    document.querySelector('#password').value = user.password;

    // display multiple tags
    const tag_cell = document.getElementById("tags");
    tag_cell.innerHTML = '';
    const user_tags = [];
    for (const tag_index of user.tag_list){
        user_tags.push(tags[tag_index]);
    }
    // making adding tag options
    let html_tag = '';
    for(const curr_tag of user_tags){
        html_tag += '<select class="html_tag">';
        for(const tag_elem of tags){
            if(curr_tag.id == tag_elem.id){
                html_tag += "<option value="+tag_elem.id+" selected>"+tag_elem.name +"</option>";   
            }else{
                html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>";    
            }
        }
        html_tag += "<option value=-1>remove</option>";
        html_tag += '</select>';
    }
    tag_cell.innerHTML = html_tag;
    tag_cell.innerHTML += "<input id='tagbtn' type='submit' value='Add Tag' onclick='add_tag()'>";;

    // display picture
    const photo = document.querySelector('#prof_pic');
    photo.setAttribute('src', user.photo_src);

    // show if flagged user
    if (user.is_flagged){
        document.querySelector('#status').value = 'Flagged';
    }

    // show if user if admin
    if (user.is_admin){
        document.querySelector('#acct_type').value = 'Admin';
    }
}

function add_tag(){
    const tag=document.getElementById("tags");
    let html_tag = '<select class="html_tag">';
    for(const tag_elem of tags){
        html_tag += "<option value="+tag_elem.id+">"+tag_elem.name +"</option>"; 
    }
    html_tag += "<option value=-1>remove</option>";
    html_tag += '</select>';
    // save the index of each assigned option
    let options = tag.children;
    let selected_index = []
    for (let i = 1; i < options.length; i++) {
        selected_index.push(options[i].selectedIndex);
    }
    // add new variable
    tag.innerHTML = html_tag + tag.innerHTML;
    // re-select selected options
    for (let i = 1; i < options.length-1; i++) {
        options[i].selectedIndex = selected_index[i-1];
    }
}


function edit(e){
    e.preventDefault();
    
    user.username = document.querySelector('#userName').value;
    user.display_name = document.querySelector('#displayName').value;
	user.password = document.querySelector('#password').value;
    user.email = document.querySelector('#email').value;

    // save tags
    const tags = document.querySelectorAll(".html_tag");
    const tag_ids = [];
    for (const tag of tags){
        if (tag.value != -1){
            tag_ids.push(tag.value);
        }else{
            tag.parentElement.removeChild(tag);
        }
    }
    user.tag_list = tag_ids;

    window.alert("Your profile has been changed");
}

function update_photo(e){
    const photo_in = e.target;
    if(photo_in.files && photo_in.files[0]){
        var reader = new FileReader();
        let ee;
        reader.onload = function (ee) {
            $('#prof_pic').attr('src', ee.target.result)
                };

        reader.readAsDataURL(photo_in.files[0]);

    }
        
}