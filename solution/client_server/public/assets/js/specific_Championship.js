async function loadData() {
    const champId = window.location.pathname.split('/')[2];
    const res = await axios.get(`/specific_Championship/getChampionship/${champId}`);
    const championship = res.data;
    console.log(championship);
    document.getElementById('champ_name').innerText = championship.championship.name.toUpperCase();
    //set championship generic data
    await champData(championship.championship);

    await teamsData(championship.teams);

    await matchesData(championship.matches);
}

async function champData(championship) {
    const info = document.getElementById('champ_info')

    if (championship.type === 'domestic_league') {
        info.innerText = "Country: " + championship.countryName + " | Type: Domestic League"
    } else if (championship.type === 'international_cup') {
        info.innerText = "Type: International Cup"
    }
    info.innerText += " | Confederation: " + championship.confederation.toUpperCase();
}

async function teamsData(teams) {
    const players_n = document.getElementById('players_n');
    const teams_n = document.getElementById('teams_n');
    let players = 0;
    let nteams = 0;
    teams.forEach(team => {
        players += team.squadSize;
        nteams++;
    });
    players_n.textContent = players;
    teams_n.textContent = nteams;
    const team_ids = teams.map(team => team.id);
    const res = await axios.get(`/specific_Championship/getTeamsCTIS/${team_ids.join(',')}`);
    const scores = res.data;
    const bestTeamsTable = document.getElementById('best_teams_table');
    bestTeamsTable.innerHTML = '';
    for (let i = 0; i < teams.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="align-content: start">${teams[i].name}</td>
            <td>${scores[i] === "" ? "N/A" : scores[i]}</td>
            `;
        const href = `/Team/${teams[i].id}`;
        row.addEventListener('click', () => {
            window.location.href = href;
        });
        bestTeamsTable.appendChild(row);
    }
}

async function matchesData(matches) {
    const matchesTable = document.getElementById('matches_table');
    const matches_n = document.getElementById('matches_n');
    matches_n.textContent = matches.length;
    matchesTable.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const match = matches[i];
        const href = `/Match/${match.game_id}`;
        const row = document.createElement('tr');
        let date = new Date(match.date);
        row.innerHTML = `
            <td>${match.home_club_name}</td>
            <td>${match.home_club_goals} - ${match.away_club_goals}</td>
            <td>${match.away_club_name}</td>
            <td>${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}</td>
        `;
        row.addEventListener('click', () => {
            window.location.href = href;
        });
        matchesTable.appendChild(row);
    }
}