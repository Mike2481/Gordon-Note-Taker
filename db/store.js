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

    getNotes () {
        return this.read().then((notes) => {
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes))
            }
            catch (error) {
                parsedNotes = []
            }
            return parsedNotes;
        })
    }
    
};



module.exports = new Store()