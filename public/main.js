const socket = io();

axios.get(`/getScans`)
    .then((res) => {
        $(`.numberScans`).text(res.data.numberOfScans.numberOfScans);
    })

socket.on('scanUpdate', (updatedScans) => {
    $(`.numberScans`).text(updatedScans)
});