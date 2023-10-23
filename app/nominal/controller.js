const Nominal = require("./model")

module.exports = {
    index: async(req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus}
            const nominal = await Nominal.find()
        } catch (err) {
            console.log(err);
        }
    }
}