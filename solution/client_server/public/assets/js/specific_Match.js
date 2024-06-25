async function populateStatsMatch() {
    let teams = document.getElementById('teams');
    let stadium = document.getElementById('stadium');
    let manager = document.getElementById('manager');
    //let img1 = document.getElementById('sq_1');
    //let img2 = document.getElementById('sq_2');

    let matchId = window.location.pathname.split('/')[2];

    try {
        const response = await axios.get(`/specific_Match/statsMatch/${matchId}`);
        const match = response.data;
        console.log(match);


        teams.textContent = match.club_goals.home_team + ' ' + match.club_goals.home_score + ' - ' + match.club_goals.away_score + ' ' + match.club_goals.away_team;
        let date = new Date(match.data_stadium.date);
        let formattedDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        stadium.textContent += "Stadium: " + match.data_stadium.stadium + "  " + "Date: "  + formattedDate; //TODO data formato
        manager.textContent += match.manager.managerName;

        //img1.src = match.imageUrl;//TODO: Add images for teams
        //img2.src = match.imageUrl;
    } catch (error) {
        console.error('Error fetching match: ', error);
    }
}