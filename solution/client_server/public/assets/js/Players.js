async function populateTop15Scorers() {
    const response = await axios.get('/Players/top15goalscorers')
    if (response.status === 200) {
        const players = response.data;
        if (players) {
            const table = document.getElementById('players_table');
            // Clear the existing rows in the table, if any
            table.innerHTML = '';

            const playerPromises = players.map(player => axios.get(`/Players/${player._id}`));
            const playerResponses = await Promise.all(playerPromises);

            for (let i = 0; i < players.length; i++) {
                const playerName = playerResponses[i].data.name;
                const playerGoals = players[i].totalGoals;
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
                const goalsCell = document.createElement('td');
                goalsCell.textContent = playerGoals; // Player's number of goals
                row.appendChild(goalsCell);
                //link row to specific player page
                const linkCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = `/specific_Player/${players[i]._id}`;
                link.textContent = 'View Player';
                linkCell.appendChild(link);
                row.appendChild(linkCell);
                // Append the row to the table
                table.appendChild(row);
            }
        }
    }
    else {
        console.error('There was an error fetching the top 15 goal scorers!');
    }
}

