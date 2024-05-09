championship = "";
let rootStyles = getComputedStyle(document.documentElement);

let colorDarkolivegreen100 = rootStyles.getPropertyValue('--color-darkolivegreen-100').trim();
let colorDarkolivegreen200 = rootStyles.getPropertyValue('--color-darkolivegreen-200').trim();
let colorDarkolivegreen300 = rootStyles.getPropertyValue('--color-darkolivegreen-300').trim();
function init() {
    let teamsDiv = document.getElementById('teamsContainer');
    getTeams(teamsDiv);
}

function getTeams(teamsDiv) {
    url = '/teams';
    axios.post(url, { championship: championship })
        .then(function (response) {
            response.data.forEach(team => {
                addTeam(team, teamsDiv);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function addTeam(team, container) {
    let cellDiv = document.createElement('div');
    cellDiv.classList.add('col')
    container.appendChild(cellDiv);
    let teamDiv = document.createElement('div');
    teamDiv.classList.add('team');
    teamDiv.innerHTML = team;
    teamDiv.style.backgroundColor = container.style.backgroundColor;
    teamDiv.style.color = colorDarkolivegreen200;
    teamDiv.style.textAlign = 'center';
    teamDiv.style.padding = '10px';
    teamDiv.style.margin = '10px';
    teamDiv.style.borderRadius = '10px';
    teamDiv.style.borderStyle = 'solid';
    teamDiv.addEventListener('click', function () {
        console.log('Div clicked');
    });
    cellDiv.appendChild(teamDiv);
}
