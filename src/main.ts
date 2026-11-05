type Fundraiser = {
  id: number;
  title: string;
  description: string;
  goal_amount: string;
};

async function loadFundraisers(): Promise<void> {
  const container = document.querySelector<HTMLDivElement>("#fundraisers");

  if (!container) return;

  try {
    const response = await fetch("/api/test.php");

    if (!response.ok) {
      throw new Error("Ophalen mislukt");
    }

    const fundraisers: Fundraiser[] = await response.json();

    container.replaceChildren();

    for (const fundraiser of fundraisers) {
      const article = document.createElement("article");
      const title = document.createElement("h2");
      const description = document.createElement("p");
      const goal = document.createElement("p");

      title.textContent = fundraiser.title;
      description.textContent = fundraiser.description;
      goal.textContent = `Doelbedrag: €${fundraiser.goal_amount}`;

      article.append(title, description, goal);
      container.append(article);
    }
  } catch (error) {
    console.error(error);
    container.textContent = "De fundraisers konden niet worden geladen.";
  }
}

loadFundraisers();