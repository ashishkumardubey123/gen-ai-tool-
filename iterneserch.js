import { json } from "zod"
 

function multiplication (inputObject){
  const {userinput} = inputObject
  console.log(" multiplication tool calling ",)
  console.log("To deceive user inport ", userinput)
   const result = userinput * userinput
   return `The multiplication result is ${result}`
} 

export async function internetSearch(inputObject) {

  const { query } = inputObject;

  console.log("internetSearch tool call")

  try {
  
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: process.env.TAVILY_API_KEY, //
        query: query,
        include_answer: true,
        max_results: 3
      })
    });

    const data = await response.json();
 console.log("internet tool  able to serch the user query ")

    if (!data.results) {
      return "No results found or invalid API response.";
    }

  
    return JSON.stringify(data.results.map(r => ({ title: r.title, content: r.content })));
  } catch (error) {
    console.error("Search Error:", error);
    return "Search failed due to an error.";
  }
}




export default multiplication