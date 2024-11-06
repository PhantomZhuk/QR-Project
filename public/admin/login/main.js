$(`#loginBtn`).click(() => {
    if ($(`#loginInput`).val() && $(`#passwordInput`).val()) {
        axios.post(`/admin/login`, {
            adminName: $(`#loginInput`).val(),
            password: $(`#passwordInput`).val()
        })
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message === `Admin logged in`) {
                    // window.location.href = `/admin/home`
                    console.log(res.data.message);
                }
            })
    }else {
        console.error(`Error`)
    }
})