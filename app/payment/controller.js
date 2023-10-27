const Payment = require("./model");
const Bank = require("../bank/model")

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const payment = await Payment.find().populate('banks')

            console.log("alert");
            console.log(alert);

            res.render("admin/payment/view_payment", {
                payment,
                alert,
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },

    viewCreate: async (req, res) => {
        try {
            const banks = await Bank.find()

            res.render('admin/payment/create',{
                banks
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { banks, type } = req.body;
            let payment = await Payment({ banks, type });
            await payment.save();

            req.flash("alertMessage", "Berhasil Tambah Payment");
            req.flash("alertStatus", "success");

            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;

            const payment = await Payment.findOne({ _id: id }).populate('banks')
            const banks = await Bank.find();

            res.render("admin/payment/edit", {
                payment,
                banks
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },

    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { banks, type } = req.body;

            Payment.findOneAndUpdate(
                {
                    _id: id,
                },
                { banks, type }
            );

            req.flash('alertMessage', "Berhasil ubah Jenis Pembayaran")
            req.flash('alertStatus', "success")

            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },

    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            await Payment.findOneAndRemove({
                _id: id,
            });

            req.flash("alertMessage", "Berhasil Hapus Jenis Pembayaran");
            req.flash("alertStatus", "success");

            res.redirect("/payment");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/payment");
        }
    },
};