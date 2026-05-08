import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeText(text: string) {
    const response = await openai.chat.completions.create({
        model: "gpt-5.4-mini",

        messages: [
            {
                role: "system",
                content: "You summarize documents clearly and concisely.",
            },

            {
                role: "user",
                content: `
Summarize this document:

${text.slice(0, 12000)}
`,
            },
        ],
    });

    return response.choices[0].message.content;
}
