import { useState } from "react";

export default function PromptGenerator() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    dialogue: "",
    mainCharacter: "",
    background: "",
    visuals: "",
    camera: "",
    mood: "",
    lighting: "",
    monitor: "",
    audio: "",
    voiceLanguage: "",
    voiceStyle: "",
    transition: ""
  });

  const [output, setOutput] = useState("");

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

**[CHARACTER DETAILS]:**
${form.mainCharacter}

**[BACKGROUND SETTING]:**
${form.background}

**[VISUAL STYLE]:**
${form.visuals}

**[CAMERA & MOVEMENT]:**
${form.camera}

**[MOOD & ATMOSPHERE]:**
${form.mood}

**[LIGHTING & COLORS]:**
${form.lighting}

**[MONITOR DISPLAY]:**
${form.monitor}

**[AUDIO BACKGROUND]:**
${form.audio}

**[VOICE LANGUAGE]:**
${form.voiceLanguage}

**[VOICE STYLE]:**
${form.voiceStyle}

**[TRANSITION EFFECT]:**
${form.transition}
    `;
    setOutput(prompt.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Prompt copied to clipboard!");
  };

  const exportToTxt = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "veo3_prompt.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, val]) => (
          <div key={key}>
            <label className="block font-semibold mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <textarea
              name={key}
              value={val}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm text-gray-800"
              rows={3}
            />
          </div>
        ))}
      </div>
      <button
        onClick={generatePrompt}
        className="mt-6 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        🎬 Generate Prompt
      </button>

      {output && (
        <div className="mt-6">
          <div className="flex gap-2 mb-2">
            <button onClick={copyToClipboard} className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">📋 Copy</button>
            <button onClick={exportToTxt} className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">💾 Export .txt</button>
          </div>
          <pre className="bg-white dark:bg-gray-800 text-sm p-4 rounded whitespace-pre-wrap border">{output}</pre>
        </div>
      )}
    </div>
  );
}