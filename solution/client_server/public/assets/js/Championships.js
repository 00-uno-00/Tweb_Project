async function populateChampionsips() {
    const res = await axios.get('/Championships/getTop10');
    console.log(res.data);
    if (res.status === 200) {
        const championships = res.data;
        if (championships) {
            const table = document.getElementById('championships_table');

            table.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                let championship = championships[i].name || "Unknown";
                const championship_id = championships[i].id;
                const country_name = championships[i].countryName || "Unknown";
                // Check if there are duplicates
                if (championships.filter(champ => champ.name === championship).length > 1) {
                    championship += ' (' + country_name + ')';
                }
                const row = document.createElement('tr');
                const championshipCell = document.createElement('td');
                championshipCell.textContent = championship.toUpperCase().replaceAll("-", " ") ;
                championshipCell.className = 'text-center';
                row.appendChild(championshipCell);
                const href = `/specific_Championship/${championship_id}`;
                row.addEventListener('click', () => {
                    window.location.href = href;
                });
                row.style.cursor = 'pointer';
                table.appendChild(row);
            }
        }
    }
}