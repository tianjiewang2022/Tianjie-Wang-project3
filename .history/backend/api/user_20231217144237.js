const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../db/user/user.model').default;


router.get('/', async function (request, response) {
    try {
        const allUsers = await UserModel.getAllUsers();
        response.send(allUsers);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/', async function (request, response) {
    const body = request.body;

    try {
        const newUserResponse = await UserModel.createUser(body);
        response.send("Created new user!");
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.findUserByUsername(username);

        if (!user || user.password !== password) {
            return res.status(403).send("Invalid username or password");
        }

        const token = jwt.sign({ username: user.username }, "HUNTERS_PASSWORD");

        res.cookie("username", token);

        return res.send({ username: user.username });
    } catch (e) {
        res.status(401).send(null);
    }
});

router.post('/register', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            return res.status(409).send("Missing username or password");
        }

        const existingUser = await UserModel.findUserByUsername(username);

        if (existingUser) {
            return res.status(409).send("Username already exists");
        }

        const createUserResponse = await UserModel.createUser({ username: username, password: password });

        const token = jwt.sign({ username: createUserResponse.username }, "HUNTERS_PASSWORD");

        res.cookie("username", token);

        return res.send({ username: createUserResponse.username });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/isLoggedIn', async function (req, res) {
    const username = req.cookies.username;

    if (!username) {
        return res.send({ username: null });
    }

    try {
        const decodedToken = jwt.verify(username, "HUNTERS_PASSWORD");
        if (!decodedToken || !decodedToken.username) {
            return res.send({ username: null });
        } else {
            return res.send({ username: decodedToken.username });
        }
    } catch (e) {
        return res.send({ username: null });
    }
});

router.post('/logOut', function (req, res) {
    res.cookie('username', '', {
        maxAge: 0,
    });

    res.send(true);
});

router.get('/:username', async function (req, res) {
    const username = req.params.username;

    try {
        const userData = await UserModel.findUserByUsername(username);
        console.log('User Data:', user);
        if (!userData) {
            return res.status(404).send("User not found");
        }

        const userResponse = {
            username: userData.username,
            joinTimestamp: userData.joinTimestamp,
            description: userData.description,
        };

        return res.send({
            user: userResponse
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});








module.exports = router;
