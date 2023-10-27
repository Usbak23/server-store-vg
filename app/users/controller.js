const User = require('./model')
const bcrypt = require('bcryptjs')


module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };


            console.log("alert");
            console.log(alert);

            res.render("admin/users/view_signin", {
                alert,
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
        }
    },

    actionSignin: async (req, res) => {
        try {
            const { email, password } = req.body
            const check = await User.findOne({ email: email })

            if (check) {
                if (check.status === 'Y') {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if (checkPassword) {
                        res.redirect("/dashboard");
                    } else {
                        req.flash("alertMessage", `Kata Sandi Yang Anda Masukan Salah`);
                        req.flash("alertStatus", "danger");
                        res.redirect("/");
                    }

                } else {
                    req.flash("alertMessage", `Mohon Maaf Status Anda Belum Aktif`);
                    req.flash("alertStatus", "danger");
                    res.redirect("/");
                }

            } else {
                req.flash("alertMessage", `Email Yang Anda Inputkan Salah`);
                req.flash("alertStatus", "danger");
                res.redirect("/");
            }
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
        }
    }
}