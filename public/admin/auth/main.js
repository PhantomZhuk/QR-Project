axios.get(`/protected`, {
    headers: {
        'Authorization': 'Bearer ' + $.cookie(`token`)
    }
})
.then((res) => {
    if (res.data.message === `This is a secure route`){
        window.location.href = `/admin/home`
    }else {
        window.location.href = `/admin/auth`
    }
})

$(`#loginBtn`).click(() => {
    if ($(`#loginInput`).val() && $(`#passwordInput`).val()) {
        axios.post(`/admin/login`, {
            adminName: $(`#loginInput`).val(),
            password: $(`#passwordInput`).val()
        })
            .then((res) => {
                if (res.data.message === `Admin logged in`) {
                    $.cookie(`token`, res.data.token, { path: `/` });
                    window.location.href = `/admin/home`
                }
            })
    }else {
        console.error(`Error`)
    }
})