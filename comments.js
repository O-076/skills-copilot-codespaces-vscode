// create web server
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

// create comments array
let comments = [];

// create comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.status(201).send(comment);
});

// get all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// get comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    res.send(comment);
});

// update comment by id
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    Object.assign(comment, req.body);
    res.send(comment);
});

// delete comment by id
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).send('Comment not found');
    }
    comments.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Comments API');
});
