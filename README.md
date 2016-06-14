# confcon

REST API instructions are good. If I were a developer joining the team, README would seem thin:
* Is there a specific way to set up environment variables?
* Are there coding conventions?

## Installation  
Clone the repository and run:

    npm install  
Set the following environment variables:

- MONGO_URI -- should point to a mongoDB connection.  Ex:  mongodb://localhost/conference-connect
- APP_SECRET -- a string used to generate tokens
- PORT -- what port you would the app to run on.  The default if none is specified is 9000.  This can also be specified in the command line as an option to index.js.

Then, run:

    npm start

The default user is Admin and the default password is 'password'. You are encouraged to create a new user, set it as admin, and delete Admin immediately.


## Things you can do with the REST API

[VALIDATE](#validate)  
[SIGN UP](#signup)  
[SIGN IN](#signin)  

*The following endpoints require a valid token, provided with sign up or sign in*

[VIEW POSTS](#viewposts)  
[VIEW POSTS PAGINATED](#viewpostspaginated)  
[POSTCOUNT](#postcount)  
[CREATE POST](#createpost)  
[DELETE POST](#deletepost)  
[UPDATE POST](#updatepost)  

[VIEW USERS](#viewusers)  
[VIEW USER DETAIL](#viewuserdetail)  
[CREATE USER](#createuser)  
[DELETE USER](#deleteuser)  
[UPDATE USER](#updateuser)  

[VIEW AGENDA](#viewagenda)  
[ADD AGENDA ITEM](#addagendaitem)  
[DELETE AGENDA ITEM](#deleteagendaitem)  

[VIEW EVENTS](#viewevents)  
[VIEW EVENT DETAIL](#vieweventdetail)  
[CREATE EVENT](#createevent)  
[DELETE EVENT](#deleteevent)  
[UPDATE EVENT](#updateevent)  

[VIEW TOPIC](#viewtopic)  
[CREATE TOPIC](#createtopic)  
[DELETE TOPIC](#deletetopic)   
[UPDATE TOPIC](#updatetopic)  

[UPDATE CONFIG](#updateconfig)  

___

<a name="validate"></a>  
#### VALIDATE  
__URL:__ /validate  
__Method:__ GET
__Description:__ returns true if a user is valid, and true if the user is an admin.
__Authorized roles:__ N/A  
__Inputs:__

- token *-- Supplied in the header.*  

__Outputs:__

- valid: boolean
- admin: boolean

___

<a name="signup"></a>  
#### SIGN UP  
__URL:__ /signup  
__Method:__ POST
__Description:__ Creates a new user and returns a token. The token must be included in all API calls in the header as the VALUE for the KEY 'token'.  
__Authorized roles:__ N/A  
__Inputs:__

- username  *--the username must be unique. an error will be returned if the username if found in the database.*
- password  *--The password is encrypted before saved to database.*
- email (OPTIONAL)
- organization (OPTIONAL)
- roles (OPTIONAL)  *--an admin role can only be assigned with the CREATE USER or UPDATE USER end points*
- profile_twitter_username

__Outputs:__

- token

___

<a name="signin"></a>  
#### SIGN IN
__URL:__ /signin  
__Method:__ POST  
__Description:__ If the login returns a successful authentication, a token is returned. The token must be included in all API calls in the header as the VALUE for the KEY 'token'.  
__Authorized roles:__ N/A  
__Inputs:__

- username  
- password  *--The password is encrypted before saved to database.*

__Outputs:__

- token

___

*The following endpoints require a valid token, provided with sign up or sign in*  

<a name="viewposts"></a>  
#### VIEW POSTS
__URL:__ /api/post/list  
__Method:__ GET  
__Description:__ Returns posts in reverse chronological order, includes all posts.
__Authorized roles:__ attendee, admin  


__Outputs:__  

- id
- body  *--the full text of the post*
- user  *--name of poster*
- topics  *--all associated topics*
- event  *--name of associated event*
- link  *--HTTP link associated with post*
- edit_history  *--array of datetimes of edits, an empty array if has never been edited*
- creation_date  *--timestamp of creation date*

___  

<a name="viewpostspaginated"></a>  
#### VIEW POSTS PAGINATED
__URL:__ /api/post/list/[perPage]/[page]  
__Method:__ GET  
__Description:__ Returns posts in reverse chronological order, includes [perPage] posts, offset by [page].  
__Authorized roles:__ attendee, admin  


__Outputs:__  

- id
- body  *--the full text of the post*
- user  *--name of poster*
- topics  *--all associated topics*
- event  *--name of associated event*
- link  *--HTTP link associated with post*
- edit_history  *--array of datetimes of edits, an empty array if has never been edited*
- creation_date  *--timestamp of creation date*

___
<a name="postcount"></a>  
#### POSTCOUNT
__URL:__ /api/postcount  
__Method:__ GET  
__Description:__ Returns the total number of posts  
__Authorized roles:__ attendee, admin  


__Outputs:__  

- integer
___

<a name="createpost"></a>  
#### CREATE POST  
__URL:__ /api/post  
__Method:__ POST  
__Description:__ Creates a new message board post, returns post details with id.  
__Authorized roles:__ admin, attendee  
__Inputs:__  

- body  *--text body of message*
- user_id  *--id of User making the post*
- topic_ids (OPTIONAL)  *--array of topic ids*
- event_id (OPTIONAL)  *--id of associated Event*
- link (OPTIONAL)  *--String of HTTP URL*

__Outputs:__  

- id
- body
- user_id
- topic_ids
- event_id
- link
- edit_history
- creation_date

___

<a name="deletepost"></a>  
#### DELETE POST  
__URL:__ /api/post/\[id\]  *--pass the id of the post to be deleted as the path parameter*  
__Method:__ DELETE  
__Description:__ Deletes a specified message board post, returns the deleted post details.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee that created the post*    
__Inputs:__  
__Outputs:__   

- id
- body
- user_id
- topic_ids
- event_id
- link
- edit_history
- creation_date
- modification_date

___

<a name="updatepost"></a>  
#### UPDATE POST  
__URL:__ /api/post/\[id\]  *--pass the id of the post to be updated as the path parameter*    
__Method:__ PATCH  
__Description:__ Updates the details of a message board post, returns updated post details. Whatever optional inputs are provided are the fields that will be updated. Fields that are not updated are left with their original values. It will automatically add a new entry to the edit_history array with a new timestamp.   
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee that created the post*     
__Inputs:__  

- body (OPTIONAL)  *--text body of message*
- topic_ids (OPTIONAL)  *--array of topic ids*
- event_id (OPTIONAL)  *--id of associated Event*
- link (OPTIONAL)  *--String of HTTP URL*

__Outputs:__  

- id
- body
- user_id
- topic_ids
- event_id
- link
- edit_history
- creation_date

___

<a name="viewusers"></a>  
#### VIEW USERS  
__URL:__ /api/user/list  
__Method:__ GET  
__Description:__ Returns a list of attendees.  
__Authorized roles:__ admin, attendee     
__Inputs:__  
__Outputs:__  

- id
- username
- organization

___

<a name="viewuserdetail"></a>  
#### VIEW USER DETAIL
__URL:__ /api/user/\[id\]  *--pass the id of the user as the path parameter*    
__Method:__ GET  
__Description:__ Returns details for an specified user.  
__Authorized roles:__ admin (all details), attendee (a censored list based on profile settings)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee to be updated to view full, uncensored details*  
__Inputs:__  
__Outputs:__  

- id
- username
- organization
- email
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username

___

<a name="deleteuser"></a>  
#### DELETE USER
__URL:__ /api/user/\[id\]  *--pass the id of the user to be deleted as the path parameter*    
__Method:__ DELETE  
__Description:__ Deletes the specified user account. Returns the deleted user details.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee to be updated*  
__Inputs:__   
__Outputs:__

- id
- username
- organization
- email
- email_hidden
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username
- profile\_twitter\_hidden

____

<a name="updateuser"></a>  
#### UPDATE USER
__URL:__ /api/user/\[id\]  *--pass the id of the user to be updated as the path parameter*    
__Method:__ PATCH      
__Description:__ Updates a specified User account. Updates all optional fields included in the submission. Returns the updated User.    
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee to be updated*  
__Inputs:__   

- username (OPTIONAL)
- password (OPTIONAL)  *--The password is encrypted before saved to database.*
- email (OPTIONAL)
- email_hidden (OPTIONAL)  *--default is true*
- roles (OPTIONAL)  
- organization (OPTIONAL)
- agenda (OPTIONAL)  *--an array of Event ids*
- profile_description (OPTIONAL)
- profile_image (OPTIONAL)
- profile_website (OPTIONAL)
- profile\_twitter\_username (OPTIONAL)
- profile\_twitter\_hidden (OPTIONAL)  *--default is true*

__Outputs:__  

- id
- username
- organization
- email
- email_hidden
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username
- profile\_twitter\_hidden

___

<a name="viewagenda"></a>  
#### VIEW AGENDA
__URL:__ /api/agenda/\[id\]  *--pass the id of the specified user as the path parameter*    
__Method:__ GET  
__Description:__ Returns the list of favorited Events (the agenda) for a specified user.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee agenda*  
__Inputs:__   
__Outputs:__

- id  *--id of the Event*
- title  *--title of the Event*
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

<a name="addagendaitem"></a>  
#### ADD AGENDA ITEM
__URL:__ /api/agenda/\[id\]  *--pass the id of the specified user as the path parameter*    
__Method:__ PATCH  
__Description:__ Returns the updated list of favorited Events (the agenda) for a specified user.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee agenda*  
__Inputs:__   

- event_id  *--id of the specified event to be added to the agenda*

__Outputs:__

- id  *--id of the Event*
- title  *--title of the Event*
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

<a name="deleteagendaitem"></a>  
#### DELETE AGENDA ITEM
__URL:__ /api/agenda/\[id\]  *--pass the id of the specified user as the path parameter*    
__Method:__ DELETE    
__Description:__ Returns the updated list of favorited Events (the agenda) for a specified user.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee agenda*  
__Inputs:__   

- event_id  *--id of the specified event to be removed from the agenda*

__Outputs:__

- id  *--id of the Event*
- title  *--title of the Event*
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

____

<a name="viewevents"></a>  
#### VIEW EVENTS  
__URL:__ /api/event/list  
__Method:__ GET  
__Description:__ Returns a list event title and date, includes all events unless input has the optional filter parameter.  
__Authorized roles:__ admin, attendee   
__Inputs:__  

- topic_id (OPTIONAL)  *--filters to return only records possessing this ID in its topic field*

__Outputs:__  

- id
- title  
- date  
- speakers
- topics  
- location  

___

<a name="vieweventdetail"></a>  
#### VIEW EVENT DETAIL  
__URL:__ /api/event/\[id\]  *--pass the id of the event as the path parameter*    
__Method:__ GET  
__Description:__ Returns all detailed information for a given event.  
__Authorized roles:__ admin, attendee    
__Inputs:__  
__Outputs:__  

- id
- title
- date
- speakers
- topics
- location

___

<a name="createevent"></a>  
#### CREATE EVENT  
__URL:__ /api/event  
__Method:__ POST  
__Description:__ Creates a new event. Returns event details including the id.    
__Authorized roles:__ admin *--token of user making the request must be an admin role*      
__Inputs:__  

- title
- date
- speakers (OPTIONAL)
- topics (OPTIONAL)
- location (OPTIONAL)

__Outputs:__  

- id
- title
- date
- speakers
- topics
- location

___

<a name="deleteevent"></a>  
#### DELETE EVENT
__URL:__ /api/event/\[id\]  *--pass the id of the event to be deleted as the path parameter*    
__Method:__ DELETE   
__Description:__ Deletes a specified event. Returns the deleted event details.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  
__Outputs:__  

- id
- title
- date
- speakers
- topics
- location

___

<a name="updateevent"></a>  
#### UPDATE EVENT
__URL:__ /api/event/\[id\]  *--pass the id of the event to be updated as the path parameter*    
__Method:__ PATCH  
__Description:__ Updates a specified event. Updates all optional fields submitted. Returns the updated event details.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- title (OPTIONAL)
- date (OPTIONAL)
- speakers (OPTIONAL)
- topics (OPTIONAL)
- location (OPTIONAL)

__Outputs:__  

- id
- title
- date
- speakers
- topics
- location

___

<a name="viewtopic"></a>
#### VIEW TOPICS  
__URL:__ /api/topic/list  
__Method:__ GET  
__Description:__ Returns available topics.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- title
- color (OPTIONAL)

__Outputs:__

- id
- title
- color
___

<a name="createtopic"></a>  
#### CREATE TOPIC
__URL:__ /api/topic  
__Method:__ POST  
__Description:__ Create a new topic.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- title
- color (OPTIONAL)

__Outputs:__

- id
- title
- color

___

<a name="deletetopic"></a>  
#### DELETE TOPIC
__URL:__ /api/topic/\[id\]  *--pass the id of the topic to be deleted as the path parameter*    
__Method:__ DELETE  
__Description:__ Delete a specified topic. Returns the deleted topic.   
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  
__Outputs:__

- id
- title
- color

___

<a name="updatetopic"></a>  
#### UPDATE TOPIC
__URL:__ /api/topic/\[id\]  *--pass the id of the topic to be updated as the path parameter*    
__Method:__ PATCH  
__Description:__ Update a specified topic. It will updated whatever optional fields are provided. Returns the updated topic.   
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- title (OPTIONAL)
- color (OPTIONAL)

__Outputs:__

- id
- title
- color

___

<a name="viewconfig"></a>  
#### VIEW CONFIG
__URL:__ /api/config  
__Method:__ GET   
__Description:__ View configuration details  
__Authorized roles:__ admin, attendee  
__Inputs:__  
__Outputs:__  

- config_id
- name
- year
- city
- description
- contact_email
- contact_phone
- contact_address
- posts\_are\_public

___


<a name="updateconfig"></a>  
#### UPDATE CONFIG
__URL:__ /api/config  
__Method:__ PATCH  
__Description:__ Updates the conference site configuration details. Any fields submitted will be overwritten with the new info. Returns the updated Config.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*    
__Inputs:__

- config_id *--use value of 1*
- name (OPTIONAL)
- year (OPTIONAL)
- city (OPTIONAL)
- description (OPTIONAL)
- contact_email (OPTIONAL)
- contact_phone (OPTIONAL)
- contact_address (OPTIONAL)
- posts\_are\_public (OPTIONAL)

__Outputs:__

- config_id
- name
- year
- city
- description
- contact_email
- contact_phone
- contact_address
- posts\_are\_public

___


Tests are available:

    npm test
