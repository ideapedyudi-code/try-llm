import { pipeline } from "@xenova/transformers";

const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L12-v2"
);

const sentence = "muhammad wahyudi susanto";
const candidates = [
    "muhammad/wahyudi"
];


const queryEmbedding = await extractor(sentence, { pooling: "mean", normalize: true });
console.log(queryEmbedding)
const candidateEmbeddings = await Promise.all(
    candidates.map(c => extractor(c, { pooling: "mean", normalize: true }))
);

function cosineSim(a, b) {
    let dot = 0.0, na = 0.0, nb = 0.0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

candidates.forEach((c, i) => {
    const score = cosineSim(queryEmbedding.data, candidateEmbeddings[i].data);
    console.log(`${c} → score: ${score.toFixed(4)}`);
});