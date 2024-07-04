async function populateStats() {

    let playerId = window.location.pathname.split('/')[2];

    populatePlayer(playerId);

    populateGameStats(playerId);

    populateCareer(playerId);
}

async function populatePlayer(playerId) {
    let playerName = document.getElementById('player_name');
    let playerScore = document.getElementById('player_score');
    let nationality = document.getElementById('Nationality');
    let marketValue = document.getElementById('market_value_in_eur');
    let role = document.getElementById('Role');
    let contractExpirationDate = document.getElementById('contract_expiration_date');
    let dob = document.getElementById('DOB');
    let currentClubDomesticCompetitionId = document.getElementById('current_club_domestic_competition_id');
    let club = document.getElementById('Club');
    let img = document.getElementById('player_image');
    let foot = document.getElementById('Foot');
    let height = document.getElementById('Height');


    try {
        const response = await axios.get(`/Players/${playerId}`);
        const player = response.data;

        playerName.textContent = player.name;
        playerScore.textContent += player.score;
        nationality.textContent += ' ' + player.countryOfCitizenship;
        marketValue.textContent += player.marketValueInEur;
        role.textContent += player.subPosition;
        let date = new Date(player.contractExpirationDate);
        let formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        contractExpirationDate.textContent += formattedDate;
        dob.textContent += player.dateOfBirth;
        club.textContent += player.currentClubName;
        height.textContent += player.heightInCm + ' cm';
        foot.textContent += player.foot;
        currentClubDomesticCompetitionId.textContent += player.championship.name;

        img.src = player.imageUrl;
    } catch (error) {
        console.error('Error fetching player: ', error);
    }

}

async function populateGameStats(playerId) {
    let minutesPlayed = document.getElementById('minutes_played');
    let goals = document.getElementById('goals');
    let assists = document.getElementById('assists');

    try {
        const ret = await axios.get(`/specific_Player/stats/${playerId}`);

        minutesPlayed.textContent += ret.data.time;
        goals.textContent += ret.data.goals;
        assists.textContent += ret.data.assists;
    } catch (error) {
        console.error('Error fetching player stats: ', error);
    }
}

async function populateCareer(playerId) {
    try {
        let careerData;
        const career = await axios.get(`/specific_Player/career/${playerId}`);
        careerData = career.data;

        // Crea una tabella HTML
        let tableHTML = '<table><thead><tr><th>Club</th><th>First Appearance</th><th>Last Appearance</th></tr></thead><tbody>';
        let i = 0;
        for (let item of careerData) {
            const team = await axios.get(`/specific_Player/club/${item.club_id}`);
            name = team.data.name.replace('-', ' ');

            let date = new Date(careerData[i].firstAppearance);
            let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            let datelast = new Date(careerData[i].lastAppearance);
            let formattedDatelast = `${datelast.getFullYear()}-${datelast.getMonth() + 1}-${datelast.getDate()}`;

            tableHTML += `
            <tr>
               
                <td>${name}</td>
                <td>${formattedDate}</td>
                <td>${formattedDatelast}</td>
            </tr>
        `;
            i++;
        }

        tableHTML += '</tbody></table>';

        document.getElementById('tabella_carriera').innerHTML = tableHTML;
    } catch {
        console.error('Error fetching player career: ', error);
    }
}