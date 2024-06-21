async function populateTop15Scorers() {
    const response = await axios.get('/Players/top15goalscorers')
    if (response.status === 200) {
        const players = response.data;
        console.log(players)
        if (players) {
            const table = document.getElementById('players_table');
            // Clear the existing rows in the table, if any
            table.innerHTML = '';
            for (const player of players) {
                const index = players.indexOf(player);
                // Query the player's name
                try{
                    const response = await axios.get(`/Players/38253`);
                    player.name = response.data.name;
                } catch (error) {
                    console.error('Error fetching player: ', error);
                    res.status(500).send('Internal server error');
                }

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
            }
        }
    }
    else {
        console.error('There was an error fetching the top 15 goal scorers!', error);
    }
}