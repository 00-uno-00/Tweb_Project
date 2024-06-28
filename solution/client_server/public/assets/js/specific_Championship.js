async function loadData() {
    const chasmpId = window.location.pathname.split('/')[2];
    const res = await axios.get(`/Championship/getChampionship/${chasmpId}`);


}