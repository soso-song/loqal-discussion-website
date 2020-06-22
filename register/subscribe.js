$(document).ready(function() {
	
	for (let i = 0; i < tags.length; i++) {
		const newDiv = '<a href="#" class="interactivetag">' + tags[i].name + '<span class="tagside">Follow</span></a>'
		$('#alltags').prepend(newDiv);
	}

	$(".interactivetag").click(function(){
		const myVal = $(this).find( "span" ).text();
		if(myVal === "Follow"){
			$(this).find( "span" ).text("Unfollow");
		}else{
			$(this).find( "span" ).text("Follow");
		}
	});



});