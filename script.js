
const API = "https://ip-schoolproject.onrender.com";

async function registerVisit() {
  try {
    await fetch(`${API}/api/visit`);
  } catch (error) {
    console.error("Registreren mislukt:", error);
  }
}

async function loadVisits() {
  try {
    const response = await fetch(`${API}/api/visits`);

    if (!response.ok) {
      throw new Error("API niet beschikbaar");
    }

    const data = await response.json();

    document.getElementById("count").textContent =
      data.count;
  } catch (error) {
    document.getElementById("count").textContent =
      "Niet beschikbaar";
    console.error(error);
  }
}

async function start() {
  await registerVisit();
  await loadVisits();
}

start();
