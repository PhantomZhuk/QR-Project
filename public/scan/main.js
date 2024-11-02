const fpPromise = import('https://fpjscdn.net/v3/0OGO8z8c5uWS5Udbhwrq')
    .then(FingerprintJS => FingerprintJS.load({
        region: "eu"
    }))

fpPromise
    .then(fp => fp.get())
    .then(result => {
        const visitorId = result.visitorId
        axios.post(`/scanQr`, { visitorId })
            .then(res => {
                console.log(res)
                window.location.href = "/rating"
            })
            .catch(err => {
                console.log(err)
            })
    })