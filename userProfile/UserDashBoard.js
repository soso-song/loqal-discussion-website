currUser = users[0];

const tagsOption = document.querySelector("#tags");
console.log(tagsOption);
loadTags();
function loadTags(e)
{
    for (var i=0; i<tags.length; i++)
    {
        var newTagName =  tags[i].name;
        var newT = document.createElement('option');
        newT.value=newTagName;
        newT.text=newTagName;
        tagsOption.appendChild(newT);
    }
}
function loadQ(e)
{
    var Q;
    window.alert("hi");
    for(Q of questions)
    {
        if (Q.user_id = currUser.user_id)
        {
            console.log(Q);
        }
    }
}
