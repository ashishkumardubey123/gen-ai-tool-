import dotenv from "dotenv";
import * as z from "zod";

import readline from "readline/promises";
import multiplication , {internetSearch} from "./iterneserch.js"
import { HumanMessage, createAgent, tool } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
dotenv.config();

const multiplicationtTool = tool(
     multiplication,
     {
      name:"multiplication",
      description :"User can multiply the number or value. ",
      schema:z.object({
        userinput: z.number().describe("Multiply the user input. ")
      })

     }
) 
const Internet_Search_Tool = tool(
     internetSearch,
     {
      name: "internet_search",
      description: "Use this tool to search for real-time information or current events on the internet.",
      schema: z.object({
        query: z.string().describe("The search query string to look up on the internet.")
      })
     }
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogleGenerativeAI({
model: "gemini-3.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,

  temperature: 0.7,
});

 const agent = createAgent({
  model,
  tools:[Internet_Search_Tool, multiplicationtTool]
 })


let  messages = [];

console.log(messages)


while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

  if (
    userInput.toLowerCase() === "exit" ||
    userInput.toLowerCase() === "quit"
  ) {
    break;
  }

  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({messages});

      messages = response.messages;

  const lastMessage = messages[messages.length - 1];


console.log(`\x1b[34m[AI]\x1b[0m ${lastMessage.content}`);}

rl.close();
