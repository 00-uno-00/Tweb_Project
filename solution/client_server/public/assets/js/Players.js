function populateTop15Scorers() {
    axios.get("http://localhost:3001/top15goalscorers", {
        headers: {'Content-Type': 'application/json'}
    })
        .then((response) => {
            if (response.status === 200) {
                const players = response.data;
                if (players) {
                    const table = document.getElementById('players_table');

                    // Clear the existing rows in the table, if any
                    table.innerHTML = '';

                    players.forEach((player, index) => {
                        // Create a new row
                        const row = document.createElement('tr');

                        // Create and append the position cell
                        const positionCell = document.createElement('td');
                        positionCell.textContent = index + 1; // Position (1-based index)
                        row.appendChild(positionCell);

                        // Create and append the name cell
                        const nameCell = document.createElement('td');
                        nameCell.textContent = player.id; // Player's name
                        row.appendChild(nameCell);

                        // Create and append the goals cell
                        const goalsCell = document.createElement('td');
                        goalsCell.textContent = player.totalgoals; // Player's number of goals
                        row.appendChild(goalsCell);

                        // Append the row to the table
                        table.appendChild(row);
                    });
                }
            }
        })
        .catch((error) => {
            console.error('There was an error fetching the top 15 goal scorers!', error);
        });
}
