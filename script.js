document.addEventListener('DOMContentLoaded', () => {
  const words = [];
  let currentWordIndex = -1;

  async function fetchWordMeaning(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    if (data.length > 0) {
      const definition = data[0].meanings[0].definitions[0].definition;
      return definition;
    }
    return `No definition found for "${word}"`;
  }

  function showRandomWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    document.getElementById('flashcard-word').textContent = words[currentWordIndex];
    document.getElementById('flashcard-meaning').style.display = 'none';
  }

  async function showMeaning() {
    const word = words[currentWordIndex];
    const meaning = await fetchWordMeaning(word);
    document.getElementById('flashcard-meaning').textContent = `${word}: ${meaning}`;
    document.getElementById('flashcard-meaning').style.display = 'block';
  }

  document.getElementById('next-word-btn').addEventListener('click', showRandomWord);
  document.getElementById('show-meaning-btn').addEventListener('click', showMeaning);
  document.getElementById('start-btn').addEventListener('click', () => {
    words.splice(0, words.length, ...document.getElementById('words-input').value.split(',').map(word => word.trim()));
    if (words.length > 0) {
      document.getElementById('flashcard-input').style.display = 'none';
      showRandomWord();
    }
  });
});
