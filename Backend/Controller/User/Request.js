const Request = require('../../Modal/Request');
const Product = require('../../Modal/Product');

const addRequest = async (req, res) => {
    try {
        const { user, products, name, address, phone, totalamount,time,table,reservation } = req.body;
        // Check if each product exists and validate product details
        for (let data of products) {
            const productExists = await Product.findById(data.productId);
            if (!productExists) {
                return res.status(400).send({ status: false, message: `Product with ID ${data.productId} not found` });
            }
        }
        // Create a new Request
        const request = new Request({
            user,
            products, // Use products array with detailed information
            name,
            address,
            phone,
            totalamount,
            time,
            table,
            reservation
        });
        // Save the order to the database
        await request.save();
        
        res.status(201).send({ status: true, message: 'Request added successfully' });
    } catch (error) {
        console.error('Error adding order:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error',message: "Something went wrong !" });
    }
};


const getRequests = async (req, res) => {
    try {
        // Define status categories
        const reqsPending = 'pending';
        const reqsRejected = 'rejected';
        const reqsAccepted = 'accepted';
        
        // Fetch all requests with populated fields
        const allreq = await Request.find()
            .populate('user')          // Populate the user field
            .populate('table')         // Populate the table field
            .exec();
        
        // Fetch requests for each status category with populated fields
        const pendingreq = await Request.find({ status: reqsPending })
            .populate('user')
            .populate('table')
            .exec();
        
        const rejectedreq = await Request.find({ status: reqsRejected })
            .populate('user')
            .populate('table')
            .exec();
        
        const acceptedreq = await Request.find({ status: reqsAccepted })
            .populate('user')
            .populate('table')
            .exec();
        // Send response with all requests and categorized requests
        res.status(200).send({
            status: true,
            allreq,
            pendingreq,
            rejectedreq,
            acceptedreq,
        });
    } catch (error) {
        console.error('Error fetching requests:', error.message);
        res.status(500).send({ status: false, message: 'Something went wrong!' });
    }
};

const getRequestsByUserId = async (req, res) => {
    try {
        const userId = req.user;
        // Define status categories
        const reqsPending = 'pending';
        const reqsRejected = 'rejected';
        const reqsAccepted = 'accepted';

        // Fetch all requests for the specific user with populated fields
        const allreq = await Request.find({ user: userId })
            .populate('user')
            .populate('table')
            .exec();

        // Fetch requests for each status category for the specific user with populated fields
        const pendingreq = await Request.find({ user: userId, status: reqsPending })
            .populate('user')
            .populate('table')
            .exec();

        const rejectedreq = await Request.find({ user: userId, status: reqsRejected })
            .populate('user')
            .populate('table')
            .exec();

        const acceptedreq = await Request.find({ user: userId, status: reqsAccepted })
            .populate('user')
            .populate('table')
            .exec();

        // Send response with all requests and categorized requests for the specific user
        res.status(200).send({
            status: true,
            allreq,
            pendingreq,
            rejectedreq,
            acceptedreq,
        });
    } catch (error) {
        console.error('Error fetching requests:', error.message);
        res.status(500).send({ status: false, message: 'Something went wrong!' });
    }
};


const updateRequest = async (req, res) => {
    try {
        let requestId = req.params.id;
        const { status, message,transactionId } = req.body;
        console.log(req.body, 'req.body;');
        
        // Validate the status
        const validStatuses = ['pending', 'rejected', 'accepted'];
        if (status && !validStatuses.includes(status)) {
            return res.send({ status: false, message: 'Invalid status' });
        }

        // Prepare update object
        const updateFields = {};
        if (status) updateFields.status = status;
        if (message) updateFields.feedback = message;
        if (transactionId) updateFields.transactionId = transactionId;

        // Find the request by ID and update its status and/or message
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            updateFields,
            { new: true } // Return the updated document
        );

        if (!updatedRequest) {
            return res.send({ status: false, message: 'Request not found' });
        }
        res.send({ status: true, message: 'Request updated successfully', updatedRequest });

    } catch (error) {
        console.error('Error updating request status:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error' });
    }
};



module.exports = {
    addRequest,
    getRequests,
    updateRequest,getRequestsByUserId
};
