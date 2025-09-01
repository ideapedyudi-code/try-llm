import { pipeline } from "@xenova/transformers";

const imageToText = await pipeline(
    "image-to-text",
    "Xenova/vit-gpt2-image-captioning"
);

const result = await imageToText(
    "https://i0.wp.com/langgam.id/wp-content/uploads/2021/11/Ilustrasi-buah-pisang.jpg"
);
console.log("Caption dari URL:", result[0].generated_text);
