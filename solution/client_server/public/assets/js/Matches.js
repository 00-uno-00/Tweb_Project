async function populateLatest15Matches() {
    const response = await axios.get('/Matches/latest15matches')
    if (response.status === 200) {
        const matches = response.data;
        console.log(matches)
        if (matches) {
            const table = document.getElementById('matches_table');
            // Clear the existing rows in the table, if any
            table.innerHTML = '';
            table.style.alignContent = 'center';
            table.classList.add('table', 'table-striped', 'table-bordered', 'table-hover', 'table-responsive');
            for (let i = 0; i < matches.length; i++) {
                const homeTeam = matches[i].home_club_name || "Unknown";
                const awayTeam = matches[i].away_club_name || "Unknown";
                const homeScore = matches[i].home_club_goals
                const awayScore = matches[i].away_club_goals
                let date = new Date(matches[i].date);
                let formattedDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

                // Create a new row
                const row = document.createElement('tr');
                // Create and append the home team cell
                const homeTeamCell = document.createElement('td');
                homeTeamCell.textContent = homeTeam;
                homeTeamCell.className = 'text-start';
                row.appendChild(homeTeamCell);
                const homeTeamScore = document.createElement('td');
                homeTeamScore.textContent = homeScore;
                homeTeamScore.className = 'text-start';
                row.appendChild(homeTeamScore);
                // Create and append the vs cell
                const vsCell = document.createElement('td');
                vsCell.textContent = '-';
                vsCell.className = 'text-center';
                row.appendChild(vsCell);
                // Create and append the away team cell
                const awayClubScore = document.createElement('td');
                awayClubScore.textContent = awayScore;
                awayClubScore.className = 'text-end';
                row.appendChild(awayClubScore);
                const awayTeamCell = document.createElement('td');
                awayTeamCell.textContent = awayTeam;
                awayTeamCell.className = 'text-end';
                row.appendChild(awayTeamCell);
                // Append the row to the table
                const href = `/Match/${matches[i].game_id}`;
                row.addEventListener('click', () => {
                    window.location.href = href;
                });
                row.style.cursor = 'pointer';
                table.appendChild(row);
            }
        }
    }
    else {
        console.error('There was an error fetching the latest 15 matches!');
    }
}