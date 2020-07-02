![Logo](./images/logo.png)

# Team 11 Project: LOQAL - A Localized Q&A Web Application
We receive a vast amount of information about the COVID-19 daily. This information overload makes it difficult to find reliable and relevant information, especially for seniors and other vulnerable groups in our community who are not well versed with querying the search engine and fact checking. The goal of this project is to create a question and answer web application for reliable dissemination of information and knowledge [related to the pandemic] among members of the community. 

# How To Use

## Getting Started
These instructions will help you get a copy of our completed assignment up and running on your local machine.
* Clone this repository on your local machine
```shell
git clone https://github.com/csc309-summer-2020/team11.git
```
* Navigate to the cloned folder
```shell
cd team11
```
* Open `index.html` in your browser

## Hardcoded Data
We decided to hardcode some useful data and user information in a JavaScript file name `sharedClasses\classes.js`, included in most of our pages, to use across our web application. Currently this file is hardcoded to provide the logged in user as a regular user called “user”. To switch to the admin user, navigate to `sharedClasses\classes.js` and simply comment the line for users[0] and uncomment the line containing users[2]:
```javascript
//Regular user
// curr_user = users[0];
//Admin user
curr_user = users[2];
```

When logged in as an Admin, a link to the Admin Dashboard page will be added to the regular user dashboard. Additionally, changing other variables in `sharedClasses\classes.js` such as questions and answers will be dynamically reflected in our pages.

### A Note About Links
In order to have links that display the correct page associated with displayed data, we decided to add optional parameters to our URLs. In these pages, we use javascript to see if the optional parameters are present. If they are we use them to display the correct data and if not the page will load using hardcoded data. For example `team11/user/user_profile.html?user_id=2`, displays user profile for user id 2 as opposed to the generic `team11/user/user_profile.html` user profile page. Here are some more examples:
* `team11/answer/answer.html?question_id=1`
* `team11/answer/edit_answer.html?answer_id=2`
* `team11/question/edit_question.html?question_id=4`

# Features

