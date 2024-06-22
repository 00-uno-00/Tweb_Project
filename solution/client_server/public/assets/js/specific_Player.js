async function populateStats() {
    let playerName = document.getElementById('player_name');
    let nationality = document.getElementById('Nationality');
    let marketValue = document.getElementById('market_value_in_eur');
    let role = document.getElementById('Role');
    let contractExpirationDate = document.getElementById('contract_expiration_date');
    let dob = document.getElementById('DOB');
    let currentClubDomesticCompetitionId = document.getElementById('current_club_domestic_competition_id');
    let club = document.getElementById('Club');
    let minutesPlayed = document.getElementById('minutes_played');
    let height = document.getElementById('Height');
    let goals = document.getElementById('goals');
    let foot = document.getElementById('Foot');
    let assists = document.getElementById('assists');
    let img = document.getElementById('player_image');

    let playerId = window.location.pathname.split('/')[2];

    try {
        const response = await axios.get(`/Players/${playerId}`);
        const player = response.data;

        playerName.textContent = player.name;
        nationality.textContent += ' ' + player.countryOfCitizenship;
        marketValue.textContent += player.marketValueInEur;
        role.textContent += player.subPosition;
        let date = new Date(player.contractExpirationDate);
        let formattedDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        contractExpirationDate.textContent += formattedDate;
        dob.textContent += player.dateOfBirth;
        currentClubDomesticCompetitionId.textContent += player.currentClubDomesticCompetitionId;
        club.textContent += player.currentClubName;
        height.textContent += player.heightInCm + ' cm';
        foot.textContent += player.foot;

        img.src = player.imageUrl;
    } catch (error) {
        console.error('Error fetching player: ', error);
    }

    try {
        const ret = await axios.get(`/specific_Player/stats/${playerId}`);

        minutesPlayed.textContent += ret.data.time;
        goals.textContent += ret.data.goals;
        assists.textContent += ret.data.assists;
    } catch (error) {
        console.error('Error fetching player stats: ', error);
    }
}

