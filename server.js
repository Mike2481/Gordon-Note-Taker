// require express, fs, and path
const express = require('express');
const fs = require('fs');
const path = require('path');
// set port to 3001
const PORT = process.env.PORT || 3001;
const store = require('./db/store');

const app = express();
// import the db.json file
const notes = require('./db/db.json');



//  required in order to post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// need to return notes.html
app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/notes.html'));

});

// need to return index.html
app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => { 
    store.getNotes().then((notes) => {
        return res.json(notes)
    })
});

// app.post('/api/notes', (req, res) => {
//     const notes = 
// })

// app.post('/api/notes', (req, res) => {  // found saveNote() in public/assets/js/index.js

// }) 
//should receive a new note to save on the request body, add it to the db.json file
// and then return the new note to the client. 
//You'll need to find a way to give each note a unique id when it's saved 
//(look into npm packages that could do this for you).  uuid?



// Bonus
// You haven’t learned how to handle DELETE requests, but this application has that functionality 
// in the front end. As a bonus, see if you can add the DELETE route to the application using the 
// following guideline:

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 
// In order to delete a note, you'll need to read all notes from the db.json file, remove the note 
// with the given id property, and then rewrite the notes to the db.json file.

app.listen(PORT, () => {
    console.log('listening on port 3001')
})