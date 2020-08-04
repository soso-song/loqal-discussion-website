"use strict"

/* Ass1 Library - JS */

// global id count
let num_questions = 0;
let num_answers = 0;
let num_users = 0;
let num_tags = 0;
let num_notices = 0;
let num_reports = 0;


// global arrays
const users = [];
const questions = [];
const answers = [];
const tags = [];
const notices = [];
const reports = [];


class User{
	constructor(username, email, display_name, password, 
				tag_list, is_admin, photo_src='../images/noPhoto.jpg', following=[], followed=[]){
		this.username = username;
		this.email = email;
		this.display_name = display_name;
		this.password = password;
		this.tag_list = tag_list;					// list of tag id
		this.photo_src = photo_src;
		this.is_admin = is_admin;
		this.is_flagged = false;
		// unique user id
		this.id = num_users;
		this.following = following;
		this.followed = followed;
		num_users++;
	}

}

class Tag{
	constructor(tagName){
		this.name = tagName;
		this.id = num_tags;
		num_tags++;
	}
}


class Question{
	constructor(title, content, user_id, tag_list){	
		this.title = title;
		this.content = content;
		this.user_id = user_id;
		this.tag_list = tag_list;					// list of tag id
		this.is_resolved = false;
		this.is_flagged = users[user_id].is_flagged;	// in case flagged user posting questions
		// this.answer = [];
		this.time = new Date().toLocaleTimeString();
		// unique id
		this.id = num_questions;
		num_questions++;
	}
}

class Answer{
	constructor(content, user_id, question_id, answer_id=-1){
		this.is_best = false;
		this.content = content;
		this.user_id = user_id;
		this.question_id = question_id;
		this.answer_id = answer_id;				// -1 if this is an answer to answer
		this.time = new Date().toLocaleTimeString();
		this.is_flagged = users[user_id].is_flagged;		// in case flagged user posting answers
		// unique id
		this.id = num_answers;
		this.is_best = false;
		num_answers++;
	}
}

class Notice{
	constructor(title, content, user_id){
		this.title = title;
		this.content = content;
		this.user_id = user_id;
		this.time = new Date().toLocaleTimeString();
		// unique id
		this.id = num_notices;
		num_notices++;
	}

}

// type allows 'u' - user, 'q' - question, 'a' - answer
class Report{
	constructor(type, rep_unique_id, rep_user, reason){
		this.type = type;
		this.rep_unique_id = rep_unique_id;
		this.rep_user = rep_user;
		this.reason = reason;
		this.time = new Date().toLocaleTimeString();
		this.is_reviewed = false;
		this.reviwedBy = null;
		// unique id
		this.id = num_reports;
		num_reports++;
	}

}


// tags
tags.push(new Tag('toronto'));
tags.push(new Tag('dt'));
tags.push(new Tag('north-york'));
tags.push(new Tag('student'));
tags.push(new Tag('parent'));
tags.push(new Tag('diabete'));

// users(username, email, display_name, password, tag_list, is_admin, photo_src)
users.push(new User('user', 'user@user.com','First User', 'user', [0,3], false));
users.push(new User('user2', 'user2@user2.com', 'Second User', 'user2', [1,4,5], false));
users.push(new User('admin', 'admin@admin.com', 'An Admin', 'admin', [0], true));
users.push(new User('alan', 'alan@alan.com', 'Alan T', 'alan', [0,2], false));

// questions and answers
questions.push(new Question('1st question title','1st qustion content', 0, [0,5]));
questions.push(new Question('2nd question title','2nd qustion content', 1, [1,4]));
questions.push(new Question('3rd question title','3rd qustion content', 1, [0,3]));
questions.push(new Question('4th question title','4th qustion content', 0, [2,3]));
questions.push(new Question('Where can I buy some avocados?',
'Please help me. I need some avocados during quarantine. I initially thought I would find them here but I was wrong. Now I am looking for a healthy alternative.'
, 0, [2,3,0]));


// answers (content, user, question_id, answer_id=-1)
answers.push(new Answer('Answer to 1st question', 1, 0));
//answers.push(new Answer('Answer to 1st answer in 1st quetion', 0, 0, 0));
answers.push(new Answer('Answer to 2nd question', 0, 1));
answers.push(new Answer('Another answer to 2nd question', 0, 1));
answers.push(new Answer('The subtropical species needs a climate without frost and with little wind. High winds reduce the humidity, dehydrate the flowers, and affect pollination. When even a mild frost occurs, premature fruit drop may occur, although the cultivar can tolerate temperatures down to −1 °C. Several cold-hardy varieties are planted in the region of Gainesville, Florida, which survive temperatures as low as −6.5 °C (20 °F) with only minor leaf damage. The trees also need well-aerated soils, ideally more than 1 m deep.'
, 1, 4));
answers.push(new Answer('Another answer to Avocado question', 2, 4));


// notice
notices.push(new Notice('Washing Hands', 'Do not forget to wash your hands everyday with soap and water.', 2))

// report
reports.push(new Report("u", 1, 0, "posting multiple fake answers"));
reports.push(new Report("q", 1, 0, "hhhhh"));
reports.push(new Report("a", 0, 0, "fake answer"));
reports.push(new Report("a", 1, 0, "fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!fake answer!!!!!"));

// logged in user
let curr_user;

//For our TA: Comment and uncomment this part to change the logged in user
//Regular user
curr_user = users[0];
//Admin user
//curr_user = users[2];