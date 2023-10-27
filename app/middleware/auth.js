module.exports = {
    isLoginAdmin: (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            req.flash("alertMessage", `Mohon Maaf Sesi Anda Telah Habis, Silahkan Login Kembali`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
        } else{
            next()
        }
    }
}