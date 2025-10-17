




const addCard= async (req,res)=>{
    try{
        const userId=req.user.id;
        const {title, description, tag, color, categoryId,columnIndex, position}=req.body;
        const cardCount= await Card.countDocuments({categoryId})
        const card = new Card({
            title,
            description,
            tag,
            color,
            categoryId: new mongoose.Types.ObjectId(categoryId),
            userId: new mongoose.Types.ObjectId(userId),
            position:position ?? cardCount,
            columnIndex:columnIndex ?? 0
        });
        await card.save();
        res.status(201).json({message:'card added successfully',card});
    }catch(error){
        console.error(error)
        res.status(500).json({message:'something went wrong',error})
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
        const deletedCard=await Card.findById(id);
        if(!deletedCard){
            return res.status(404).json({message:'Card not found'});
        }
        const {columnIndex,position}=deletedCard;
        await Card.findByIdAndDelete(id);
        await Card.updateMany(
          {
          columnIndex :columnIndex, position:{$gt:position}
          },{
            $inc:{position:-1}
          }
      )
        res.status(200).json({message:'Card deleted successfully'})
    }catch(error){
        res.status(500).json({message:'Failed to delete card', error})
    }
}


