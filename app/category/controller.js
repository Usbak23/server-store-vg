module.exports={
    index: async(req, res)=>{
        try {
            res.render('admin/category/view_category'
            )
        } catch (error) {
            console.log(err);
            
        }
    },
    viewCreate : async(req, res)=>{
        try {
            res.render('admin/category/create')
        } catch (err) {
            console.log(err);
        }
    }
}