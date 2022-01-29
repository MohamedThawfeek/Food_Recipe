import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import axios from "axios";
import Items from "../Items/Items";

const Card = ({ item: { id, title, image } }) => {
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [recipeReady, setRecipeReady] = useState("");
  const [images, setImages] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const info = async () => {
      try {
        const apiKey = process.env.REACT_APP_FOOD_API;
        const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${apiKey}`;
        const result = await axios.get(url);
        const data = await result.data.spoonacularSourceUrl;
        const detail = await result.data.servings;
        const time = await result.data.readyInMinutes;
        const image = await result.data.image;
        const itemData = await result.data.extendedIngredients;

        setSummary(data);
        setDetails(detail);
        setRecipeReady(time);
        setImages(image);
        setIngredients(itemData);
      } catch (error) {
        alert(
          "Daily fetching data limit finished Please try againg Tomorrow. "
        );
      }
    };
    info();
  }, [id]);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.imgBx}>
          <a href={images} target="_blank" rel="noreferrer" type="submit">
            <img src={image} alt="" />
          </a>
        </div>
        <div className={style.content}>
          <div className={style.details}>
            <h2>{title}</h2>
            <p>preparation time: {recipeReady} minutes </p>
            <p>Number of serving: {details} </p>
            <a
              type="submit"
              href={summary}
              className={style.url}
              target="_blank"
              rel="noreferrer"
            >
              <button>Go to Recipe</button>
            </a>
            <div className={style.cards}>
              <h4>Ingredients</h4>

              <div className={style.card_content}>
                <strong>Name</strong>
                <strong>Item</strong>
              </div>
              {ingredients.map((items, index) => (
                <Items key={index} items={items} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
