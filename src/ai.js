import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe.
You don't need to use every ingredient, but avoid adding too many extra ones.
Format your recipe in markdown.
`;

const client = new OpenAI({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true 
});

export async function getRecipeFromGroq(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  
  try {
    const completion = await client.chat.completions.create({
      model: "llama3-70b-8192", 
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please suggest a recipe and also i would also need to know the timing, because i am a beginner cook and i would love if your response is a s detailed and accurate as possible.` }
      ],
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq API error:", error);
    return null;
  }
}
