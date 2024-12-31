import { useState } from 'react';

const Home = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ok-sturgeon-mohitkambli-4695cdb0.koyeb.app/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_url: originalURL,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setShortURL(data.short_url);
    } catch (error) {
      console.error('Error generating short URL:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-wide">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            URL Shortener
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="url"
            placeholder="Enter Original URL"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg"
          >
            Shorten URL
          </button>
        </form>
        {shortURL && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">Your Short URL:</p>
            <a
              href={shortURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-medium text-xl hover:underline hover:text-pink-500 transition-colors duration-300"
            >
              {shortURL}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
