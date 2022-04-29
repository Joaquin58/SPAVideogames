function orderbyname(orden, all) {
    const nameorder = orden === 'asd' ? all.sort(function (a, b) {
        const onename = a.name.toLowerCase()
        const twoname = b.name.toLowerCase()
        if (onename > twoname) {
            return 1;
        }
        if (onename < twoname) {
            return -1;
        }

        return 0;
    }) : all.sort(function (a, b) {
        const onename = a.name.toLowerCase()
        const twoname = b.name.toLowerCase()
        if (onename < twoname) {
            return 1;
        }
        if (onename > twoname) {
            return -1;
        }
        return 0;
    })
    return nameorder
}

module.exports=orderbyname