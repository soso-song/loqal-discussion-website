let pageUser = curr_user;

$(document).ready(function() {
	
	for (let i = 0; i < tags.length; i++) {
		let newDiv = `<a href="javascript:void(0);" class="interactivetag">${tags[i].name}<span class="tagside">Follow</span></a>`
		if(curr_user.tag_list.includes(tags[i].id)){
			newDiv = `<a href="javascript:void(0);" class="interactivetag">${tags[i].name}<span class="tagside">Unfollow</span></a>`
			$('#currenttags').prepend(newDiv);
		}else{
			$('#alltags').prepend(newDiv);
		}
	}


	$('body').on('click', '.interactivetag', function () {
		const myVal = $(this).find( "span" ).text();
		if(myVal === "Follow"){
			$(this).find( "span" ).text("Unfollow");
			// Remove this tag from user by sending a post request to backend
		}else{
			$(this).find( "span" ).text("Follow");
			// Add new tag to user by sending a post request to backend
		}
	});


	$('#tagForm').submit(function(e) {
		e.preventDefault();

		let hasError = false;

		$('#newtag').prev().text('');

		const newTagVal = $('#newtag').val();

		if (newTagVal.length < 1) {
			$('#newtag').prev().text('This field cannot be empty');
			hasError = true;
		}

		if(!hasError){
			// At this stage we will send data to backend to add tag to user and will get the tag id from back-end
			let newTag = `<a href="javascript:void(0);" class="interactivetag">${newTagVal}<span class="tagside">Unfollow</span></a>`
			$('#currenttags').prepend(newTag);
		}
  	});

});