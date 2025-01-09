import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL·E ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Ensure the prompt exists
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Generate image from the prompt
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,  // Number of images to generate
      size: '1024x1024',  // Image size
      response_format: 'url',  // Response format as URL (optional: 'b64_json')
    });

    // Get the image URL from the response
    const imageUrl = response.data.data[0].url;

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

export default router;
