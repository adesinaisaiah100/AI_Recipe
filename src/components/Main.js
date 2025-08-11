import React from "react";
import { getRecipeFromGroq } from "../ai";

import { marked } from "marked";
// import run from "./ai2"
// import generate_from_text_input from "./ai2"


export default function Main() {
  const [input, setInput] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, generateRecipe] = React.useState("");
  const recipeRef = React.useRef(null);


const handleSubmit = (e =>  {
    e.preventDefault();
setInput(e.target.value)
  })

  const handleAdd = (e => {
    e.preventDefault();
   if(input !== ""){
    setIngredients([...ingredients, input.trim()])
    setInput("")
   }
  });


  
  const handleGneratedRecipe = async () => {
    const generatedRecipe = await getRecipeFromGroq(ingredients);
    generateRecipe(generatedRecipe);
    console.log(generatedRecipe);
    // Scroll to recipe area after generation
    setTimeout(() => {
      if (recipeRef.current) {
        recipeRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

 const hasIngredients= ingredients.length > 0

  // Handler to clear ingredients and recipe
  const handleClearAll = () => {
    setIngredients([]);
    generateRecipe("");
    setInput("");
  };

  return (
    <main>
      <form className="main_form">
        <input type="text" placeholder="e.g onions" value={input} className="main_ipt" onChange={handleSubmit} />
        <button type="submit" className="main_btn" onClick={handleAdd}>Add Ingredient</button>
        
        { recipe &&
          <button type="button" className="clear_btn" style={{ marginLeft: 10, fontSize: 15, fontWeight: "bold", backgroundColor: "#27ae60", display: "flex" }} onClick={handleClearAll} title="Start Over">New Recipe
        </button>}
      </form>
      <section className="main_section">
        <ul className="main_ul">
          {hasIngredients && <h2 className="text-xl text-left">List of ingredients</h2>}
          {ingredients.map((items, index) => (
            <li className="main_li" key={index}>{items}</li>
          ))}
        </ul>
        {hasIngredients && (
          <div className="gen_container">
            <div className="gen_subcon2">
              <button className="gen_subbtn" onClick={handleGneratedRecipe}>Generate recipe</button>
            </div>
          </div>
        )}
        {recipe && (
          <div className="gen_Recipe" ref={recipeRef}>
            <div
              className="recipe-card"
              dangerouslySetInnerHTML={{ __html: marked(recipe) }}
            />
          </div>
        )}
      </section>
    </main>
  );
}