async function populateTop15Scorers() {
    const response = await axios.get('/Players/top15goalscorers')
    if (response.status === 200) {
        const players = response.data;
        console.log(players)
        if (players) {
            const table = document.getElementById('players_table');
            // Clear the existing rows in the table, if any
            table.innerHTML = '';

            const playerPromises = players.map(player => axios.get(`/Players/${player._id}`));
            const playerResponses = await Promise.all(playerPromises);

            for (let i = 0; i < players.length; i++) {
                const playerName = playerResponses[i].data.name;
                const row = table.insertRow();
                row.insertCell().textContent = playerName;
            }
        }
    }
    else {
        console.error('There was an error fetching the top 15 goal scorers!');
    }
}