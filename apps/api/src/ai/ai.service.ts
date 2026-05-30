import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class AiService {
    private openai: OpenAI;

    constructor(private configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY"),
        });
    }

    async askDocument(content: string, question: string) {
        const response = await this.openai.chat.completions.create({
            model: "gpt-5.4-mini",
            messages: [
                {
                    role: "system",
                    content: "Answer questions using the provided document.",
                },
                {
                    role: "user",
                    content: `
                        DOCUMENT:
                        ${content.slice(0, 15000)}

                        QUESTION:
                        ${question}
                    `,
                },
            ],
        });

        return response.choices[0].message.content;
    }
}
