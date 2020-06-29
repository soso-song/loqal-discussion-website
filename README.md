# Team 11

## Planning
Link to pages we aim to implement: https://docs.google.com/spreadsheets/d/1eXUJ3reDqHHjKZr3RrSvqVHPCbOBuvz-uzYq6QhfW8U/edit?usp=sharing


## Project title
LOQAL --- A Localized Q&A Web Application

## Motivation
We receive a vast amount of information about the COVID-19 daily. This information overload makes it difficult to find reliable and relevant information, especially for seniors and other vulnerable groups in our community who are not well versed with querying the search engine and fact checking. The goal of this project is to create a web application for reliable dissemination of information and knowledge [related to the pandemic] among members of the community. 

## Build status
All pages are built in hard coding. In sharedClasses\classes.js, includes all required classes and basic hard coding information. In case of testing, by manipulating the data in that js file could change the view for different pages.

## Features
From the index.html, users can register and login to the site. For standard users, they are able to edit, search and report questions and tags, change their profiles including icon pictures and passwords. For admin users, they have the same privilege as standard users as well, in addition to that, they are able to change standard users' profiles and give notification to all users via the site. 

## Code Example
"users.push(new User('admin', 'admin@admin.com', 'An Admin', 'admin', [0], true));"
This is an example of creating an admin user.

## How to use?
### Starting the application
Clone locally:
```shell
git clone https://github.com/csc309-summer-2020/team11.git
cd team11
index.html
```
### For regular users

#### Register or log in
* Start from index.html. Click on "get started" in the bottom. 
* Register by entering all required fields in the left block and press the “Register” button, this will lead you to a page showing some popular tags that you could subscribe to.
* OR use either one of the following accounts to log in.

| Username | Password |
| ------------- | ------------- |
| user  | user  |
| user2  | user2  |
| admin  | admin  |
| alan  | alan  |


#### User Dashboard
* A user will be able to see their user profile, by clicking on the user dashboard
* A user will be able to see the newest questions and questions related to them.
* A user will be able to see the notification from admins via the userdashoard.

#### User Profile
* A user will be able to follow and followed by user profile
* A user will be able see the followers and followings in user profile
* A user will be able see the related question

#### Edit User
* A user will be able to change their basic information via this page

#### Subscribe
* User will be able to subscribe tags or add tags in this page

#### Questions
* Each question contains a title, a description and some related tags. When you go to editquestion.html, Fill the information that corresponds to the Blank and the user will be able to preview their question in the below.  
*Similar to twitter, in our website we separate tags by “,”.

#### Report
* Users will be able to report questions via this page.

#### Answers
For the part of answers, click on reply to post to answer the question you want to answer. At the same page, you also can report an answer which is not appropriate and adire the answer you appreciate.

### For Admin users
Current application is hardcoded to log in as the first account called “user” which has no access to the admin dashboard. If you are opening pages through local files, you will need to open /sharedClasses/classes.js and go to the bottom to change current user to admin:
```javascript
//Regular user
// curr_user = users[0];
//Admin user
curr_user = users[2];
```
Now when you open user/userdashboard.html, you will see an additional button called “Admin Dashboard” which shall lead you to a different dashboard only for admin users.
ALSO, you can simply go back to the log in page and log in with username "admin" and password "admin".

#### Admin Dashboard
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

#### Post Notice
* An admin user could post important notices that are to be pinned at top of regular user's dashboard
* A notice contains a title and its content
* An admin user could see all the notices at the bottom of Admin/notice.html and edit any notice or not show any notice to public.

#### All users
* An admin could see a list of all registered users
* Search a user by his/her exact username or email to see his/her complete account informations
  * Searching a not exsiting user will show "No user found"
  * Searching with no keyword input will show all users
* An admin user could edit any account's informations and mark user as flagged or unflagged, and make user to become an admin or regular user
* The "See Profile" button will lead to this user's profile page
* Clicking on the "save" button for editing user profile will check validation of inputs

#### All Questions
* Admin could see a list of all questions in a table showing the title, content, posting user, tags, and the time the question is posted, also the admin could see if the question is flagged and if the question is resolved
* Admin could edit any question's title, content, and tags, and also could mark questions as flagged or unflagged, resolved or not resolved
* Editing a question with an empty title or empty content is invalid

#### All Answers
* Admin could see a list of all answers in a table showing the which question it is answering to, the user posting the answer, content of the answer, whether it is the best answer, whether it is flagged, and the time posted
* Admin could edit any answer's content, whether it is the best answer, and whether it is flagged
* Editing a answer's content to be empty is invalid

#### All Tags
* Admin could see a list of all existing tags in a table showing simply the name of the tags
* Admin could edit the name of any tags
* Editing a tag with an empty name is invalid
