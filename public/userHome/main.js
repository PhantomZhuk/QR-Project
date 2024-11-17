const fpPromise = import('https://fpjscdn.net/v3/0OGO8z8c5uWS5Udbhwrq')
    .then(FingerprintJS => FingerprintJS.load({ region: "eu", token: "0OGO8z8c5uWS5Udbhwrq" }));

function checkUser() {
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId;
            if (window.location.pathname.split(`/`).filter(segment => segment).pop() !== visitorId) {
                window.location.href = `/home/${visitorId}`;
            }
        })
        .catch(err => {
            console.error("Error loading FingerprintJS:", err);
        });

}

checkUser();

axios.get(`/getUsers`)
    .then((res) => {
        res.data.users.forEach(user => {
            if (user.visitorId === window.location.pathname.split(`/`).filter(segment => segment).pop()) {
                if (user.userNumberOfScans === 1) {
                    $(`.numberOfScan`).text(user.userNumberOfScans + ` Scan`);
                } else if (user.userNumberOfScans > 1) {
                    $(`.numberOfScan`).text(user.userNumberOfScans + ` Scans`);
                } else {
                    $(`.numberOfScan`).text(user.userNumberOfScans + ` Scan`);
                }
            }
        })
    })

$(`#shopBtn`).click(() => { 
    window.location.href = `/shop/${window.location.pathname.split(`/`).filter(segment => segment).pop()}`;
})