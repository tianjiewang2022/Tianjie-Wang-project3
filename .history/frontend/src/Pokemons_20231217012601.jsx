import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

export default function Pokemons() {

    const [statusUpdates, setStatusUpdates] = useState([]);
    const [statusInput, setStatusInput] = useState({
        username: '',
        timestamp: '',
        textContent: '',
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        async function checkIfUserIsLoggedIn() {
            try {
                const response = await axios.get('/api/users/isLoggedIn');
                setIsLoggedIn(response.data.username);
            } catch (error) {
                setIsLoggedIn(null);
            }
        }

        checkIfUserIsLoggedIn();
    }, []);

    async function getAllStatusUpdates() {
        const response = await axios.get('/api/status-updates');
        setStatusUpdates(response.data);
    }

    async function logOutUser() {
        await axios.post('/api/users/logOut');
        setIsLoggedIn(null);
    }

    function setUsername(event) {
        const newUsername = event.target.value;
        setStatusInput({ ...statusInput, username: newUsername });
    }

    function setTimestamp(event) {
        const newTimestamp = event.target.value;
        setStatusInput({ ...statusInput, timestamp: newTimestamp });
    }

    function setTextContent(event) {
        const newTextContent = event.target.value;
        setStatusInput({ ...statusInput, textContent: newTextContent });
    }


    const components = [];
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const pokemonComponent = (<div><Link to={'/pokemon/' + pokemon._id}>{pokemon.name}</Link> {pokemon.color} - {pokemon.health}</div>);
        components.push(pokemonComponent);
    }

    async function createNewStatusUpdate() {
        await axios.post('/api/status-updates', statusInput);
        setStatusInput({ username: '', timestamp: '', textContent: '' });
        await getAllStatusUpdates();
    }

    // function setPokemonName(event) {
    //     const pokemonName = event.target.value;
    //     setPokemonInput({
    //         ...pokemonInput,
    //         /*
    //         health: pokemonInput.health,
    //         color: pokemonInput.color,
    //         */
    //         name: pokemonName
    //     })
    // }

    // function setPokemonColor(event) {
    //     const pokemonColor = event.target.value;
    //     setPokemonInput({
    //         ...pokemonInput,
    //         /*
    //         health: pokemonInput.health,
    //         name: pokemonInput.name,
    //         */
    //         color: pokemonColor
    //     })
    // }

    // function setPokemonHealth(event) {
    //     const pokemonHealth = event.target.value;
    //     setPokemonInput({
    //         ...pokemonInput,
    //         /*
    //         health: pokemonInput.health,
    //         color: pokemonInput.color,
    //         */
    //         health: pokemonHealth,
    //     })
    // }

    /*
    element.setListener('input', function(event) {
        // do smething

    })
    */

    // async function createNewPokemon() {
    //     const response = await axios.post('/api/pokemon/', pokemonInput);
    //     setPokemonInput({
    //         name: '', color: '', health: 0,
    //     })
    //     await getAllPokemons();

    // }

    return (
        <div>
            <Header />
            <Header isLoggedIn={isLoggedIn} logOutUser={logOutUser} />
            <div>{components}</div>
            <button onClick={getAllPokemons}>Click here to fetch all</button>
            <div>
                Name: <input value={pokemonInput.name} onInput={setPokemonName} type='text'></input>
                Color: <input value={pokemonInput.color} onInput={setPokemonColor} type='text'></input>
                Health: <input value={pokemonInput.health} onInput={setPokemonHealth} type='number'></input>
                <button onClick={createNewPokemon}>Submit New Pokemon</button>

            </div>
        </div>
    )

}