const CategorySchema=require('../../Modal/Category')

const CategoryInsert = async (req, res) => {
    try {
        const { title } = req.body;
        const img = req.file.filename;
        // Check if category with the same title already exists
        const existingCategory = await CategorySchema.findOne({ title });
        if (existingCategory) {
            return res.json({
                success: false,
                message: "Category with this title already exists"
            });
        }else{
            // Create and save new category
            const CategoryInfo = new CategorySchema({ title, image: img });
            const CategorySaved = await CategoryInfo.save();
            res.status(201).json({
                success: true,
                data: CategorySaved,
                message: "Category created successfully"
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error occurred"
        });
    }
}


const GetCategory = async (req, res) => {
    try {
        const CategoryInfo= await CategorySchema.find();
        res.send(CategoryInfo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}



const DeleteCategory =  async (req, res)=> {
    try{
        let CategoryInfo = await CategorySchema.findById(req.params.id);
        if (!CategoryInfo) {
            return res.status(404).send("Not Found");
        }
        CategoryInfo = await CategorySchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Category deleted successfully", Category : CategoryInfo });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}

const UpdateCategory =  async (req,res)=>{
    try{
        const {title}=req.body;
        // const img=req.file.filename;
        const newCategory = {};
        if (title) { newCategory.title = title };
        if (req.file) { newCategory.image = req.file.filename };
        let newData = await CategorySchema.findById(req.params.id);
        if (!newData) {
            return res.status(404).send("Not Found");
        }
        newData = await CategorySchema.findByIdAndUpdate(req.params.id,{
        $set: newCategory }, { new: true })
        res.json({ newData});

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}




module.exports={CategoryInsert,GetCategory,DeleteCategory,UpdateCategory};