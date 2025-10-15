const Card=require('../../model/card');
const mongoose=require('mongoose')

const addCard= async (req,res)=>{
    console.log('reached addCard')
    try{
        const userId=req.user.id;
        const {title, description, tag, color, categoryId}=req.body;
        const card = new Card({
            title,
            description,
            tag,
            color,
            categoryId: new mongoose.Types.ObjectId(categoryId),
            userId: new mongoose.Types.ObjectId(userId),
            position:0
        });
        await card.save();
        res.status(201).json({message:'card added successfully',card});
    }catch(error){
        console.error(error)
        res.status(500).json({message:'something went wrong',error})
    }
}

const getCard=async (req,res)=>{
    try{
        const userId=req.user.id;
        const cards=await Card.find({userId}).sort({position:1})
        res.status(200).json(cards)
    }catch(error){
        res.status(500).json({message:'Failed to fetch cards'})
    }
}

const editCard=async (req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,tag,color}=req.body;
        const card=await Card.findByIdAndUpdate(
            id,
            {title,description,tag,color},
            {new:true}
        )
        if(!card){
            return res.status(404).json({message:'Card not found'});
        }
        res.status(200).json({message:'Card updated successfully',card})
    }catch(error){
        res.status(500).json({message:'Failed to update card', error})
    }
}

const deleteCard= async (req,res)=>{
    try{
        const {id}=req.params;
        const deletedCard=await Card.findByIdAndDelete(id);
        if(!deletedCard){
            return res.status(404).json({message:'Card not found'});
        }
        res.status(200).json({message:'Card deleted successfully'})
    }catch(error){
        res.status(500).json({message:'Failed to delete card', error})
    }
}



const getTag=async (req,res)=>{
    try{
        const tags= await Card.distinct('tag');
         const filteredTags = tags.filter(tag => tag && tag.trim() !== "");
        console.log(tags)
        res.status(200).json({tags:filteredTags })
    }catch(error){
        res.status(500).json({message:'Failed to fetch cards'})
    }
}


const updateCardCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const { categoryId } = req.body; 
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { categoryId },
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({
      message: "Card category updated successfully",
      card: updatedCard,
    });
  } catch (error) {
    console.error("Error updating card category:", error);
    res.status(500).json({ message: "Failed to update card category" });
  }
};





module.exports={
    addCard,
    getCard,
    editCard,
    deleteCard,
    getTag,
    updateCardCategory
}