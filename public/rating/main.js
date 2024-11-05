function displayUsers() {
    axios.get(`/getUsers`)
        .then((res) => {
            const users = res.data.users;

            users.sort((a, b) => a.userNumberOfScans - b.userNumberOfScans);

            users.forEach(user => {
                const { visitorId, userNumberOfScans } = user;
                $(`.usersContainer`).prepend(`
                    <div class="user">
                        <div class="userId">id: ${visitorId}</div>
                        <div class="numberOfScan">Scans: ${userNumberOfScans}</div>
                    </div>
                    `);
            })
        })
        .catch(err => {
            console.log(err)
        });
}

displayUsers();