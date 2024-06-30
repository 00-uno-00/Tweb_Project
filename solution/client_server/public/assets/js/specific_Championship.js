async function loadData() {
    const champId = window.location.pathname.split('/')[2];
    const res = await axios.get(`/specific_Championship/getChampionship/${champId}`);
    const championship = res.data;
    console.log(championship);
    document.getElementById('champ_name').innerText = championship.championship.name.toUpperCase();
}