document.addEventListener("DOMContentLoaded", function () {
	const portfolioGrid = document.getElementById("portfolio-grid");

	fetch("assets/data/projects.json")
		.then((response) => {
			if (!response.ok) {
				console.error(
					"Failed to fetch projects.json:",
					response.status,
					response.statusText
				);
				throw new Error("Failed to fetch projects.json");
			}
			return response.json();
		})
		.then((projects) => {
			if (!projects || projects.length === 0) {
				console.error("No projects found in JSON file.");
				portfolioGrid.innerHTML = "<p>No projects available at the moment.</p>";
				return;
			}

			projects.forEach((project) => {
				console.log("Adding project:", project.name);

				// Create Project Card
				const projectCard = document.createElement("div");
				projectCard.classList.add("project-card");

				// Add Thumbnail
				const img = document.createElement("img");
				img.src = project.thumbnail || "assets/img/placeholder.png";
				img.alt = `${project.name || "Untitled"} Thumbnail`;
				projectCard.appendChild(img);

				// Add Project Title
				const title = document.createElement("h3");
				title.textContent = project.name || "Untitled Project";
				projectCard.appendChild(title);

				// Add Description
				const description = document.createElement("p");
				description.textContent =
					project.description || "No description available.";
				projectCard.appendChild(description);

				// Add Links
				const linksDiv = document.createElement("div");
				linksDiv.classList.add("links");

				if (project.pageLink) {
					const pageLink = document.createElement("a");
					pageLink.href = project.pageLink;
					pageLink.textContent = "View Project";
					pageLink.classList.add("btn");
					linksDiv.appendChild(pageLink);
				}

				if (project.githubLink) {
					const githubLink = document.createElement("a");
					githubLink.href = project.githubLink;
					githubLink.textContent = "GitHub";
					githubLink.classList.add("btn");
					linksDiv.appendChild(githubLink);
				}

				projectCard.appendChild(linksDiv);

				// Append Project Card to Grid
				portfolioGrid.appendChild(projectCard);
			});
		})
		.catch((error) => {
			console.error("Error loading projects:", error);
			portfolioGrid.innerHTML =
				"<p class='error'>Failed to load projects. Please try again later.</p>";
		});
});
