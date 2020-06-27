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
Clone locally:
```shell
git clone https://github.com/csc309-summer-2020/team11.git
cd team11
index.html
```

Start from index.html. Click on "get started" in the bottom, then register or use either one of the following accounts to log in.

| Username | Password |
| ------------- | ------------- |
| user  | user  |
| user2  | user2  |
| admin  | admin  |
| alan  | alan  |

So a user will be able to see their user profile, by clicking on user dashboard, they will be able to see the newest questions and questions related to them.



However, the current application is hardcoded to log in as the first account called “user” which has no access to the admin dashboard. To log in as admin, open /sharedClasses/classes.js and go to the bottom to change current user to admin:
```javascript
//Regular user
// curr_user = users[0];
//Admin user
curr_user = users[2];
```
Now when you open user/userdashboard.html, you will see an additional button called “Admin Dashboard” which shall lead you to a different dashboard only for admin users.


