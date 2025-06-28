import { useState } from "react";

const presetOptions = {
  mainCharacter: [
    "Male - Child (6 years)", "Male - Teen (15 years)", "Male - Adult (30 years)", "Male - Senior (65 years)",
    "Female - Child (6 years)", "Female - Teen (15 years)", "Female - Adult (30 years)", "Female - Senior (65 years)"
  ],
  camera: ["Close-up", "Medium shot", "Wide shot", "Over the shoulder", "Drone aerial"],
  mood: ["Calm", "Energetic", "Serious", "Warm", "Dramatic"],
  lighting: ["Natural", "Softbox", "Studio Light", "Low-key", "Cinematic"],
  monitor: ["Spectrum Display", "Waterfall Signal", "Black screen", "Noise FX", "Digital meter"],
  audio: ["Male Voice", "Female Voice"],
  voiceLanguage: ["English", "Indonesian", "Japanese", "Spanish", "Arabic"],
  voiceStyle: ["Professional", "Energetic", "Calm", "Announcer", "Narrative", "Friendly"],
  transition: ["Fade", "Zoom-in", "Cross dissolve", "Cut", "Swipe"],
  resolution: ["1080p", "4K", "Vertical", "Square", "YouTube Shorts"],
  environment: ["Indoor Studio", "Outdoor Park", "Urban City", "Desert", "Natural Forest"]
};

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
    transition: "",
    resolution: "",
    environment: "",
    image: null
  });

  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const generatePrompt = () => {
    const prompt = `
**Prompt Title:** ${form.title}

**[SCENE OVERVIEW]:**
${form.subject}

**[DIALOGUE]:**
${form.dialogue}

**[MAIN CHARACTER]:**
${form.mainCharacter}

**[BACKGROUND SETTING]:**
${form.background}

**[VISUAL STYLE]:**
${form.visuals}

**[CAMERA ANGLE]:**
${form.camera}

**[MOOD]:**
${form.mood}

**[LIGHTING]:**
${form.lighting}

**[MONITOR DISPLAY]:**
${form.monitor}

**[AUDIO VOICE]:**
${form.audio}

**[VOICE LANGUAGE]:**
${form.voiceLanguage}

**[VOICE STYLE]:**
${form.voiceStyle}

**[TRANSITION EFFECT]:**
${form.transition}

**[RESOLUTION FORMAT]:**
${form.resolution}

**[ENVIRONMENT]:**
${form.environment}

${
  form.image
    ? "**[VISUAL REFERENCE IMAGE]:** Refer to uploaded image for visual consistency in character, outfit, and background."
    : ""
}
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
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => {
          if (key === "image") {
            return (
              <div key={key}>
                <label className="block font-semibold mb-1">Upload Sample Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-white text-sm"
                />
              </div>
            );
          }

          const isDropdown = presetOptions[key];
          return (
            <div key={key}>
              <label className="block font-semibold mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              {isDropdown ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm text-gray-800"
                >
                  <option value="">-- Select --</option>
                  {presetOptions[key].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm text-gray-800"
                  rows={3}
                />
              )}
            </div>
          );
        })}
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
