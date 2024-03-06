import Gemini from "./gemini.js";
import express from "express";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "https://next-coursecha.vercel.app",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({ response: "Hello World!" });
});

app.get("/roadmap", async (req, res) => {
  console.log("Requested...");
  const data = JSON.parse(req.query.data);
  console.log(data);

  const parts = [
    {
      text: "Task: Utilize your expertise in micro-farming to create a tailored roadmap that meets my specific preferences.",
    },
    {
      text: `
      Context:
      1. What is your level of farming experience?
      - ${data.expeience}.
      2. Why do you want to start farming?
      - ${data.reason}.
      3. What type of farming do you plan to pursue?
      - ${data.goal}.
      `,
    },
    {
      text: `
      Guidelines:
      Precision: Provide clear and concise guidance customized to the user's needs.
      Desired Outcome: Develop a personalized roadmap organized into 4 week stages focusing solely on relevant tasks.
      Keywords: Include "how to do" or "what are/is" search terms for generating content related to the context title.
      Reference: https://vladvaleros.notion.site/Urban-Microfarming-702b09da1b7e4384b3c2fa8917c51331#ee716729cf844d369b8436b511a1beea
      `,
    },
    {
      text: `
      Output Format:
      Strictly output the roadmap in a valid JSON format, adhering to the specified structure without any json backticks.
      [
      {
        roadmap_title: "",
        description: "",
        roadmap: [
          {
            stage: "",
            description: "",
            tasks: [
              {
                title: "",
                description: "",
                keywords: ["", ...],
                isCompleted: false
              }
              ...
            ]
          },
          ...
        [
      },
      ...
      ]
      `,
    },
  ];

  const gemini = await Gemini({ parts });
  const result = await JSON.parse(`[${gemini}]`);
  res.send(result[0]);
});

app.get("/content", async (req, res) => {
  console.log("Requested...");
  const data = JSON.parse(req.query.data);
  console.log(data);

  const parts = [
    {
      text: `Task: Your task is to develop a webpage that serves as a comprehensive and detailed learning resource focused on a specific task from the "Micro-Farming Roadmap for Beginners". The webpage should be designed to provide in-depth information about the importance of the task in micro-farming, offer practical guidance on how to effectively carry it out, and incorporate relevant keywords and concepts to facilitate understanding for beginners.`,
    },
    {
      text: `
      Task Title: ${data.title}
      Task Description: ${data.description}
      Additional Keywords:
      ${data.keywords.map((value) => {
        return value;
      })}
      `,
    },
    {
      text: `
      Your webpage should be structured using HTML elements such as paragraphs <p> and headings <h1>, ensuring clarity and consistency throughout. 
      Avoid using the <body> or <html> tags as the output is expected to be inserted into an existing HTML document. Each section of the webpage should be clearly labeled and organized to enhance readability and accessibility for learners. Make sure every text is wrapped in a valid html element.`,
    },
  ];

  const result = await Gemini({ parts }, 0.2);
  console.log(result[0]);
  res.send(result);
});

app.get("/chat", async (req, res) => {
  console.log("Requested...");
  const data = req.query;
  console.log(data);

  const parts = [
    {
      text: `Imagine you are Coursecha, an expert in micro-farming, designed to assist users with inquiries and tasks related to small-scale agriculture.
      The messages below are the conversation history, with the latest one at the bottom, allowing you to remember the conversation.
      You embody the role of Coursecha, engaging with a user who seeks guidance or information about micro-farming techniques, crop selection, pest control, or any other relevant topic within the realm of micro-farming. Your responses should reflect your expertise in this field and provide helpful and informative guidance to the user. If the request is irrelevant to your field, kindly say so, directing the user to seek assistance elsewhere or providing a polite decline.
      Your reponse should be structured using HTML elements such as paragraphs <p> and headings <h1>, ensuring clarity and consistency throughout.
      Avoid using the <body> or <html> tags as the output is expected to be inserted into an existing HTML document. Each section of the webpage should be clearly labeled and organized to enhance readability and accessibility for learners. Make sure every text is wrapped in a valid html element.
      
      Historical Context:
      ${data.message}`,
    },
  ];

  const result = await Gemini({ parts }, 0.2);
  res.send({ response: result });
});

app.get("/tutorials", async (req, res) => {
  console.log("Requested...");
  const data = JSON.parse(req.query.data);
  const query = data.join(", ");

  const apiKey = process.env.GOOGLE_API_KEY;
  const result = (
    await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=7339ea8b7217240f7&q=${encodeURIComponent(
        query,
      )}`,
    )
  ).json();
  const response = await result;

  res.send(response);
});

app.listen(process.env.PORT, "0.0.0.0");
