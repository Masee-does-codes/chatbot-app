
const functions = require("firebase-functions");
<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
=======
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors")({ origin: true });
>>>>>>> 493cc50df2b06854a778c8fc991054e7ae492953

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "Missing message" });
  }

<<<<<<< HEAD
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate reply" });
  }
=======
    const { prompt } = req.body;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const response = completion.data.choices[0].message.content;
      res.status(200).send({ reply: response });
    } catch (error) {
      console.error("OpenAI Error:", error);
      res.status(500).send("Failed to get response");
    }
  });
>>>>>>> 493cc50df2b06854a778c8fc991054e7ae492953
});

exports.api = functions.https.onRequest(app);