Below we have listed the main functionalities associated with each page for regular users. In addition to these functionalities, Admin users have access to additional functionalities through Admin Dashboard which are described further down below in the [Admin Users](#admin-users) section.

## Regular Users

### Welcome Page (`index.html`):
This page serves as a welcome page. To get started, scroll down to the bottom of the page and click on the **Get Started** button.

### Register or Login (`register/register.html`)
* Register by entering all required fields in the left block and press the “Register” button, this will lead you to a page showing some popular tags that you could subscribe to.
* Alternatively, use one of the login credentials provided below to log in.

| Username | Password | Type of Account |
| ------------- | ------------- | ------------- |
| user  | user  | Regular User  |
| user2  | user2  | Regular User  |
| admin  | admin  | Admin User  |

Please note that the action you perform on this page, will not actually log you in and your user will still be the user specified in `sharedClasses\classes.js`

### Subscribe to Tags (`register/subscribe.html`)
* Users will be able to see the most popular tags
* Users will be able to follow/unfollow tags
* Users will be able to follow/unfollow a custom tag

### User Dashboard (`user/user_dashboard.html`)
* Users user will be able to see the newest questions and questions related to them
* Users will be able to see the latest notice posted by the admins
* Users will be able to see their recently posted questions and answers
* Sidebar allows users to go to their profile or edit their profile

### User Profile (`user/user_profile.html`)
* Users will be able to see the tags, questions and answers associated with that profile
* Users will be able to report the user of that profile
* Users will be able to see the list of followers and followings of that profile
* Users will be able to follow or unfollow other users by clicking on the "Follow" or "Unfollow" button. This button will be absent when you are viewing your own profile.

### Edit Profile (`user/edit_profile.html`)
* Users can edit their username, display name, email, password, and profile photo
* Users can see their status (normal or flagged)and account type (admin or regular user), but they cannot edit it
* Clicking on "Edit Your Tags" will redirect you to a page where you can follow some popular tags, unfollow current tags, or add a custom tag

### Ask/Edit a Question (`question/question.html`, `question/edit_question.html`)
* Post a new question by clicking on "Ask a New Question" button on user dashboard or "Ask" on the main navigation bar
* Provide a title, description and at least one related tag and preview your question before posting
* Submitting a question will redirect the user to the newly created question page which will show the question and all its corresponding answers. They will be able to edit their question from this page.

### Question and Answers (`answer/answer.html`, `answer/edit_answer.html`)
* A user can post a reply to questions, the posted answer will be added to the top of the answers
* If the logged in user is the same as the user asking the question, the user can edit the question, mark the question as solved/unsolved and pick any answer as best answer
* If the logged in user is the same as the user answering a question, an "Edit Answer" button is shown and users can edit their answer

### Search (`searchQuestion/search_question.html`)
* Submit a query from any page in the search field provided in the navigation bar
* The questions and answers containing that keyword will be displayed

### Report (`report/report.html`)
* Buttons for reporting a questions or an answer is provided in the individual question page
* Buttons for reporting a user is provided in user's profile page
* Clicking on the report button will direct to a page for giving a reason of reporting this user, question, or answer
* Will be redirected back to previous page after submitting the report

## Admin Users
In addition to functionalities above, admin users have access to a variety of other features listed below through Admin Dashboard.

Current application is hardcoded to log in as the first account called “user” which has no access to the admin dashboard. If you are opening pages through local files, you will need to open /sharedClasses/classes.js and go to the bottom to change current user to admin:
```javascript
//Regular user
// curr_user = users[0];
//Admin user
curr_user = users[2];
```
Now when you open `user/user_dashboard.html`, you will see an additional button called “Admin Dashboard” which shall lead you to a different dashboard only for admin users.

### Admin Dashboard (`admin/admin_dashboard.html`)
* View all reported users
  * Click to see reported users' profile
  * Flag user or deny report
* View all reported questions
  * Click to jump to question page
  * Flag question or deny report
* View all reported answers
  * Click to jump to question page at answer
  * Flag answer or deny report
* Admin's sidebar
 * Option to go back to admin's dashboard
 * Option to go back to the regular dashboard
 * Options for jumping to bookmarks on admin's dashboard at list of reported users, list of reported questions, and list of reported answers
 * Options to direct to new pages for posting new notices, viewing all users, questions, answers or tags

### Post Notice (`admin/notice.html`)
* An admin user could post important notices that are to be pinned at top of regular user's dashboard
* A notice contains a title and its content
* An admin user could see all the notices at the bottom of `admin/notice.html` and edit any notice or not show any notice to public.

### All Users (`admin/edit_user.html`)
* An admin could see a list of all registered users
* Search a user by his/her exact username or email to see his/her complete account informations
  * Searching a non-exsiting user will show "No user found"
  * Searching with no keyword input will show all users
* An admin user could edit any account's informations and mark user as flagged or unflagged, and make user to become an admin or regular user
* The "See Profile" button will lead to this user's profile page
* Clicking on the "save" button for editing user profile will check validation of inputs

### All Questions (`admin/edit_question.html`)
* Admin could see a list of all questions in a table showing the title, content, posting user, tags, and the time the question is posted, also the admin could see if the question is flagged and if the question is resolved
* Admin could edit any question's title, content, and tags, and also could mark questions as flagged or unflagged, resolved or not resolved
* Editing a question with an empty title or empty content is invalid

### All Answers (`admin/edit_answer.html`)
* Admin could see a list of all answers in a table showing the which question it is answering to, the user posting the answer, content of the answer, whether it is the best answer, whether it is flagged, and the time posted
* Admin could edit any answer's content, whether it is the best answer, and whether it is flagged
* Editing a answer's content to be empty is invalid

### All Tags (`admin/edit_tag.html`)
* Admin could see a list of all existing tags in a table showing simply the name of the tags
* Admin could edit the name of any tags
* Editing a tag with an empty name is invalid

# Development Log
Throughout the development of Phase 1, we used the following Google sheet to keep track of our progress and tasks and would like to keep it here for reference:  
https://docs.google.com/spreadsheets/d/1eXUJ3reDqHHjKZr3RrSvqVHPCbOBuvz-uzYq6QhfW8U/edit?usp=sharing
