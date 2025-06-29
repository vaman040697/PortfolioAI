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

/* ai_glitch.js ─────────────────────────────────────────
   Requires in HTML:
   <p id="aiAvatar" class="ai-orb">✦</p>
   <div id="aiBubble" class="ai-bubble">
     <div id="chatLog"></div>
     <textarea id="aiInput" placeholder="Type a message…" rows="2"></textarea>
     <button id="sendBtn">➤</button>
   </div>
──────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const chatLog = document.getElementById('chatLog');
  const input = document.getElementById('aiInput');
  const sendBtn = document.getElementById('sendBtn');

  function startThinking() {
    // Optional: Add a typing animation here later
  }

  function stopThinking() {
    // Optional: Remove typing animation here later
  }

  function addMessage(text, sender = 'ai') {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-msg' : 'ai-msg';
    msg.textContent = text;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  async function nicoReply(prompt) {
    const response = await fetch("https://4666-2401-4900-8811-b9e5-61e6-a084-a3c1-b3.ngrok-free.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: 'nico',
        message: prompt,
        stream: false
      })
    });

    const data = await response.json();
    return data.reply?.trim() || "(No reply)";
  }

  async function handleMessageSend() {
    const prompt = input.value.trim();
    if (!prompt) return;

    addMessage(prompt, 'user');
    input.value = '';

    // Textarea reset flicker fix
    input.innerText = '';
    input.textContent = '';
    input.style.height = '60px';
    setTimeout(() => {
      input.style.display = 'none';
      input.offsetHeight;
      input.style.display = 'block';
    }, 10);

    startThinking();

    let reply = '';
    try {
      reply = await nicoReply(prompt);
    } catch (err) {
      reply = "⚠️ Error reaching F.R.A.Y backend.";
      console.error(err);
    }

    addMessage(reply, 'ai');
    stopThinking();
  }

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await handleMessageSend();
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      await handleMessageSend();
    });
  }
});


