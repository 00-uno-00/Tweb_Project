async function populateStatsMatch() {
    let teams = document.getElementById('teams');
    let stadium = document.getElementById('stadium');
    let manager = document.getElementById('manager');
    let eventsContainer = document.getElementById('events');
    //let img1 = document.getElementById('sq_1');
    //let img2 = document.getElementById('sq_2');

    let matchId = window.location.pathname.split('/')[2];

    try {
        const response = await axios.get(`/specific_Match/statsMatch/${matchId}`);
        const match = response.data;
        console.log(match);


        teams.textContent = match.club_goals.home_team + ' ' +
                            match.club_goals.home_score + ' - ' +
                            match.club_goals.away_score + ' ' +
                                match.club_goals.away_team;
        let date = new Date(match.data_stadium.date);
        let formattedDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        stadium.textContent += "Stadium: " + match.data_stadium.stadium + "  " + "Date: "  + formattedDate;
        manager.textContent += match.manager.home_manager + ' - ' + match.manager.away_manager;

        //img1.src = match.imageUrl;//TODO: Add images for teams
        //img2.src = match.imageUrl;
    } catch (error) {
        console.error('Error fetching match: ', error);
    }


    try {
        const response = await axios.get(`/specific_Match/statsMatch/${matchId}`);
        const match = response.data;
        console.log('Match data:', match);

        teams.textContent = `${match.club_goals.home_team} ${match.club_goals.home_score} - ${match.club_goals.away_score} ${match.club_goals.away_team}`;

        let date = new Date(match.data_stadium.date);
        let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        stadium.innerHTML = `Stadium: ${match.data_stadium.stadium} <br> Date: ${formattedDate}`;
        manager.textContent = `Manager: ${match.manager.managerName}`;

        const events_Match = match.events;

        eventsContainer.innerHTML = ''; // Clear previous content

        if (events_Match.length === 0) {
            eventsContainer.textContent = 'No events found.';
        } else {
            events_Match.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';

                // Add class based on event type
                if (event.type === 'Cards') {
                    eventDiv.classList.add('event_card');
                } else if (event.type === 'Goals') {
                    eventDiv.classList.add('event_goal');
                }

                eventDiv.innerHTML = `
                    <p>Minute: ${event.minute} -  ${event.type} Player: ${event.player_id}</p>
                    <p>Description: ${event.description}</p>
                `;
                eventsContainer.appendChild(eventDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching match events: ', error);
        eventsContainer.textContent = 'Error loading match events.';
    }
}