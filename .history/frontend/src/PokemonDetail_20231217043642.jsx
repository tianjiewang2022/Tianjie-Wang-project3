import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Navbar from './Navbar';

export default function PokemonDetail() {

    const [pokemonDetails, setPokemonDetails] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const params = useParams()

    async function fetchAndSetPokemon() {
        const pokemonResponse = await axios.get('/api/pokemon/' + params.pokemonId)
        setPokemonDetails(pokemonResponse.data)
    }

    useEffect(function () {
        fetchAndSetPokemon()
    }, []);
    useEffect(() => {
        async function checkIfUserIsLoggedIn() {
            try {
                const response = await axios.get('/api/user/isLoggedIn');
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        }

        checkIfUserIsLoggedIn();
    }, []);

    async function deletePokemon() {
        const response = await axios.delete('/api/pokemon/' + params.pokemonId)
        navigate('/');
    }

    // if(pokemonDetails.name) return (<div>Loading...</div>);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} />
            <div>Name: {pokemonDetails.name}</div>
            <div>Color: {pokemonDetails.color}</div>
            <div>Health: {pokemonDetails.health}</div>
            <button onClick={deletePokemon}>Delete Me!</button>
        </div>

    )


}