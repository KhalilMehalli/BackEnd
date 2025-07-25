const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

GIST_ID ="dac469781da9a97fab4cb1875f8c6a1a"

const FILENAME = "history.txt";
const MAX_HISTORY       = 500;       // Only 500 messages for the history 

// Read all the content of the file
async function _readAll() {
  const { data } = await octokit.gists.get({ gist_id: GIST_ID });
  console.log(data.files[FILENAME].content)
  return data.files[FILENAME].content || "";
}

// write back all the content of the file in github
async function _writeAll(content) {
  await octokit.gists.update({
    gist_id: GIST_ID,
    files: { [FILENAME]: { content } }
  });
}

// Buffer in memory to store the message recently send message
let lines  = []; 
let buffer = [];  

// Initialisation, get the content of the database and store than in memory, 
async function init() {
    const text = await _readAll();
    lines = text.trim().split("\n").filter(Boolean).map(l => {
        try { return JSON.parse(l); }
        catch { return null; }
      }).filter(Boolean);
}

init();

// Return the count last messages 
async function loadLast(count = 20) {
  const combined = lines.concat(buffer);
  return combined.slice(-count);
}

// Add message to the buffer when a user send it 
function append(msg) {
  buffer.push(msg);
}


async function flush() {
  if (buffer.length === 0) return;
  
  lines = lines.concat(buffer);

  if (lines.length > MAX_HISTORY) {
    lines = lines.slice(-MAX_HISTORY);
  }

  const next = lines.map(m => JSON.stringify(m)).join("\n") + "\n";

  await _writeAll(next);

  buffer = [];
}

// Schedule 
setInterval(() => {
  flush()
}, 60 * 1000);


module.exports = { loadLast, append };