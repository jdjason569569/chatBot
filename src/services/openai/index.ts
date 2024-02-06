import OpenAI from "openai";
import "dotenv/config"
import { ChatCompletionMessageParam } from "openai/resources";
import { generatePrompt } from "./prompt";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 
 * @param name persona con la que voy a hablar
 * @param history 
 */
const run = async (name: string, history: ChatCompletionMessageParam[]): Promise<string> => {

    const promtp = generatePrompt(name)
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",  // debe actuar como sistema
                "content": promtp  // llamamos al promtp pasandole el nombre del usuario
            },
            ...history
        ],
        temperature: 1,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.choices[0].message.content
}

export { run }


