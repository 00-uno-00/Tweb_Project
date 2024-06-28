async function populateStatsMatch() {
    let teams = document.getElementById('teams');
    let stadium = document.getElementById('stadium');
    let manager = document.getElementById('manager');
    let eventsContainer = document.getElementById('events');
    let home_y_card = document.getElementById('home_y_card');
    let away_y_card = document.getElementById('away_y_card');
    let home_r_card = document.getElementById('home_r_card');
    let away_r_card = document.getElementById('away_r_card');
    //let img1 = document.getElementById('sq_1');
    //let img2 = document.getElementById('sq_2');

    let matchId = window.location.pathname.split('/')[2];

    try {
        const response = await axios.get(`/specific_Match/statsMatch/${matchId}`);
        const match = response.data;
        console.log('Match data:', match);

        teams.textContent = `${match.club_goals.home_team} ${match.club_goals.home_score} - ${match.club_goals.away_score} ${match.club_goals.away_team}`;

        let date = new Date(match.data_stadium.date);
        let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        stadium.innerHTML = `Stadium: ${match.data_stadium.stadium} <br> Date: ${formattedDate}`;
        //unire manager agli altri dati
        manager.textContent = `Manager: ${match.manager.home_manager}` + match.manager.away_manager;

        const homeID = match.club_goals.home_id;
        const awayID = match.club_goals.away_id;
        const gameId = match.club_goals.game_id;


        const events_Match = match.events;
        eventsContainer.innerHTML = ''; // Clear previous content
//todo sistemare css in modo che colori di rosso e che lasci i giusti spazi
        if (events_Match.length === 0) {
            eventsContainer.textContent = 'No events found.';
        } else {
            events_Match.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';

                if (event.club_id === homeID) {
                    eventDiv.classList.add('center-left'); //mette l'eventi nella colonna di sinistra
                    // Add class based on event type
                    if (event.type === 'Cards') {
                        eventDiv.classList.add('event_card'); //colora di rosso
                    } else if (event.type === 'Goals') {
                        eventDiv.classList.add('event_goal'); //colora di verde
                    } else {
                        eventDiv.classList.add('other_events'); //colora di azzurro
                    }

                } else if (event.club_id === 'away_team') {
                    eventDiv.classList.add('right'); //mette l'eventi nella colonna di destra
                    // Add class based on event type
                    if (event.type === 'Cards') {
                        eventDiv.classList.add('event_card'); //colora di rosso
                    } else if (event.type === 'Goals') {
                        eventDiv.classList.add('event_goal'); //colora di verde
                    } else {
                        eventDiv.classList.add('other_events'); //colora di azzurro
                    }

                }


                eventDiv.innerHTML = `
                    <p>Minute: ${event.minute} -  ${event.type} Player: ${event.player_id}</p>
                    <p>Description: ${event.description}</p>
                `;
                eventsContainer.appendChild(eventDiv);
            });
        }

        try {
            const home_response = await axios.get(`/specific_Match/statsMatch/totalinfo/${gameId}/${homeID}`);
            const away_response = await axios.get(`/specific_Match/statsMatch/totalinfo/${gameId}/${awayID}`);

            console.log('Home Response:', home_response.data);

            const home_yellow_card = home_response.data;
            const away_yellow_card = away_response.data;
            away_y_card.textContent = `${away_yellow_card.yellow_Card.totalYellowCards}`;
            home_y_card.textContent = `${home_yellow_card.yellow_Card.totalYellowCards}`;

            console.log('Match data:', home_yellow_card.totalYellowCards);
            console.log('Match :', away_y_card);

            home_r_card.textContent = `${home_response.data.red_Card.totalRedCards}`;
            away_r_card.textContent = `${away_response.data.red_Card.totalRedCards}`;

            
        } catch (error) {
            console.error('Error fetching match events: ', error);
            eventsContainer.textContent = 'Error loading match events information.';
        }
        

    } catch (error) {
        console.error('Error fetching match events: ', error);
        eventsContainer.textContent = 'Error loading match events.';
    }


}