const MOCK_API_URL = "https://6afad817730c1d152f329a32.mockapi.io/cinetrack";
const DATA_URL = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/db.json";

async function importData() {
  try {
    const res = await fetch(DATA_URL);
    const items = await res.json();

    for (const item of items) {
      const { id, ...data } = item;
      const response = await fetch(MOCK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erreur sur " + item.title);
      console.log("Ajouté :", item.title);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    console.log("Import terminé :", items.length, "titres");
  } catch (error) {
    console.error(error.message);
  }
}

importData();