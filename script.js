async function loadVisits() {
  try {
    const response = await fetch("/api/visits");
    const data = await response.json();

    document.getElementById("count").textContent =
      data.count;
  } catch {
    document.getElementById("count").textContent =
      "Niet beschikbaar";
  }
}

loadVisits();
fetch("/api/visit");