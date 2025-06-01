const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});

exports.chat = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { prompt } = req.body;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const botReply = completion.data.choices[0].message.content;
      res.status(200).send({ reply: botReply });
    } catch (error) {
      console.error("OpenAI error:", error);
      res.status(500).send({ reply: "Sorry, I had an error." });
    }
  });
});
