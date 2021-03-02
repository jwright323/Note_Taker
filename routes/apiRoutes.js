// Dependencies
const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function(app){

    //========== API ROUTES ==========

    // GET Method to return all notes
    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    // POST Method to add notes
    app.post("/api/notes", function(req, res){

        // If the notes array is equal to zero than initialize ID to zero
        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            // Else add 1 for new ID
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        notesData.push(req.body);

        // Write notes data to database
        updateDB(notesData);
        console.log(notesData);

        // returns new note in JSON format.
        res.json(req.body);
    });

    // DELETE Method to delete note with specified ID
    app.delete("/api/notes/:id", function(req, res){
        
        // Get IDs and convert to a string
        let id = req.params.id.toString();
        console.log(id);

        // Go through the notes array to search for the matching ID
        // If there is a match, delete
        for (i=0; i < notesData.length; i++){
           
            if (notesData[i].id == id){
                console.log(`Deleting note with id ${id}`);
                // responds with deleted note
                res.send(notesData[i]);

                // Remove the deleted note from the notes array
                notesData.splice(i,1);
                break;
            }
        }

        // Write notes data to database
        updateDB(notesData);

    });

    // Function to write to the Database
    function updateDB(notes){
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log (notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }
};