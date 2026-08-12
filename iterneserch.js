import { json } from "zod"
 

function multiplication (inputObject){
  const {userinput} = inputObject
  console.log("To deceive user inport ", userinput)
   const result = userinput * userinput
   return `The multiplication result is ${result}`
} 

export async function internetSearch(inputObject) {
  // 1. ऑब्जेक्ट में से 'query' को बाहर निकालें
  const { query } = inputObject;

  try {
    // 2. सही API एंडपॉइंट का इस्तेमाल करें
    const response = await fetch('https://tavily.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: process.env.TAVILY_API_KEY, // 3. 'apiKey' लिखें, न कि api_key
        query: query,
        include_answer: true,
        max_results: 3
      })
    });

    const data = await response.json();

    // सुरक्षा के लिए चेक करें कि रिजल्ट्स मिले या नहीं
    if (!data.results) {
      return "No results found or invalid API response.";
    }
 console.log(data.results)
    // सर्च रिजल्ट्स को स्ट्रिंग में बदल कर वापस भेजें
    return JSON.stringify(data.results.map(r => ({ title: r.title, content: r.content })));
  } catch (error) {
    console.error("Search Error:", error);
    return "Search failed due to an error.";
  }
}




export default multiplication