# muzzfrontend
A SPA application to impement a chat functionality


# Requirements Met: 

UI fully Implemented 

Messages are encased in Bubble as required 

Messages separated by more than an hour should be sectioned with the date and time - “{day} {timestamp}”

Messages from the same user sent within 20s of each other should have a smaller vertical spacing between them. Making them look grouped together


# Functionality:

You can only chat as two users  (Habeebah or Nurudeen)
you can only login as either of the two Users, one at a time
 Users Must be in the same Room to initiate chat , if there are no rooms available and create another room.


# Bugs:

1. you need to login as either of the two users, copying a room link to another browser to initiate a chat in a room would crash the app
 Potential fix : this could he managed checking if the localStorage has a UserId on load if not reroute to login