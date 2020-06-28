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
#### Starting the application
Clone locally:
```shell
git clone https://github.com/csc309-summer-2020/team11.git
cd team11
index.html
```
#### Create an account or log in
* Start from index.html. Click on "get started" in the bottom. 
* Register by entering all required fields in the left block and press the “Register” button, this will lead you to a page showing some popular tags that you could subscribe to.
* OR use either one of the following accounts to log in.

| Username | Password |
| ------------- | ------------- |
| user  | user  |
| user2  | user2  |
| admin  | admin  |
| alan  | alan  |


#### Register
*A user will be able to login and register in this page

#### User Dashboard
* A user will be able to see their user profile, by clicking on the user dashboard
* A user will be able to see the newest questions and questions related to them.
* A user will be able to see the notification from admins via the userdashoard.

#### User Profile
* A user will be able to follow and followed by user profile
* A user will be able see the followers and followings in user profile
* A user will be able see the related question

### Edit User
* A user will be able to change their basic information via this page

#### Admin Dashboard
Current application is hardcoded to log in as the first account called “user” which has no access to the admin dashboard. To log in as admin, open /sharedClasses/classes.js and go to the bottom to change current user to admin:
```javascript
//Regular user
// curr_user = users[0];
//Admin user
curr_user = users[2];
```


Now when you open user/userdashboard.html, you will see an additional button called “Admin Dashboard” which shall lead you to a different dashboard only for admin users.

### Subscribe
* User will be able to subscribe tags or add tags in this page

#### Questions
*For each question will contain a title, a description and some related tags. When you go to editquestion.html, Fill the information that corresponds to the Blank and the user will be able to preview their question in the below.  
*Similar to twitter, in our website we separate tags by “,”.

### Report
* Users will be able to report questions via this page.

#### Answers
For the part of answers, click on reply to post to answer the question you want to answer. At the same page, you also can report an answer which is not appropriate and adire the answer you appreciate.
