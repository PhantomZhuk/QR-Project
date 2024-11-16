const fpPromise = import('https://fpjscdn.net/v3/0OGO8z8c5uWS5Udbhwrq')
    .then(FingerprintJS => FingerprintJS.load({ region: "eu", token: "0OGO8z8c5uWS5Udbhwrq" }));

fpPromise
    .then(fp => fp.get())
    .then(result => {
        const visitorId = result.visitorId;

        if (window.location.href === `http://localhost:3000/scan/`) {
            axios.post(`/scanQr`, { visitorId })
                .then(res => {
                    if (res.data.message === `User already scanned today`) {
                        setTimeout(() => {
                            $(`.doneContainer`).css(`display`, `none`);
                            $(`.unfulfilledContainer`).css(`display`, `flex`);
                            $(`.spinnerContainer`).css(`display`, `none`);
                            $(`.unfulfilledContainer`).css(`animation`, `1.7s ease forwards unfulfilled`)
                            setTimeout(() => {
                                $(`.messageContainer`).css(`display`, `flex`);
                                $(`.wrap`).css(`flex-direction`, `column`);
                                $(`.message`).text(res.data.message);
                                setTimeout(() => {
                                    window.location.href = "/home/" + visitorId;
                                }, 3000)
                            }, 1700);
                        }, 1300);
                    }else if (res.data.message === `New scan recorded for today` || res.data.message === `First scan recorded`) {
                        setTimeout(() => {
                            $(`.doneContainer`).css(`display`, `flex`);
                            $(`.unfulfilledContainer`).css(`display`, `none`);
                            $(`.spinnerContainer`).css(`display`, `none`);
                            $(`.doneContainer`).css(`animation`, `1.7s ease forwards draw`);
    
                            setTimeout(() => {
                                window.location.href = "/home/" + visitorId;
                            }, 1700)
                        }, 1300);
                    }
                })
                .catch(err => {
                    setTimeout(() => {
                        $(`.doneContainer`).css(`display`, `none`);
                        $(`.unfulfilledContainer`).css(`display`, `flex`);
                        $(`.spinnerContainer`).css(`display`, `none`);
                        $(`.unfulfilledContainer`).css(`animation`, `1.7s ease forwards unfulfilled`);
                    }, 1300);
                    console.error(err);
                });
        } else if (window.location.href === `http://localhost:3000/getUserId/`) {
            setTimeout(() => {
                $(`.doneContainer`).css(`display`, `flex`);
                $(`.unfulfilledContainer`).css(`display`, `none`);
                $(`.spinnerContainer`).css(`display`, `none`);
                $(`.doneContainer`).css(`animation`, `1.7s ease forwards draw`);

                setTimeout(() => {
                    window.location.href = "/home/" + visitorId;
                }, 1700)
            }, 1300);
        } else {
            setTimeout(() => {
                $(`.doneContainer`).css(`display`, `none`);
                $(`.unfulfilledContainer`).css(`display`, `flex`);
                $(`.spinnerContainer`).css(`display`, `none`);
                $(`.unfulfilledContainer`).css(`animation`, `1.7s ease forwards unfulfilled`);
            }, 1300);
        }
    })
    .catch(err => {
        console.error("Error loading FingerprintJS:", err);
    });