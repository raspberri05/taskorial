import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY: string | undefined = process.env.GEMINI_KEY;

if (!API_KEY) {
  throw new Error('The GEMINI_KEY environment variable is not set.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: [],
});

export async function test() {
  try {
    const response = await chat.sendMessage("who are you");
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

export async function predictTime(task: FormDataEntryValue | null) {
  try {
    const response = await chat.sendMessage(
      `I am going to tell you the name of a task that I have to do. Based on the name of the task, you will tell me how many minutes it will take to complete this task: Your response should only have a number and nothing else. The task is: ${task}`
    );
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}