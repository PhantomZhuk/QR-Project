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
            })
            .catch(err => {
                console.log(err)
            })
        window.location.href = "/rating"
    })