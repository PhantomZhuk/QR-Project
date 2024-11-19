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
                if (!res.data.message === `This is a secure route` && !hasRedirected) {
                    window.location.href = `/admin/auth`;
                }
            })
            .catch((err) => {
                window.location.href = `/admin/auth`;
                console.error(err);
            })
    } else {
        window.location.href = `/`;
    }
}

checkAuth();

$(`#marketBtn`).hover(() => {
    if (!$(`#marketBtn`).hasClass(`selectedPage`)) {
        $(`#marketBtn`).css(`background-color`, `#51351b`);
    }
})

$(`#marketBtn`).mouseleave(() => {
    if (!$(`#marketBtn`).hasClass(`selectedPage`)) {
        $(`#marketBtn`).css(`background-color`, `#774e27`);
    }
})

$(`#ordersBtn`).hover(() => {
    if (!$(`#ordersBtn`).hasClass(`selectedPage`)) {
        $(`#ordersBtn`).css(`background-color`, `#51351b`);
    }
})

$(`#ordersBtn`).mouseleave(() => {
    if (!$(`#ordersBtn`).hasClass(`selectedPage`)) {
        $(`#ordersBtn`).css(`background-color`, `#774e27`);
    }
})

$(`#marketBtn`).click(() => {
    $(`#marketBtn`).addClass(`selectedPage`);
    $(`#marketBtn`).css(`background-color`, `#ef9c50`);
    $(`#ordersBtn`).removeClass(`selectedPage`);
    $(`#ordersBtn`).css(`background-color`, `#774e27`);
    $(`.marketContainer`).css(`display`, `flex`);
    $(`.ordersContainer`).css(`display`, `none`);
})

$(`#ordersBtn`).click(() => {
    $(`#ordersBtn`).addClass(`selectedPage`);
    $(`#marketBtn`).css(`background-color`, `#774e27`);
    $(`#marketBtn`).removeClass(`selectedPage`);
    $(`#ordersBtn`).css(`background-color`, `#ef9c50`);
    $(`.marketContainer`).css(`display`, `none`);
    $(`.ordersContainer`).css(`display`, `flex`);
})