import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search/Search";
import style from "./App.module.css";
import Card from "./components/Card/Card";

const App = () => {
  const [query, setQuery] = useState();
  const [recipe, setRecipe] = useState([]);

  const apiKey = process.env.REACT_APP_FOOD_API;
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=100&apiKey=${apiKey}`;
  const recipes = async () => {
    try {
      if (query.trim() !== "") {
        const response = await axios.get(url);
        if (!response.data.results[0]) {
          return alert("No food with such name");
        }
        setRecipe(response.data.results);
      } else {
        alert("Please fill the form");
      }
    } catch (error) {
      alert("Daily fetching data limit finished Please try againg Tomorrow. ");
    }
  };

  return (
    <div className={style.container}>
      <h1>Recipe App</h1>
      <Search setQuery={setQuery} recipes={recipes} />
      <div className={style.card}>
        {recipe.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
