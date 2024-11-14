function checkAuth() {
    if (!$.cookie(`token`)) {
        window.location.href = `/admin/auth`;
    } else if ($.cookie(`token`)) {
        axios.get(`/protected`, {
            headers: {
                'Authorization': 'Bearer ' + $.cookie(`token`)
            }
        })
            .then((res) => {
                if (res.data.message === `This is a secure route` && !hasRedirected) {
                    window.location.href = `/admin/home`;
                } else {
                    window.location.href = `/admin/auth`;
                }
            });
    } else {
        window.location.href = `/`;
    }
}

checkAuth();