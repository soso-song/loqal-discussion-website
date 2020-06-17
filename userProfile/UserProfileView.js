
function getAllQeustions(user){
    for(var i=0; i<userTags.length; i++)
    {
        var currQeustion = userQeustion[i];
        var Ttable = document.getElementById('questionTable');
        var row = table.insertRow(-1);
        newTag.innerHTML=`${user}`;
    }
}
fucntion uploadPhoto(e){
    var newP = document.getElementById('importForm');
    var newPsrc = newP.datafile.value;

}   
function getAllTags(user){
    var userTags = user.tags;
    for(var i=0; i<userTags.length; i++)
    {
        var currTag = userTags[i];
        var fit=0;
        if(currTag.getAttr()="geo")
        {
            fit=1;
        }
        var Ttable = document.getElementById('tagsTable');
        var row = table.insertRow(-1);
        var newTag = row.inserCell(fit);
        newTag.innerHTML=`${currTag}`;
    }


}