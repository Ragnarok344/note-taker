const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//get request to get notes from db.json
router.get('/api/notes', async (req, res) => {
    const dbjson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbjson);
});
//post request
router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson), "utf8");
    res.json(dbJson);
    });
//delete request to remove notes
router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data); 
    const newNotes = dataJSON.filter((note) => {
      return note.id !== req.params.id;
});
fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
res.json("Note deleted")
    
});


module.exports =router;