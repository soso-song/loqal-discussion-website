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

// For handling images
// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'csc309summer11',
    api_key: '565837127599264',
    api_secret: 'zUyJecwIy4lfJnsC9BSMxoda7i8'
});

/*** User routes below ****************/
// Set up a POST route to create a user of your web app
router.post('/', mongoChecker, (req, res) => {
	//log(req.body)

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		username: req.body.username,
		displayname: req.body.displayname
	})

	// Save the user
	user.save().then((user) => {
		req.session.user = user._id;
        req.session.email = user.email
        res.redirect('/subscribe');
	})
	.catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the user
		}
	})
})

// A route to login and create a session
router.post('/login', mongoChecker, (req, res) => {
	const email = req.body.email
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
	User.findByEmailPassword(email, password).then((user) => {
	    if (!user) {
			//res.redirect('/login');
			res.status(404).send('Resource not found')
        } else {
            // Add the user's id to the session cookie.
			// We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/dashboard');
        }
    }).catch((error) => {
    	if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request')
		}
		
    })
})

// A route to logout a user
router.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

// Route for getting all users
router.get('/', mongoChecker, adminAuthenticateAPI, (req, res) => {
	User.find().then((users) => {
		res.send(users) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})


// Route which given a list of ids, gives a mapping of ids to users
router.post('/mapping', mongoChecker, authenticateAPI, (req, res) => {
	const ids = req.body.ids;

	User.find({'_id': { $in: ids} }).then((users) => {
		if(users.length == 0) {
			res.status(404).send("Can't find Users");
		} else {
			const mapping = {}
			users.map(user => {
				mapping[user._id] = user
			})
			res.send(mapping);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


// Route for updating basic info of current user
router.patch('/', mongoChecker, authenticateAPI, (req, res) => {
	User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			user.displayname = req.body.displayname;
			user.email = req.body.email;
			user.username = req.body.username

			user.save().then((result)=>{
				const myurl = '/profile?user_id=' + user._id
				res.redirect(303, myurl);
			}).catch((error)=>{
				//console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for changing password
router.patch('/password', mongoChecker, authenticateAPI, (req, res) => {
	User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			user.password = req.body.password;

			user.save().then((result)=>{
				const myurl = '/profile?user_id=' + user._id
				res.redirect(303, myurl);
			}).catch((error)=>{
				//console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for getting the current user, check to see if there is a better way
router.get('/current', mongoChecker, authenticateAPI, (req, res) => {
	res.send(req.user)
})

// Route for flag user
router.patch('/flag/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			user.isFlagged = req.body.flag;
			user.save().then(use => {
				res.send(use);
			})
			.catch((error)=>{
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


// a POST route to *create* an image
router.post("/picture", multipartMiddleware, authenticateAPI, (req, res) => {

	User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			const imageId = user.image_id
			if(imageId !== ''){
				cloudinary.uploader.destroy(imageId, function (result) {

					user.image_id= "", 
                	user.image_url= "",
					user.save().then((result)=>{
						//res.send(result);
						    // Use uploader.upload API to upload image to cloudinary server.
						cloudinary.uploader.upload(
							req.files.image.path, // req.files contains uploaded files
							function (result) {
								user.image_id= result.public_id, // image id on cloudinary server
								user.image_url= result.url,
								user.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									console.log(error);
									res.status(400).send('Bad request.');
								})
						});
					}).catch((error)=>{
						console.log(error);
						res.status(400).send('Bad request.');
					})

				});
			}else{
				cloudinary.uploader.upload(
					req.files.image.path, // req.files contains uploaded files
					function (result) {
						user.image_id= result.public_id, // image id on cloudinary server
						user.image_url= result.url,
						user.save().then((result2)=>{
							res.send(result2);
						}).catch((error)=>{
							console.log(error);
							res.status(400).send('Bad request.');
						})
				});
			}
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

});

// Route for admin side updating basic info of current user
router.patch('/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		}
		else {
			let message;
			// try to save username first
			user.username = req.body.username;
			user.save().then((user) => {
				user.displayname = req.body.displayname;
				user.email = req.body.email;
				user.tags = [...new Set(req.body.tags)];	// remove duplicates
				user.isFlagged = req.body.isFlagged;
				user.isAdmin = req.body.isAdmin;
				user.save().then((result) => {
					res.send(result)
				})
				.catch(error => {
					message = {msg: 'Bad Email'};
					res.json(message);
				})
			}).catch((error)=>{
				message = {msg: 'Bad Username'};
				res.json(message);
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


/*** Follow Unfollow routes below **********************************/
// Following a user
router.post('/follow/:id', mongoChecker, authenticateAPI, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	User.findById(id).then((user)=>{
		if(!user){
			res.status(404).send('User not found');
		}else{
			if(user.followers.includes(req.user._id)){
				res.status(400).send('Already following');
			}else{
				user.followers.push(req.user._id);
				user.save().then((result)=>{
					//res.send(result);

					User.findById(req.user._id).then((follower)=>{
						if(!follower){
							res.status(404).send('user not found');
						}else{
							if(follower.following.includes(user._id)){
								res.status(400).send('Already following');
							}else{
								follower.following.push(user._id);
								follower.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									log(error)
									res.status(400).send('Bad request.');
								})
							}
						}
					})
					.catch((error) => {
						log(error)
						if (isMongoError(error)) {
							res.status(500).send('Internal server error')
						} else {
							res.status(400).send('Bad Request')
						}
					})

					
				}).catch((error)=>{
					log(error)
					res.status(400).send('Bad request.');
				})
			}
		}
	})
	.catch((error) => {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Unfollowing a user
router.post('/unfollow/:id', mongoChecker, authenticateAPI, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	User.findById(id).then((user)=>{
		if(!user){
			res.status(404).send('user not found');
		}else{
			if(!user.followers.includes(req.user._id)){
				res.status(400).send('Already not following');
			}else{
				const index = user.followers.indexOf(req.user._id);
				user.followers.splice(index, 1);

				user.save().then((result)=>{
					//res.send(result);

					User.findById(req.user._id).then((follower)=>{
						if(!follower){
							res.status(404).send('user not found');
						}else{
							if(!follower.following.includes(user._id)){
								res.status(400).send('Already not following');
							}else{
								const index = follower.following.indexOf(user._id);
								follower.following.splice(index, 1);
				
								follower.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									res.status(400).send('Bad request.');
								})
							}
						}
					})
					.catch((error) => {
						if (isMongoError(error)) {
							res.status(500).send('Internal server error')
						} else {
							res.status(400).send('Bad Request')
						}
					})

				}).catch((error)=>{
					res.status(400).send('Bad request.');
				})
			}
		}
	})
	.catch((error) => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Route for getting a user
router.get('/:id', mongoChecker, authenticateAPI, (req, res) => {
	//log(req.params.id)
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// If id valid, findById
	User.findOne({_id: id}).then((user) => {
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this user
		} else {
			res.send(user)
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	})

})


module.exports = router;