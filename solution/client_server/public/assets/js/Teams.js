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