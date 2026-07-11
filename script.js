const form = document.getElementById("dictionary-form");
const input = document.getElementById("wordInput");
const output = document.getElementById("output");
const message = document.getElementById("message");

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function fetchWordData(word) {
    try {
        output.innerHTML = "Loading...";
        message.textContent = "";

        const response = await fetch(`${API_URL}${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();

        const entry = data[0];
        const meaning = entry.meanings[0];
        const definition = meaning.definitions[0];

        output.innerHTML = `
            <h2>${entry.word}</h2>

            <p>
                <strong>Phonetic:</strong>
                ${entry.phonetic || "N/A"}
            </p>

            <p>
                <strong>Part of Speech:</strong>
                ${meaning.partOfSpeech}
            </p>

            <p>
                <strong>Meaning:</strong>
                ${definition.definition}
            </p>

            <p>
                <strong>Example:</strong>
                ${definition.example || "No example available"}
            </p>
        `;
    } catch (error) {
        output.innerHTML = "";
        message.textContent = "Word not found. Please try another word.";
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const word = input.value.trim();

    if (!word) {
        message.textContent = "Please enter a word.";
        return;
    }

    await fetchWordData(word);

    form.reset();
});
