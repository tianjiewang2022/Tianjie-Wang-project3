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

        const createUserResponse = await UserModel.createUser({ username: username, password: password, joinTimestamp: Date.now() });

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
        const user = await UserModel.findUserByUsername(username);

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update user description (only for the logged-in user)
router.put('/:username', async function (req, res) {
    const loggedInUsername = req.cookies.username;
    const targetUsername = req.params.username;
    const newDescription = req.body.description;

    try {
        // Ensure the logged-in user is updating their own description
        if (loggedInUsername !== targetUsername) {
            return res.status(403).send("Forbidden: You can only update your own description");
        }

        const updatedUser = await UserModel.updateUserDescription(targetUsername, newDescription);

        return res.send(updatedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all status updates for a user
router.get('/:username/statusUpdates', async function (req, res) {
    const username = req.params.username;

    try {
        const user = await UserModel.findUserByUsername(username);

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.send(user.statusUpdates || []);
    } catch (error) {
        res.status(500).send(error.message);
    }
});





module.exports = router;
