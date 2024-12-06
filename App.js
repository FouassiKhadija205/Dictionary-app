import React, { useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState(() => {
    const savedWords = localStorage.getItem("words");
    return savedWords ? JSON.parse(savedWords) : [];
  });

  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState("");

  const addWord = () => {
    if (!newWord.trim() || !newMeaning.trim() || !category.trim()) {
      setNotification("All fields are required to add a word.");
      return;
    }

    const wordEntry = { word: newWord, meaning: newMeaning, category };
    const updatedWords = [...words, wordEntry];
    setWords(updatedWords);
    localStorage.setItem("words", JSON.stringify(updatedWords));
    setNotification(`🌸 The word "${newWord}" has been added successfully!`);
    setNewWord("");
    setNewMeaning("");
    setCategory("");
    setTimeout(() => setNotification(""), 3000); // Clear notification
  };

  const deleteWord = (index) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${words[index].word}"? 🌸`
    );
    if (confirmDelete) {
      const updatedWords = words.filter((_, i) => i !== index);
      setWords(updatedWords);
      localStorage.setItem("words", JSON.stringify(updatedWords));
      setNotification(`🌺 The word "${words[index].word}" has been deleted.`);
      setTimeout(() => setNotification(""), 3000); // Clear notification
    }
  };

  const filteredWords = words.filter((word) => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? word.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-pink-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-6 animate-bounce">
          🌸 My Pretty Dictionary
        </h1>

        {/* Notifications */}
        {notification && (
          <div className="mb-4 p-4 bg-pink-200 text-pink-800 rounded border border-pink-300 shadow-sm">
            {notification}
          </div>
        )}

        {/* Formulaire d'ajout */}
        <div className="mb-6">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Meaning"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              className="p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Category (e.g., Flowers)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <button
            onClick={addWord}
            className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-400 text-white py-2 rounded-lg hover:opacity-90 transition duration-300"
          >
            💖 Add Word
          </button>
        </div>

        {/* Recherche et filtre */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for a word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {[...new Set(words.map((word) => word.category))].map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Liste des mots */}
        <div className="bg-pink-50 p-4 rounded shadow-inner">
          <h2 className="text-lg font-semibold text-pink-700 mb-4">🌺 Your Words</h2>
          {filteredWords.length > 0 ? (
            <ul className="space-y-4">
              {filteredWords.map((word, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded shadow border-l-4 border-pink-400"
                >
                  <div>
                    <strong className="text-pink-600">{word.word}</strong> - {word.meaning}{" "}
                    <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-600 text-sm rounded">
                      {word.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteWord(index)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    ❌ Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No words found. Add some! 🌼</p>
          )}
        </div>

        {/* Barre de progression */}
        <div className="mt-6">
          <p className="text-gray-600">
            Total Words: <strong>{words.length}</strong>
          </p>
          <div className="relative w-full bg-pink-200 h-4 rounded overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-500"
              style={{ width: `${(filteredWords.length / words.length) * 100 || 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
