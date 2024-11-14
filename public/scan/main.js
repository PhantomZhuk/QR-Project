const fpPromise = import('https://fpjscdn.net/v3/0OGO8z8c5uWS5Udbhwrq')
    .then(FingerprintJS => FingerprintJS.load({ region: "eu", token: "0OGO8z8c5uWS5Udbhwrq" }));

fpPromise
    .then(fp => fp.get())
    .then(result => {
        const visitorId = result.visitorId;

        if (window.location.href === `http://localhost:3000/scan/`) {
            axios.post(`/scanQr`, { visitorId })
                .then(res => {
                    console.log(res);
                    window.location.href = "/rating";
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (window.location.href === `http://localhost:3000/getUserId/`) {
            console.log(visitorId);
            window.location.href = `/home/${visitorId}`;
        } else {
            console.log(window.location.href);
        }
    })
    .catch(err => {
        console.error("Error loading FingerprintJS:", err);
    });
