async function getTeamData() {
    const team_id = window.location.pathname.split('/')[2];

    //Players
    await getPlayers(team_id);

    // Get the team data
    await getTeamInfo(team_id);

    //Matches
    await getMatches(team_id);
}

async function getTeamInfo(team_id) {
    const teamResponse = await axios.get(`/Team/teamInfo/${parseInt(team_id)}`);
    if (teamResponse.status === 200) {
        const team = teamResponse.data.name;
        document.getElementById('team_name').textContent = team.name;
        const goals = document.getElementById('atk')
        const conceded = document.getElementById('def')
        const matches_n = document.getElementById('matches_n')
        let matches = 0;
        const gameStats = teamResponse.data.gameStats ;
        let atk = 0;
        gameStats.forEach(game => {
            matches++;
            if (game.home_club_id === parseInt(team_id)) {
                atk += game.home_club_goals;
            } else {
                atk += game.away_club_goals;
            }
        });
        matches_n.textContent = matches;
        goals.textContent = atk;
        let def = 0;
        gameStats.forEach(game => {
            if (game.home_club_id === parseInt(team_id)) {
                def += game.away_club_goals;
            } else {
                def += game.home_club_goals;
            }
        });
        conceded.textContent = def;


        //document.getElementById('team_country').textContent = team.country;
        //document.getElementById('team_founded').textContent = team.founded;
        //document.getElementById('team_stadium').textContent = team.stadium;
    } else {
        console.error('There was an error fetching the team data!');
    }
}

async function getPlayers(team_id) {
    const playersResponse = await axios.get(`/Team/players/${parseInt(team_id)}`);
    if (playersResponse.status === 200) {
        const players = playersResponse.data;
        const playersTable = document.getElementById('players_table');
        playersTable.innerHTML = '';
        players.forEach(player => {
            const playerRow = document.createElement('tr');
            const playerName = document.createElement('td');
            playerName.textContent = player.name;
            const playerPosition = document.createElement('td');
            playerPosition.textContent = player.position;
            const playerScore = document.createElement('td');
            playerScore.textContent = player.score === -1 ? 'N/A' : player.score;
            playerRow.appendChild(playerPosition);
            playerRow.appendChild(playerName);
            playerRow.appendChild(playerScore);
            const href = `/specific_Player/${player.id}`;
            playerRow.addEventListener('click', () => {
                window.location.href = href;
            });
            playersTable.appendChild(playerRow);

        });
    } else {
        console.error('There was an error fetching the players!');
    }
}

async function getMatches(team_id) {
    const matchesResponse = await axios.get(`/Team/matches/${parseInt(team_id)}`);
    if (matchesResponse.status === 200) {
        const matches = matchesResponse.data;
        const matchesTable = document.getElementById('matches_table');
        matchesTable.innerHTML = '';
        matches.forEach(match => {
            const matchRow = document.createElement('tr');
            const matchOpponent = document.createElement('td');
            const matchHome = document.createElement('td');
            if (match.home_club_id === parseInt(team_id)) {
                matchOpponent.textContent = match.away_club_name;
                matchHome.textContent = match.home_club_name
            } else {
                matchOpponent.textContent = match.home_club_name;
                matchHome.textContent = match.away_club_name
            }
            const matchResult = document.createElement('td');
            matchResult.textContent = match.aggregate;
            matchRow.appendChild(matchHome);
            matchRow.appendChild(matchResult);
            matchRow.appendChild(matchOpponent);

            const href = `/Match/${match.id}`;
            matchRow.addEventListener('click', () => {
                window.location.href = href;
            });
            matchesTable.appendChild(matchRow);

        });
    } else {
        console.error('There was an error fetching the matches!');
    }
}