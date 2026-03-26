const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4800;

const users = [];

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.get('/users', (req,res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const addUser = req.body;

    const userExists = users.find(users => users.email === addUser.email);
    if(userExists){
        return res.status(400).json({
            Message: "User already exist"
        })
    }

    if(!addUser.name){
        return res.status(400).json({
            Message: "Name required"
        })
    }

    if(!addUser.email){
        return res.status(400).json({
            Message: "Email required"
        })
    }

        if (!addUser.password) {
        return res.status(400).json({
            message: "Password required"
        });
    }

    users.push(addUser);
    res.status(200).json({
        Message: "User added successfully",
         users: addUser,
         allUsers: users
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})