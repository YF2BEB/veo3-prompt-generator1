import PromptGenerator from "./PromptGenerator";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <header className="bg-orange-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Logo_ORARI.png" alt="ORARI" className="h-8 w-auto" />
          <h1 className="text-lg font-bold">VEO3 Prompt Generator</h1>
        </div>
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="bg-white text-orange-600 px-2 py-1 rounded text-sm"
        >
          🌙 Dark Mode
        </button>
      </header>
      <main className="p-6">
        <PromptGenerator />
      </main>
    </div>
  );
}