const Category=require('../../model/category');


const getCategory=async (req,res)=>{
    try{
        const userId=req.user.id;
        const categories = await Category.find({ userId }).sort({ position: 1 });
        if(!categories || categories.length ===0){
            return res.status(404).json({message:'No categories found'})
        }
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json({message:'something went wrong',error})
    }
}

module.exports={
    getCategory
}