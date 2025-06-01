const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");
const cors = require("cors")({origin: true});

const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

exports.chat = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {prompt} = req.body;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      });
      const response = completion.data.choices[0].message.content;
      res.status(200).send({reply: response});
    } catch (error) {
      console.error("OpenAI Error:", error);
      res.status(500).send("Failed to get response");
    }
  });
});
