
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const file = path.join(__dirname, "visits.json");

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

function readVisits() {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

app.get("/api/visits", (req, res) => {
  res.json({ count: readVisits().length });
});

app.get("/api/visit", (req, res) => {
  const visits = readVisits();
  const ip = req.socket.remoteAddress;

  visits.push({
    ip,
    time: new Date().toISOString()
  });

  fs.writeFileSync(file, JSON.stringify(visits, null, 2));
  res.json({ success: true });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server gestart op poort ${PORT}`);
});
