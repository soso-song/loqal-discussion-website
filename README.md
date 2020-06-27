# Team 11

## Planning
Link to pages we aim to implement: https://docs.google.com/spreadsheets/d/1eXUJ3reDqHHjKZr3RrSvqVHPCbOBuvz-uzYq6QhfW8U/edit?usp=sharing


Project title
LOQAL --- A Localized Q&A Web Application

Motivation
he goal of this project is to create a web application for reliable dissemination of information and knowledge [related to the pandemic] among members of the community.

Build status
All page are build in hard coding. In sharedClasses\classes.js, includes all required classes and basic hard coding information. In case of testing, by manipulate the data in that js file could change the view for different pages.

Features
From the index.html, user can register and login to the site. For standard users, they are able to edit, search and report questions and tags, change their profiles includes icon pictures and passwords. For admin users, they have same previlage as starndand users as well, in addition to that, they are able to change standard users' profiles and give notification to all users via the site. 

Code Example
"users.push(new User('admin', 'admin@admin.com', 'An Admin', 'admin', [0], true));"
This is an example of create an admin user.

How to use?
Start from index.html. Click on "get started" in the bottom, then use any user name and password stored in 
sharedClasses\classes.js to login. So user will be able to see their user profile, by clicking on user dashboard, they will be able to see the newest questions and questions related to them.