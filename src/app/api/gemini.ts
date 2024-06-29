import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY: string | undefined = process.env.GEMINI_KEY;

if (!API_KEY) {
  throw new Error("The GEMINI_KEY environment variable is not set.");
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

function getTodaysDateFormatted(): string {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const dd = String(today.getDate()).padStart(2, "0");
  const yy = today.getFullYear().toString().substr(-2);
  return `${mm}/${dd}/${yy}`;
}

export async function predictTime(task: FormDataEntryValue | null) {
  const date = getTodaysDateFormatted();
  try {
    const response = await chat.sendMessage(
      `I am going to tell you the name of a task that I have to do, which may include the due date and due time. Based on the task, you will predict and tell me how many minutes it will take to complete this task. You will also tell me the name of the task, the exact date it is due, and the exact time it is due (in 24hr time). Give the information in this format: name, mm/dd/yy, hh:mm, minutes taken to complete the task. The task is: ${task}. Today's date is ${date}.Please give this all in a comma separated list with no spaces`,
    );
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
