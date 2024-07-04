async function populateStatsMatch() {
    let teams = document.getElementById('teams');
    let stadium = document.getElementById('stadium');
    let eventsContainer = document.getElementById('events');


    let matchId = window.location.pathname.split('/')[2];

    try {
        const response = await axios.get(`/specific_Match/statsMatch/${matchId}`);
        const match = response.data;

        teams.textContent = `${match.club_goals.home_team !== "" ? match.club_goals.home_team : "Unknown"} ${match.club_goals.home_score} - ${match.club_goals.away_score} ${match.club_goals.away_team !== "" ? match.club_goals.away_team : "Unknown"}`;

        let date = new Date(match.data_stadium.date);
        let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        stadium.innerHTML = `Stadium: ${match.data_stadium.stadium} <br> Date: ${formattedDate}`;

        const homeID = match.club_goals.home_id;
        const awayID = match.club_goals.away_id;

        populateSimpleStats(match);

        const events_Match = match.events;
        eventsContainer.innerHTML = ''; // Clear previous content

        if (events_Match.length === 0) {
            eventsContainer.textContent = 'No events found.';
        } else {
            const eventsBody = document.getElementById('events');

            for (const event of events_Match) {

                const player = await axios.get(`/specific_Match/specific_Player/${event.player_id}`);

                const eventRow = document.createElement('tr');

                const homeCell = document.createElement('td');

                const awayCell = document.createElement('td');

                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';

                eventDiv.innerHTML = `
                    <p>Minute: ${event.minute} -  ${event.type} Player: ${player.data.name}</p>
                    <p>Description: ${event.description}</p>
                `;

                if (event.club_id === homeID) {
                    if (event.type === 'Cards') {
                        eventDiv.classList.add('event_card_left');
                    } else if (event.type === 'Goals') {
                        eventDiv.classList.add('event_goal_left');
                    } else {
                        eventDiv.classList.add('other_events_left');
                    }
                    homeCell.appendChild(eventDiv);
                } else if (event.club_id === awayID) {
                    if (event.type === 'Cards') {
                        eventDiv.classList.add('event_card_right');
                    } else if (event.type === 'Goals') {
                        eventDiv.classList.add('event_goal_right');
                    } else {
                        eventDiv.classList.add('other_events_right');
                    }
                    awayCell.appendChild(eventDiv);
                }

                eventRow.appendChild(homeCell);
                eventRow.appendChild(awayCell);

                eventsBody.appendChild(eventRow);
            }
        }

    } catch (error) {
        console.error('Error fetching match events: ', error);
        eventsContainer.textContent = 'Error loading match events.';
    }
}

async function populateSimpleStats(match) {
    const gameId = match.club_goals.game_id;
    const homeID = match.club_goals.home_id;
    const awayID = match.club_goals.away_id;


    let eventsContainer = document.getElementById('events');
    let home_y_card = document.getElementById('home_y_card');
    let away_y_card = document.getElementById('away_y_card');
    let home_r_card = document.getElementById('home_r_card');
    let away_r_card = document.getElementById('away_r_card');
    let h_assist = document.getElementById('home_assist');
    let a_assist = document.getElementById('away_assist');
    let home_goals = document.getElementById('home_goals');
    let away_goals = document.getElementById('away_goals');
    let h_manager = document.getElementById('home_manager');
    let a_manager = document.getElementById('away_manager');

    try {
        const home_response = await axios.get(`/specific_Match/statsMatch/totalinfo/${gameId}/${homeID}`);
        const away_response = await axios.get(`/specific_Match/statsMatch/totalinfo/${gameId}/${awayID}`);

        const home_yellow_card = home_response.data;
        const away_yellow_card = away_response.data;
        away_y_card.textContent = `${away_yellow_card.yellow_Card.totalYellowCards}`;
        home_y_card.textContent = `${home_yellow_card.yellow_Card.totalYellowCards}`;

        home_r_card.textContent = `${home_response.data.red_Card.totalRedCards}`;
        away_r_card.textContent = `${away_response.data.red_Card.totalRedCards}`;


        h_manager.textContent = `${home_response.data.manager.home_manager}`;
        a_manager.textContent = `${home_response.data.manager.away_manager}`;

        h_assist.textContent = `${home_response.data.assists.totalAssists}`;
        a_assist.textContent = `${away_response.data.assists.totalAssists}`;

        home_goals.textContent = `${match.club_goals.home_score}`;
        away_goals.textContent = `${match.club_goals.away_score}`;


    } catch (error) {
        console.error('Error fetching match events: ', error);
        eventsContainer.textContent = 'Error loading match events information.';
    }
}