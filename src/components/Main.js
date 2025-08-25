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
    <main className="min-h-screen w-full main_section bg-black flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl mx-auto rounded-xl overflow-hidden">
        <div className="backdrop-overlay p-4 md:p-6">
          <header className="mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">Chef's Assistant</h1>
            <p className="mt-2 text-white/90">Tell me what you have and I'll suggest a recipe.</p>
          </header>

          <form className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="e.g. onions"
              value={input}
              className="flex-1 w-full px-4 py-3 rounded-2xl shadow-sm bg-white/90 placeholder-gray-500"
              onChange={handleSubmit}
            />
            <button type="button" className="px-5 py-3 rounded-2xl bg-white text-black font-medium shadow w-full sm:w-auto" onClick={handleAdd}>Add</button>
            <button type="button" className="w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold text-2xl self-start sm:self-auto" onClick={handleClearAll} title="Start Over">+</button>
          </form>

          <section className="flex flex-col md:flex-row gap-6 w-full items-start">
            <aside className="bg-white/10 p-4 rounded-lg text-white w-full md:w-1/3">
              {hasIngredients ? <h2 className="text-lg font-semibold mb-3">Ingredients</h2> : <h2 className="text-lg font-semibold mb-3 text-white/70">No ingredients yet</h2>}
              <ul className="space-y-2 max-h-48 overflow-auto">
                {ingredients.map((item, index) => (
                  <li key={index} className="px-3 py-2 bg-white/5 rounded">{item}</li>
                ))}
              </ul>
            </aside>

            <div className="flex-1 w-full md:w-2/3 flex flex-col h-auto">
              <div className="mb-4">
                {hasIngredients && (
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-md" onClick={handleGneratedRecipe}>Generate recipe</button>
                )}
              </div>

              {recipe ? (
                <article ref={recipeRef} className="bg-white p-6 rounded-lg shadow overflow-auto max-w-full max-h-[60vh] md:h-96">
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