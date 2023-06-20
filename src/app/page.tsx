"use client"
import React from 'react';

interface Definition {
  word: string;
  definition: string;
  phonetic: string;
}

const Dictionary: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [definitions, setDefinitions] = React.useState<Definition[]>([]);

  const searchDefinitions = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      const data = await response.json();
      console.log(data);
      const word = data[0].word;
      const phonetic = data[0].phonetic
      const definitions = data[0].meanings.map(
        (meaning: any) => meaning.definitions[0].definition
      );
      const result: Definition[] = definitions.map((definition: string) => ({
        word,
        definition,
        phonetic
      }));
      setDefinitions(result);
    } catch (error) {
      console.error('Error fetching definitions:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 text-l ">
      <h1 className="text-4xl font-bold mb-4">Dictionary 📙</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter a word"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 text-black px-4 py-2 mr-4"
        />
        <button
          onClick={searchDefinitions}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      {definitions.length > 0 && (
        <div className="mt-2">
          <small className='text-violet-300 text-xl'>{definitions[0].phonetic}</small>
          <div className='mt-6 bg-gray-700 backdrop-blur-sm border-white border-2 rounded-xl p-4 max-w-full'>
            <h2 className="text-2xl font-bold  ">Definitions:</h2>
            <ul className="list-disc list-inside mt-2">
              {definitions.map((definition, index) => (
                <li key={index}>{definition.definition}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
