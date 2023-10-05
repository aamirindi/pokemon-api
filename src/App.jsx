import { TextField } from "@mui/material";
import logo from "./assets/International_Pokémon_logo.svg.png";
import "./style/App.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Axios from "axios";

export default function Header() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    specialattack: "",
    specialdefense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    const lowercasePokemonName = pokemonName.toLowerCase();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${lowercasePokemonName}`).then(
      (response) => {
        // console.log(response);
        setPokemon({
          name: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialattack: response.data.stats[3].base_stat,
          specialdefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
        setPokemonName("");
      }
    );
  };

  return (
    <>
      <div className="header">
        <div className="logo-img">
          <img src={logo} />
        </div>
        <div className="search-input">
          <TextField
            onChange={(e) => {
              setPokemonName(e.target.value);
            }}
            className="input"
            id="outlined-basic"
            label="Search your Pokemon"
            // variant="outlined"
          />
          <button onClick={searchPokemon}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="display">
        {!pokemonChosen ? (
          <h1>Please Choose a Pokemon </h1>
        ) : (
          <>
            <div className="left">
              <div className="content">
                Species Name : <span>{pokemon.name}</span>
              </div>
              <img src={pokemon.img} alt="" />
            </div>
            <div className="right">
              <div className="content">
                Hp : <span>{pokemon.hp}</span>
              </div>

              <div className="content">
                Attack : <span>{pokemon.attack}</span>
              </div>
              <div className="content">
                Defense : <span>{pokemon.defense}</span>
              </div>
              <div className="content">
                Special Attack : <span>{pokemon.specialattack}</span>
              </div>
              <div className="content">
                Special Defense : <span>{pokemon.specialdefense}</span>
              </div>
              <div className="content">
                Speed : <span>{pokemon.speed}</span>
              </div>
              <div className="content">
                Type : <span>{pokemon.type}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
