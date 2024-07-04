async function populateChampionsips() {
    /**
     * Asynchronously populates the top 10 championships into an HTML table.
     * Fetches data from the endpoint '/Championships/getTop10', processes it,
     * and updates the HTML table with id 'championships_table'.
     *
     * @async
     * @function populateChampionships
     * @returns {Promise<void>} A promise that resolves when the table is populated.
     */
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
                championshipCell.textContent = championship.toUpperCase().replaceAll("-", " ");
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