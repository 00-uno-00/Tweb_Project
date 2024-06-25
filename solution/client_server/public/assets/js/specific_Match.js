async function populateStatsMatch() {
    let teams = document.getElementById('teams');
    let stadium = document.getElementById('stadium');
    let manager = document.getElementById('manager');
    let img = document.getElementById('match_image');//forse è sbagliato perché dovrei avere due imgs

    let matchId = window.location.pathname.split('/')[2];

    try {
        const response = await axios.get(`/statsMatch/${matchId}`);
        const match = response.data;

        teams.textContent = match.homeTeamName + ' ' + match.homeTeamGoals + ' - ' + match.awayTeamGoals + ' ' + match.awayTeamName;
        stadium.textContent += match.stadiumName;

        img.src = match.imageUrl;
    } catch (error) {
        console.error('Error fetching match: ', error);
    }
}