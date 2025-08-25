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


  const handleSubmit = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (input !== "") {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };


  
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
    <main  className=" min-h-screen w-full main_section bg-black flex items-start justify-center p-6">
      <div className="w-full max-w-6xl  rounded-xl overflow-hidden">
        <div className="backdrop-overlay p-5">
          <header className="mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">Chef's Assistant</h1>
            <p className="mt-2 text-white/90">Tell me what you have and I'll suggest a recipe.</p>
          </header>

          <form className="flex gap-3 items-center mb-6" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="e.g. onions"
              value={input}
              className="flex-1 px-4 py-3 rounded-2xl shadow-sm bg-white/90 placeholder-gray-500"
              onChange={handleSubmit}
            />
            <button type="button" className="px-5 py-3 rounded-2xl bg-white text-black font-medium shadow" onClick={handleAdd}>Add</button>
            <button type="button" className="w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold text-2xl" onClick={handleClearAll} title="Start Over">+</button>
          </form>

          <section className="flex flex-row gap-6 justify-between w-full">
            <aside className="bg-white/10 p-4 rounded-lg text-white w-1/3">
              {hasIngredients ? <h2 className="text-lg font-semibold mb-3">Ingredients</h2> : <h2 className="text-lg font-semibold mb-3 text-white/70">No ingredients yet</h2>}
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="px-3 py-2 bg-white/5 rounded">{item}</li>
                ))}
              </ul>
            </aside>

            <div className="h-full flex flex-1 flex-col w-1/2">
              <div className="mb-4">
                {hasIngredients && (
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-md" onClick={handleGneratedRecipe}>Generate recipe</button>
                )}
              </div>

              {recipe ? (
                <article className="bg-white p-6 rounded-lg shadow overflow-scroll h-96 max-w-full">
                  <div dangerouslySetInnerHTML={{ __html: marked(recipe) }} />
                </article>
              ) : (
                <div className="text-white/80">Recipes will appear here after generation.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}