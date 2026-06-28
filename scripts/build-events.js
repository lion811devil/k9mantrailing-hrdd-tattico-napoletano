const fs = require("fs");
const path = require("path");

const eventsDir = path.join(__dirname, "..", "content", "events");
const outputFile = path.join(__dirname, "..", "content", "events-index.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function buildEventsIndex() {
  if (!fs.existsSync(eventsDir)) {
    fs.mkdirSync(eventsDir, { recursive: true });
  }

  const files = fs
    .readdirSync(eventsDir)
    .filter(file => file.endsWith(".json"));

  const events = files.map(file => {
    const fullPath = path.join(eventsDir, file);
    const data = readJson(fullPath);

    return {
      slug: file.replace(".json", ""),
      ...data
    };
  });

  events.sort((a, b) => {
    const dateA = new Date(a.date || "2100-01-01");
    const dateB = new Date(b.date || "2100-01-01");
    return dateA - dateB;
  });

  fs.writeFileSync(outputFile, JSON.stringify(events, null, 2), "utf8");

  console.log(`Creato events-index.json con ${events.length} evento/i.`);
}

buildEventsIndex();
