const Voucher = require("./model");
const Category = require("../category/model")
const Nominal = require("../nominal/model")
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const voucher = await Voucher.find()
                .populate('category')
                .populate('nominals')


            console.log("alert");
            console.log(alert);

            res.render("admin/voucher/view_voucher", {
                voucher,
                alert,
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },

    viewCreate: async (req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            res.render('admin/voucher/create', {
                category,
                nominal,
            }
            );
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { name, category, nominals } = req.body;

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {
                    try {

                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        await voucher.save();
                        req.flash('alertMessage', "Berhasil Tambah Voucher")
                        req.flash('alertStatus', "success")

                        res.redirect('/voucher')

                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/voucher')
                        console.log(err);
                    }
                })
            } else {
                const voucher = new Voucher({
                    name,
                    category,
                    nominals,

                })

                await voucher.save();
                req.flash('alertMessage', "Berhasil ubah voucher")
                req.flash('alertStatus', "success")

                res.redirect('/voucher')
            }

        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/nominal");
            console.log(err);
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne()
            const nominal = await Nominal.findOne()
            const voucher = await Voucher.findOne({ _id: id })
                .populate('category')
                .populate('nominals')

            res.render("admin/voucher/edit", {
                voucher,
                nominal,
                category
            });
        } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
        }
    },

    // actionEdit: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { coinName, coinQuantity, price } = req.body;

    //         Nominal.findOneAndUpdate(
    //             {
    //                 _id: id,
    //             },
    //             { coinName, coinQuantity, price }
    //         );

    //         req.flash('alertMessage', "Berhasil ubah nominal")
    //         req.flash('alertStatus', "success")

    //         res.redirect("/nominal");
    //     } catch (err) {
    //         req.flash("alertMessage", `${err.message}`);
    //         req.flash("alertStatus", "danger");
    //         res.redirect("/nominal");
    //     }
    // },

    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            const voucher = await Voucher.findOneAndRemove({
                _id: id
            });

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnial}`;
            if (fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage)
            }


            req.flash('alertMessage', "Berhasil hapus voucher")
            req.flash('alertStatus', "success")

            res.redirect('/voucher')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
        }
    },

    actionStatus: async (req, res) => {
        try {
            const { id } = req.params
            let voucher = await Voucher.findOne({_id: id})
      
            let status = voucher.status === 'Y' ? 'N' : 'Y'
      
            voucher = await Voucher.findOneAndUpdate({
              _id : id
            }, { status })
            
            req.flash('alertMessage', "Berhasil Ubah Status")
            req.flash('alertStatus', "success")
      
            res.redirect('/voucher')
            console.log(status);
      
            
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
          }
    }
}
