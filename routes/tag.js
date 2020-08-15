const express = require('express')
const router = express.Router()

const log = console.log

const {
   User,
   Tag,
   ObjectID,
   isMongoError,
   mongoChecker,
   authenticateAPI,
   adminAuthenticateAPI
} = require('./setups');

//tag route below**********/

// Route which give all the exisiting tags
router.get('/', mongoChecker, authenticateAPI, (req, res) => {
	Tag.find().then((tags) => {
		res.send(tags)
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route which given a list of tag ids, return a list of tag names
router.post('/names', mongoChecker, authenticateAPI, (req, res) => {
	const ids = req.body.ids;
	let names;

	Tag.find({'_id': { $in: ids} }).then((tags) => {
		if(tags.length != ids.length) {
			res.status(404).send("Can't find all tags");
		} else {
			names = tags.map(tag => tag.name);
			res.send(names);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route which given a list of tag ids, return a list of tags
router.post('/info', mongoChecker, authenticateAPI, (req, res) => {
	const ids = req.body.ids;

	Tag.find({'_id': { $in: ids} }).then((tags) => {
		if(tags.length != ids.length) {
			res.status(404).send("Can't find all tags");
		} else {
			res.send(tags);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for creating a new tag but will check if tag already exist
router.post("/", mongoChecker, authenticateAPI, (req, res) => {
	const tagName = (req.body.name).toLowerCase();

	// check if tag already exist
	Tag.find({ name: tagName })
	.then((tags) => {
		if(tags.length > 0){
			res.send({
				tag: tags[0],
				duplicate: true
			});
		}
		else {
			const tag = new Tag({
				name: tagName
			});
			// Save tags
			tag.save().then((tag) => {
		        res.send({
		        	tag: tag,
		        	duplicate: false
		        })
			})
			.catch((error) => {
				if (isMongoError(error)) { 
					res.status(500).send('Internal server error');
				} else {
					res.status(400).send('Bad Request');
				}
			})
		}
	})
	.catch((error) => {
		//console.log(error);
		res.status(500).send('Internal Server Error');
	})
})

// Route for modifying tag name by given id
router.patch('/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
	}

	const tagName = (req.body.name).toLowerCase();

	// Find the fields to update and their values.
	const fieldsToUpdate = {
		name: tagName
	}
	// check for duplicate tag names
	Tag.find({name: tagName})
	.then(tags => {
		if(tags.length > 0 && tags[0]._id != id){
			res.status(400).send('Bad Request');
		} else {
			Tag.findByIdAndUpdate(id, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false}).then((tag) => {
				if (!tag) {
					res.status(404).send('Tag not found');
				} else {   
					res.send(tag);
				}
			}).catch((error) => {
				if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
					res.status(500).send('Internal server error');
				} else {
					res.status(400).send('Bad Request');
				}
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

	
})

// Route for deleting tag by given id
router.delete('/:id', mongoChecker, adminAuthenticateAPI, (req,res) =>{
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	Tag.findByIdAndRemove(id).then((tag) => {
		if (!tag) {
			res.status(404).send('Tag not found')
		} else {   
			res.send(tag)
		}
	})
	.catch((error) => {
		res.status(500).send('Internal server error') // server error, could not delete.
	})
})

// Route that gives all the tags sorted in decreasing number of usage
router.get('/popular', mongoChecker, authenticateAPI, (req, res) => {
	Tag.find().then((tags) => {
		// sort the tags by count
		tags = tags.sort((a,b) =>  a.count - b.count);
		res.send(tags);
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for current user to follow a tag by given id
router.patch('/follow/:tag_id', mongoChecker, authenticateAPI, (req, res) => {
	const tag_id = req.params.tag_id;

	// Validate id
	if (!ObjectID.isValid(tag_id)) {
		res.status(404).send('Invalid Tag ID');
		return;  // so that we don't run the rest of the handler.
	}

	const user = req.user;

	if(!user.tags.includes(tag_id)){
		// add to tag count
		Tag.findById(tag_id).then((tag) => {
			if(!tag){
				res.status(404).send('Tag not found');
			}
			else {
				tag.count++;
				tag.save().then((tag) => {
					user.tags.push(tag_id);

					user.save()
					.then(() => {
						res.send(tag);
					})
					.catch((error) => {
						res.status(400).send('Bad request.');
					})
				})
				.catch((error) => {
					res.status(400).send('Bad request.');
				})
			}
		})
		.catch((error) => {
			res.status(500).send('Internal Server Error');
		})
	} else {
		res.status(409).send('Already following Tag');
	}

})


// Route for current user to unfollow a tag by given id
router.patch('/unfollow/:tag_id', mongoChecker, authenticateAPI, (req, res) => {
	const tag_id = req.params.tag_id;
	const user = req.user;

	// Validate id
	if (!ObjectID.isValid(tag_id)) {
		res.status(404).send('Invalid Tag ID');
		return;  // so that we don't run the rest of the handler.
	}

	if (user.tags.includes(tag_id)){
		Tag.findById(tag_id).then((tag) => {
			if(!tag){
				res.status(404).send('Tag not found');
			}
			else {
				tag.count = tag.count <= 0 ? 0 : tag.count-1;
				tag.save().then((tag) => {
					user.tags = user.tags.filter((tag) => tag._id != tag_id);
					user.save().then(() => {
						res.send(tag);
					})
					.catch((error) => {
						res.status(400).send('Bad request.');
					})
				})
				.catch((error) => {
					res.status(400).send('Bad request.');
				})
			}
		})
		.catch((error) => {
			res.status(500).send('Internal Server Error');
		})
	}
	else {
		res.status(400).send('Bad request.');
	}

})

// Route for incrementing the number of tag used by given id
router.patch('/increment/:tag_id/', mongoChecker, authenticateAPI, (req, res) => {
	const tag_id = req.params.tag_id;

	// Validate id
	if (!ObjectID.isValid(tag_id)) {
		res.status(404).send('Invalid Tag ID');
		return;
	}

	Tag.findById(tag_id).then((tag) => {
		if(!tag){
			res.status(404).send('Tag not found');
		}
		else {
			tag.count++;
			tag.save().then(tag => {
				res.send(tag);
			})
			.catch((error) => {
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for getting the tag by given id
router.get('/:id', mongoChecker, authenticateAPI, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Tag ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Tag.findById(id).then((tag) => {
		if (!tag) {
			res.status(404).send('Tag not found');
		} else {
			res.json({ tag });
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

module.exports = router;