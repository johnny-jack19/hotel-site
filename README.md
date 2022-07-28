# hotel-site
Important:
1. In the folder, run "npm start" in the terminal (git bash has had issues in the past, but that might be my end)
2. Don't test the pages on a live server.  The fetchs other than "GET" will cause the page to relaod and fail promises.

The index page is the customer-side hotel website.
The company page is the company-side website (desktop view only).
The app.js file is an express server wrapped around a sqlite database.
A sqlite database was used because it is easier to pass around a file than having whoever export a full sql database.
The fact that the sqlite3 file is the folder is the reason a live server reloads with the fetchs.

The index page switchs to a desktop view at 900px.  It only allows for booking.

The company page is broken down into 5 sections:
1. Today: It lists the rooms(clickable) and displays if the room is booked and currently has someone in it. 
You can "Check in" if someone is booked, "Check out" if the room is occupied, and "Book" if the 
room isn't booked for the night (book only for the night). The buttons will only be visible under those conditions.
2. Calendar: It displays a calendar and each day displays the number of booked and vacant rooms. (Loads on page refresh)
3. Booking: Allows you to book a room.
4. Look Up: Allows you to search for a booking and delete it. (It will require a different parameter
if there are mutliple entries with the same value i.e. people with the same name)
5. Contacts: Just a list (nothing fancy)

The javascript requirements are:
1. Create and use a function that accepts two or more values (parameters), 
calculates or determines a new value based on those inputs, and returns a new value.
This is done through the booking. It takes in the check in, check out, and room type to
determine price.
2. Create a form and save the values (on click of Submit button) to an external file.  The booking
posts to a sqlite3 file.
3. Visualize data in a graph, chart, or other visual representation of data.  The calendar.
4. Create a web server with at least one route and connect to it from your application using ExpressJS.
The app.js and everything in the db folder.
