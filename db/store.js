const util = require('util');
// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// code obtained through tutor session
const readFileAsync = util.promisify(fs.readFile);  // converts fs.readFile() into a function that returns a promise
const writeFileAsync = util.promisify(fs.writeFile); // converts fs.writeFile() into a function that returns a promise


class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    }
    write (note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    writeNote (note) {
        console.log(note);
        const { title, text } = note
        // if (!title || !text) {
        //     throw new Error("Tile and Text can't be blank")
        // }
        
        //You'll need to find a way to give each note a unique id when it's saved
        //(look into npm packages that could do this for you).  uuid?

        const newNote = { title, text, id: uuidv4() } // uses the installed uuid function to create a unique id

        return this.getNotes() // getNotes reads existing array
        .then(notes => [...notes, newNote]) // passes all existing notes by using spread operator
                                            // and newNote as parameters
        .then(combinedNotes => this.write(combinedNotes)) // passes result into the write function
        .then(() => this.newNote) // returns combined result
    }
    
    getNotes () {
        return this.read()
        .then(notes => {
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes))
            }   //  converts string to json and combines with array
            catch (error) {
                parsedNotes = []
            }
            console.log(parsedNotes);

            return parsedNotes;  // returns the new array
        })
    }
    
    // Bonus
    // You haven’t learned how to handle DELETE requests, but this application has that functionality
    // in the front end. As a bonus, see if you can add the DELETE route to the application using the
    // following guideline:

    // DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
    // In order to delete a note, you'll need to read all notes from the db.json file, remove the note
    // with the given id property, and then rewrite the notes to the db.json file.

    deleteNotes(id) { // passes note data by selected id
        return this.getNotes() // pulls the note array
        .then(pulledData => pulledData.filter(note => note.id !== id)) // filters the array to pull out everything except the selected id
        .then(goodNotes => this.write(goodNotes))  // writes the new array without selected id
    }
};

module.exports = new Store()