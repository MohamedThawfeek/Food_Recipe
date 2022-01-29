import React from "react";
import style from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ setQuery, recipes }) => {
  const functionCall = () => {
    recipes();
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Food Search"
        onChange={(e) => setQuery(e.target.value)}
        className={style.input}
      />
      <button onClick={functionCall} type="submit" className={style.btn}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
