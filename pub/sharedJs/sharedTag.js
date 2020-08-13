"use strict";

async function getTagById(id){
	const url = '/tags/' + id;

	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});
	let tag;
	await fetch(request)
	.then((res) => {
		if (res.status === 200) {
           // return a promise that resolves with the JSON body
           return res.json();
       	} else {
            alert('Could not get tag');
       	} 
	})
	.then((json) => {
		tag = json.tag;
	})
	.catch((error) => {
		console.log(error)
	})
	return tag;
}

async function updateTag(id,name){
	const url = '/tags/' + id;

	const data = {
        name:name
	}

	const request = new Request(url, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	});

	let newURL;

	await fetch(request)
	.then(function(res) {
		if(isResolved === null){
			newURL = res.url;
		}
	}).catch((error) => {
		console.log(error);
	})
	return newURL;
}


// Loads all the tags this user is following to
async function getTagList(tags){
	let tag_names;
    const url = '/tag/names';
    const data = {
        ids: tags
    }
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    await fetch(request)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
    	tag_names = json;
    })
    .catch((error) => {
        console.log(error);
    })
    return tag_names;
}

async function getTagListObjects(tags){
	let tag_names;
    const url = '/tag/info';
    const data = {
        ids: tags
    }
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    await fetch(request)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
    	tag_names = json;
    })
    .catch((error) => {
        console.log(error);
    })
    return tag_names;
}


async function createTags(tag_names){
	const url = '/tag';
	const url_c = '/tag/increment/';

	let data;
	let request;

	const mytags = [];

	// change all spaces in one tag name into '-'
	tag_names = tag_names.map(tag => tag.trim().replace(/ /g, '-'));

	for(let tag_name of tag_names){
		data = { name: tag_name };

		request = new Request(url, {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})

		await fetch(request).then((res) => {
			return res.json();
		}).then((json) => {
			mytags.push(json.tag._id);
			// count this use of tag
			request = new Request(url_c+json.tag._id, {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
			})
			fetch(request).then((res) => {
				return;
			})
			.catch((error) => {
				console.log(error);
			})
		})
		.catch((error) => {
			console.log(error);
		})
	}

	return mytags;
}

