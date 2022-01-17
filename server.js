const express = require('express');
const bodyparser = require('body-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Bola',
            email: 'bola@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },

        {
            id: '1234',
            name: 'Abimbola',
            email: 'Abimbola@gmail.com',
            password: 'cakes',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json("success logging in");
    } else {
        res.status(400).json("error logging in");
    }
});

app.get('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '12345',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})


app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})


app.listen(9000, () => {
    console.log("App is running on port 9000");
}); 