document.addEventListener('DOMContentLoaded', () => {
    top8players();
    lastMatches()
});

async function top8players() {
    let playersContainer = document.getElementById('carousel-1');
    try {
        const response = await axios.get('/topPlayer');
        console.log('ue ue son qui '+response.data);
        const players = response.data;
        console.log('Top 8 players:', players);
        playersContainer.innerHTML = ''; // Clear previous content
        if (players.length === 0) {
            playersContainer.textContent = 'No players found.';
        } else {
            players.forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player-card';
                playerDiv.innerHTML = `
                    <div class="player-info">
                        <p>ID: ${player._id}</p>
                        <p>Name: ${player.totalGoals}</p>
                        <div class="player-photo"></div>
                    </div>
                `;
                playersContainer.appendChild(playerDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching top 8 players:', error);
        playersContainer.textContent = 'An error occurred while fetching the top 8 players.';
    }
}

async function lastMatches() {
    let matchesContainer = document.getElementById('matches-container');
    try {
        const response = await axios.get('/index/lastMatches');
        const matches = response.data;
        console.log('Top 4 matches:', matches);
        matchesContainer.innerHTML = ''; // Clear previous content

        if (matches.length === 0) {
            matchesContainer.textContent = 'No matches found.';
        } else {
            matches.forEach(match => {
                const matchDiv = document.createElement('div');
                matchDiv.className = 'match';

                matchDiv.innerHTML = `
                    <div class="match-info">
              <p id="left">${match.home_club_name}</p>
              <p>vs</p>
              <p id="right">${match.away_club_name}</p>
            </div>
            <div class="score-info">
              <p>Score: ${match.home_club_goals} - ${match.away_club_goals}</p>
            </div>
          `;

                matchesContainer.appendChild(matchDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching top 4 matches:', error);
        matchesContainer.textContent = 'An error occurred while fetching the top 4 matches.';
    }
}