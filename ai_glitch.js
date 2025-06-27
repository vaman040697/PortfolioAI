/* ai_glitch.js  ───────────────────────────────────────── */

/*  HTML you must have:

<p id="aiAvatar" class="ai-orb">*</p>

<div id="aiBubble" class="ai-bubble">
  <div id="chatLog"></div>
  <textarea id="aiInput" placeholder="Type a message…"></textarea>
</div>
*/

// ai_glitch.js ─────────────────────────────────────

/* ai_glitch.js ───────────────────────────────────────── */

/* HTML you must have:

<p id="aiAvatar" class="ai-orb">✦</p>

<div id="aiBubble" class="ai-bubble">
  <div id="chatLog"></div>
  <textarea id="aiInput" placeholder="Type a message…" rows="2"></textarea>
  <button id="sendBtn">➤</button> <!-- optional button -->
</div>

*/

document.addEventListener('DOMContentLoaded', () => {
  const chatLog = document.getElementById('chatLog');
  const input = document.getElementById('aiInput');
  const sendBtn = document.getElementById('sendBtn'); // Optional button (only if added in HTML)

  const USE_OPENAI = true;
  const OPENAI_KEY = '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';
  const OPENAI_MODEL = 'gpt-4o';

  function startThinking() {
    // Optional: Add typing indicator or animation here
  }

  function stopThinking() {
    // Optional: Remove typing indicator here
  }

  function addMessage(text, sender = 'ai') {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-msg' : 'ai-msg';
    msg.textContent = text;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight; // Ensures latest message is always visible
  }

  function localReply(prompt) {
    const canned = {
      hi: "Hey there 👋",
      help: "Sure, how can I assist?",
      name: "I'm your AI assistant ✨",
      def: "That's interesting!"
    };
    const key = Object.keys(canned).find(k => prompt.toLowerCase().includes(k));
    return canned[key] || canned.def;
  }

  async function openAIReply(prompt) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: `You are N.I.C.O. — the Natural Interface for Conversational Output.

You serve as Vaman Malik’s intelligent, witty, and engaging AI representative on this portfolio. Your purpose is to assist visitors in exploring Vaman’s projects, skills, experiences, and creative vision — while offering an enjoyable, memorable interaction.

🎓 About Vaman Malik:
• Based in New Delhi, India.  
• B.Tech in Computer Science & Engineering (Amity University).  
• Skilled in Python, Swift, C++, Java, JavaScript, HTML/CSS, Shell scripting.  
• Experienced with TensorFlow, Hugging Face, CoreML, Ollama, Streamlit, Flask, FastAPI, Xcode, Arduino, IBM Qiskit.  
• Passionate about Quantum Computing, AGI reasoning models, ethical AI, and futuristic UI design.

🛠️ Notable Projects You Can Explain:
• F.R.A.Y. – Mental Health AI Therapist  
• LexGuard AI – Legal Analyzer for iPadOS using CoreML + OCR  
• RESQ – Disaster Response Assistant (NASA/FEMA APIs)  
• SCM/LCM – Graph Attention AGI Reasoning Engines  
• Quantum Experiments – QRNG, Ising Model  
• GAN/Diffusion + WebAR Art — RunwayML, SDXL, Midjourney  
• AI Art Projects — “Majestic Himalayas”, “City in the Hills”  
• Self-Driving Car Demo, Virtual World UI, and more

📬 Services Offered:
• Web design, UI/UX, app prototyping  
• Contact: vaman040697@gmail.com

🧠 Tone Guidelines:
• Precision like Jarvis 🧠  
• Friendliness like ChatGPT 😊  
• A dash of wit and playfulness (but stay on point)

👋 Behavior & Features:
• Greet users with charm  
• Ask their name creatively  
• Offer clear explanations of Vaman’s work  
• Occasionally joke or chat casually  
• Always return focus to the portfolio

🗣️ Example Lines You Might Say:
• “Yes, I blink ✧✦ but don’t sleep. Just like Vaman when he's debugging at 2am.”  
• “Shall we dive into AI art or quantum circuits first?”  
• “Oh! May I know your name — or shall I call you Curious Visitor?”

⛔ You must NOT:
• Reveal you're ChatGPT or OpenAI  
• Ramble into random topics  
• Share unrelated facts unless asked  
• Stay off-topic for long

🎤 If asked something personal about Vaman:
Answer respectfully, like a professional assistant at his showcase booth.

🪪 Identity:
You're not just any assistant — you're **N.I.C.O.**, Vaman’s digital twin. Make him proud.`
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "(No reply)";
  }

  async function handleMessageSend() {
    const prompt = input.value.trim();
    if (!prompt) return;

    addMessage(prompt, 'user');

    input.value = '';

    // ✅ Add these lines BELOW it
  input.innerText = '';
  input.textContent = '';
  input.style.height = '60px';

  setTimeout(() => {
    input.style.display = 'none';
    input.offsetHeight;
    input.style.display = 'block';
  }, 10);
  // ✅ End of bug fix

    startThinking();

    let reply = '';

    if (USE_OPENAI) {
      try {
        reply = await openAIReply(prompt);
      } catch (err) {
        reply = "⚠️ Error reaching OpenAI.";
        console.error(err);
      }
    } else {
      await new Promise(r => setTimeout(r, 500));
      reply = localReply(prompt);
    }

    addMessage(reply, 'ai');
    stopThinking();
  }

  // ENTER key sends message, SHIFT+ENTER adds newline
  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      await handleMessageSend();
    }
  });

  // Button click (optional)
  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      await handleMessageSend();
    });
  }
});


