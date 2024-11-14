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