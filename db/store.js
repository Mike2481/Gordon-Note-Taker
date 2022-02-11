const util = require('util');
const uuid = require('uuid');

const fs = require('fs');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store{
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    }
    write (note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    // getNotes() {
    //     return this.read()
    //         .then(notes => {
    //             return JSON.parse(notes) || [];
    //         })
    // }

    getNotes () {
        return this.read().then((notes) => {
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes))
            }   //  converts string to json and combines with array
            catch (error) {
                parsedNotes = []
            }
            return parsedNotes;  // returns the new array
        })
    }

    writeNote () {
        const { title, text } = note
        
        
        if (!title || !text) {
            throw new Error("Tile and Text can't be blank")
        }
        const newNote = { title, text, id } // not really sure how to use uuid
        id = uuid()

        return this.getNotes() // getNotes reads existing array
        .then(notes => [...notes, newNote]) // passes all existing notes by using spread opperator
                                            // and newNote as parameters
        .then(combinedNotes => this.write(combinedNotes)) // passes result into the write function
        .then(() => this.newNote) // returns combined result
    }
    
};



module.exports = new Store()