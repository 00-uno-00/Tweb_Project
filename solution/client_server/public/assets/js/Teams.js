
/**
 * This function is called when the page is loaded. It fetches the top 15 teams from the server and displays them in a table.
 * Each row in the table represents a team, including their position, name, and score (number of goals).
 * The table is dynamically created with rows for each team. Clicking on a row redirects the user to a detailed view of the specific team.
 * In case of an error during fetching, an error message is logged to the console.
 */

async function getTeams() {
    const response = await axios.get('/Teams/top15Teams');
    if (response.status === 200) {
        const teams = response.data;
        if (teams) {
            const table = document.getElementById('teams_table');

            table.innerHTML = '';
            for (let i = 0; i < 15; i++) {
                const teamName = teams[i].name;
                const teamScore = teams[i].score;

                const row = document.createElement('tr');

                const positionCell = document.createElement('td');
                positionCell.textContent = i + 1;
                row.appendChild(positionCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = teamName;
                row.appendChild(nameCell);

                const goalsCell = document.createElement('td');
                goalsCell.textContent = teamScore; // Team's number of goals
                row.appendChild(goalsCell);

                const href = `/Team/${teams[i].id}`;
                row.addEventListener('click', () => {
                    window.location.href = href;
                });
                row.style.cursor = 'pointer';

                table.appendChild(row);
            }
        }
    } else {
        console.error('There was an error fetching the top 15 teams!');
    }
}