$(document).ready(function() {
	
	$('#qtitle').on('input', function() {
		const titleString = $('#qtitle').val();
		if(titleString.length<1){
			$('#ptitle').text("Title");
			$('#ptitle').addClass("gray");
		}else{
			$('#ptitle').text(titleString);
			$('#ptitle').removeClass("gray");
		}
	});
	
	$('#qdesc').on('input', function() {
		const descString = $('#qdesc').val();
		if(descString.length<1){
			$('#pdesc').text("Description");
			$('#pdesc').addClass("gray");
		}else{
			$('#pdesc').text(descString);
			$('#pdesc').removeClass("gray");	
		}
	});
	
	$('#qtags').on('input', function() {
		$('#ptags').empty();
		const alltags = $('#qtags').val();
		const septags = alltags.split(',');
		for (let i = 0; i < septags.length; i++) {
			const formattedString = septags[i].trim().replace(/\s+/g, '-').toLowerCase();
			if(formattedString.length>0){
				const myTag = document.createElement('a')
				myTag.className = 'tag'
				myTag.href = 'http://google.com';
				myTag.appendChild(document.createTextNode(formattedString))
				$('#ptags').append(myTag);    
				
			}
		}
	});

$('#questionForm').submit(function(e) {
    e.preventDefault();

	let hasError = false;

	$('#loginuser').prev().prev().text('');

    const mytitle = $('#qtitle').val();
    const mydesc = $('#qdesc').val();

    if ((username !== "admin") || (password !== "behrad")) {
      $('#loginuser').prev().prev().text('Invalid Username or password');
		hasError = true;
    }

	if(!hasError){
		window.location.href = "../index.html";
	}
  });

});