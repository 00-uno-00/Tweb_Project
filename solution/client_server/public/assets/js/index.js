document.addEventListener('DOMContentLoaded', () => {
    top8players();
    lastMatches();
    greenBarData();
});

async function top8players() {
    let playersContainer = document.getElementById('carousel-1');

    try {
        const response = await axios.get('/topPlayer');
        const players = response.data;
        console.log('Top 8 players:', players);
        playersContainer.innerHTML = ''; // Clear previous content
        if (players.length === 0) {
            playersContainer.textContent = 'No players found.';
        } else {
            for (const player of players) {
                console.log(player);
                console.log(player._id);
                const name = await axios.get(`/getPlayerName/${player._id}`);
                let Player = name.data;
                const playerDiv = document.createElement('div');
                const href = `/specific_Player/${player._id}`;
                playerDiv.className = 'player-card';
                playerDiv.innerHTML = `
                    <div class="player-info">
                        <p>Name: ${Player.name}</p>
                        <p>Goals: ${player.totalGoals}</p>
                        <img src="${Player.imageUrl}" alt="${Player.name}" style="height:110px">
                    </div>
                `;
                playerDiv.addEventListener('click', () => {
                    window.location.href = href;
                });
                playerDiv.style.cursor = 'pointer';
                playersContainer.appendChild(playerDiv);
            }
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
                const href = `/Match/${match.game_id}`;
                matchDiv.className = 'match';

                matchDiv.innerHTML = `
                    <div class="match-info">
                        <p class="left">${match.home_club_name}</p>
                        <p class="vs">vs</p>
                        <p class="right">${match.away_club_name}</p>
                    </div>
                    <div class="score-info">
                        <p>Score: ${match.home_club_goals} - ${match.away_club_goals}</p>
                    </div>
                `;
                matchDiv.addEventListener('click', () => {
                    window.location.href = href;
                });
                matchDiv.style.cursor = 'pointer';
                matchesContainer.appendChild(matchDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching top 4 matches:', error);
        matchesContainer.textContent = 'An error occurred while fetching the top 4 matches.';
    }
}

async function greenBarData(){
    usersNumber();

    const stats = await axios.get('/index/getDataStats');
    const nplayersdiv = document.getElementById('n_players');
    const nchampdiv = document.getElementById('n_champ');
    const nteamsdiv = document.getElementById('n_teams');

    nplayersdiv.textContent = stats.data.players;
    nteamsdiv.textContent = stats.data.teams;
    nchampdiv.textContent = stats.data.championships;
}

//totally real user count
async function usersNumber() {
    let numberUsers = document.getElementById('n_users');
    let numero = Math.floor(Math.random() * 10000);
    try {
        numberUsers.textContent = numero.toString() + '+ ';
    } catch {
        console.error('Error fetching random number:', error);
        numberUsers.textContent = 'An error occurred while fetching the random number.';
    }
}