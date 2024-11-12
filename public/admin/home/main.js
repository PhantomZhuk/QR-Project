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