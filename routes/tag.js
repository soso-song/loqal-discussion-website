const express = require('express')
const router = express.Router()

const log = console.log

const {
   User,
   Question,
   Notice,
   Tag,
   Report,
   ObjectID,
   isMongoError,
   sessionChecker,
   mongoChecker,
   authenticate,
   adminAuthenticate
} = require('./setups');

//tag route below**********/
router.get('/', mongoChecker, (req, res) => {
	Tag.find().then((tags) => {
		res.send(tags)
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route which given a list of tag ids, return a list of tag names
router.post('/names', mongoChecker, (req, res) => {
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
router.post('/info', mongoChecker, (req, res) => {
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
router.post("/", mongoChecker, (req, res) => {
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
			// Save questions
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
		console.log(error);
	})
})

router.patch('/:id', mongoChecker, (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Find the fields to update and their values.
	const fieldsToUpdate = {
		name:req.body.name
	}
	// req.body.name((change) => {
	// 	const propertyToChange = change.path.substr(1). // getting rid of the '/' character
	// 	fieldsToUpdate[propertyToChange] = change.value
	// })

	Tag.findByIdAndUpdate(id, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false}).then((tag) => {
		if (!tag) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(tag)
		}
	}).catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	})
})

router.delete('/:id', mongoChecker, (req,res) =>{
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	Tag.findByIdAndRemove(id).then((tag) => {
		if (!tag) {
			res.status(404).send()
		} else {   
			res.send(tag)
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send() // server error, could not delete.
	})
})

router.get('/popular', mongoChecker, (req, res) => {
	Tag.find().then((tags) => {
		// sort the tags by count
		tags = tags.sort((a,b) =>  a.count - b.count);
		// tags = tags.slice(0,5);
		res.send(tags);
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})



router.patch('/follow/:tag_id', mongoChecker, authenticate, (req, res) => {
	const tag_id = req.params.tag_id;

	// Validate id
	if (!ObjectID.isValid(tag_id)) {
		res.status(404).send('Invalid Tag ID');
		return;  // so that we don't run the rest of the handler.
	}

	const user = req.user;
	console.log(req.user);

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
						res.send('Okay!');
					})
					.catch((error) => {
						log(error)
						res.status(400).send('Bad request.');
					})
				})
				.catch((error) => {
					log(error)
					res.status(400).send('Bad request.');
				})
			}
		})
		.catch((error) => {
			res.status(500).send('Internal Server Error');
		})
	} else {
		res.status(409).send('Dupplicate following to Tag!');
	}

})

router.patch('/unfollow/:tag_id/:user_id', mongoChecker, (req, res) => {
	const tag_id = req.params.tag_id;
	const user_id = req.params.user_id;

	// Validate id
	if (!ObjectID.isValid(tag_id) || !ObjectID.isValid(user_id)) {
		res.status(404).send('Invalid ID');
		return;  // so that we don't run the rest of the handler.
	}

	User.findById(user_id).then((user) => {
		if(!user){
			res.status(404).send('User not found');
		} else if (user.tags.includes(tag_id)){
			Tag.findById(tag_id).then((tag) => {
				if(!tag){
					res.status(404).send('Tag not found');
				}
				else {
					tag.count = tag.count <= 0 ? 0 : tag.count-1;
					tag.save().then((tag) => {
						user.tags = user.tags.filter((tag) => tag._id != tag_id);
						user.save().then()
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
			res.send('Nothing changed');
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

})

// increment the number of tag used
router.patch('/increment/:tag_id/', mongoChecker, (req, res) => {
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
			tag.save().then()
			.catch((error) => {
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

router.get('/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid tag ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Tag.findById(id).then((tag) => {
		if (!tag) {
			res.status(404).send('tag not found');
		} else {
			res.json({ tag });
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

module.exports = router;