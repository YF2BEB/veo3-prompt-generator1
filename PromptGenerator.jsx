
import { useState } from 'react';

export default function PromptGenerator() {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    dialogue: '',
    visuals: '',
    camera: '',
    mood: '',
    lighting: '',
    monitor: '',
    audio: '',
    transition: ''
  });
  const [output, setOutput] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePrompt = () => {
    const prompt = `
**Prompt Title:** ${form.title}

**[SCENE OVERVIEW]:**
${form.subject}

**[DIALOGUE]:**
${form.dialogue}

**[VISUALS]:**
${form.visuals}

**[CAMERA & MOVEMENT]:**
${form.camera}

**[MOOD & ATMOSPHERE]:**
${form.mood}

**[LIGHTING & COLORS]:**
${form.lighting}

**[MONITOR DISPLAY]:**
${form.monitor}

**[AUDIO & BACKGROUND FX]:**
${form.audio}

**[TRANSITION]:**
${form.transition}
    `;
    setOutput(prompt.trim());
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 VEO 3 Prompt Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block font-semibold mb-1">{key}</label>
            <textarea
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        ))}
      </div>
      <button
        onClick={generatePrompt}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate Prompt
      </button>
      {output && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">📝 Generated Prompt</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
