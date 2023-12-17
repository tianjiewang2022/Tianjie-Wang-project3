const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../db/user/user.model');


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

router.get('/user/username', async function (req, res) {
    const username = req.query.username;

    try {
        const userData = await UserModel.findUserByUsername(username);
        const statusUpdates = await UserModel.getStatusUpdates(username);

        const userResponse = {
            username: userData.username,
            timestamp: userData.timestamp,
            description: userData.description,
        };

        const statusUpdatesResponse = statusUpdates.map((update) => ({
            _id: update._id,
            timestamp: update.timestamp,
            textContent: update.textContent,
        }));

        return res.send({
            user: userResponse,
            statusUpdates: statusUpdatesResponse,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/user/:username/statusUpdates', async function (req, res) {
    const username = req.params.username;

    try {
        const statusUpdates = await UserModel.getStatusUpdates(username);

        const statusUpdatesResponse = statusUpdates.map((update) => ({
            _id: update._id,
            timestamp: update.timestamp,
            textContent: update.textContent,
        }));

        return res.send(statusUpdatesResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;
