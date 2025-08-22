const Tables = require("../../Modal/Tables");

const GetTables = async (req, res) => {
    try {
        // Retrieve data from the database
        const tableInfo = await Tables.find();
        // Check if any data was retrieved
        if (!tableInfo.length) {
            return res.status(404).json({ message: "No tables found" });
        }
        // Send the data as a JSON response
        res.status(200).json({table:tableInfo,status:true});
    } catch (error) {
        // Log the error message
        console.error("Error fetching tables:", error.message);
        // Send an internal server error response
        res.status(500).json({ message: "Internal server error occurred" });
    }
}

const TableInsert = async (req, res) => {
    try {
        const { name, seats } = req.body;
        // Check if a table with the same name already exists
        const existingTable = await Tables.findOne({ name });
        if (existingTable) {
            return res.json({ message: "Table already exists", status: false });
        }else{
            const TableInfo = new Tables({ name, seats });
            const TableSaveInfo = await TableInfo.save();
            res.status(200).json({ table: TableSaveInfo, status: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

const TableUpdate =  async (req,res)=>{
    try{
        const { name, seats } = req.body;
        const newTable = {};
        if (name) { newTable.name = name };
        if (seats) { newTable.seats = seats };
        let newData = await Tables.findById(req.params.id);
        if (!newData) {
            return res.status(404).send("Table Not Found");
        }
        newData = await Tables.findByIdAndUpdate(req.params.id,{
        $set: newTable }, { new: true })
        // res.json({ newData});

        res.status(200).json({ table: newData, status: true });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}



const DeleteTable =  async (req, res)=> {
    try{
        let tableInfo = await Tables.findById(req.params.id);
        console.log(tableInfo,'tableInfo');
        if (!tableInfo) {
            return res.status(404).send("Table Not Found");
        }
        tableInfo = await Tables.findByIdAndDelete(req.params.id)
        res.status(200).json({ table: tableInfo, status: true});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Some Error ouccured");
    }
}

module.exports={GetTables,TableInsert,TableUpdate,DeleteTable};