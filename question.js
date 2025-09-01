import { pipeline } from "@xenova/transformers";

const generator = await pipeline(
    "text-generation",
    "Xenova/phi-1_5_dev"
);

const context = `
Sales data for July 2025:
Product A: 120 units sold, Revenue $2400, Rating 4.5/5
Product B: 80 units sold, Revenue $1600, Rating 4.0/5
Product C: 150 units sold, Revenue $3000, Rating 4.8/5
Product D: 90 units sold, Revenue $1800, Rating 3.9/5
Product E: 200 units sold, Revenue $5000, Rating 4.7/5
`;

const prompt1 = `${context}\nQuestion: What is the rating of Product B?.\nAnswer:`;

function extractAnswer(result) {
    const text = result[0].generated_text;
    const match = text.match(/Answer:\s*(.+?)(?:\n|$)/i);
    return match ? match[1].trim() : text.trim();
}

const result = await generator(prompt1, { max_new_tokens: 80 });

console.log("Answer: ", extractAnswer(result));
