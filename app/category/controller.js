

module.exports={
    index: async(req, res)=>{
        try {
            res.render('index',{
                title: 'expreess js'
            })
        } catch (error) {
            console.log(err);
            
        }
    }
}