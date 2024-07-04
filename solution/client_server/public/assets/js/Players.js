
/**
 * Populates the top 15 goalscorers in a table on the webpage.
 * This function asynchronously fetches the top 15 goal scorers from the server and displays them in a table.
 * Each row in the table represents a scorer, including their position, name, and score (number of goals).
 * The table is dynamically created with rows for each scorer. Clicking on a row redirects the user to a detailed view of the specific player.
 * In case of an error during fetching, an error message is logged to the console.
 */

async function populateTop15Scorers() {
    const response = await axios.get('/Players/top15')
    if (response.status === 200) {
        const players = response.data;
        if (players) {
            const table = document.getElementById('players_table');
            // Clear the existing rows in the table, if any
            table.innerHTML = '';

            const playerPromises = players.map(player => axios.get(`/Players/${player.id}`));
            const playerResponses = await Promise.all(playerPromises);

            for (let i = 0; i < players.length; i++) {
                const playerName = playerResponses[i].data.name;
                const playerScore = players[i].score;
                // Create a new row
                const row = document.createElement('tr');
                // Create and append the position cell
                const positionCell = document.createElement('td');
                positionCell.textContent = i + 1;
                row.appendChild(positionCell);
                // Create and append the name cell
                const nameCell = document.createElement('td');
                nameCell.textContent = playerName;
                row.appendChild(nameCell);
                // Create and append the goals cell
                const scoreCell = document.createElement('td');
                scoreCell.textContent = playerScore; // Player's number of goals
                row.appendChild(scoreCell);
                //link row to specific player page
                const href = `/specific_Player/${players[i].id}`;
                row.addEventListener('click', () => {
                    window.location.href = href;
                });
                row.style.cursor = 'pointer';
                // Append the row to the table
                table.appendChild(row);
            }
        }
    }
    else {
        console.error('There was an error fetching the top 15 goal scorers!');
    }
}

