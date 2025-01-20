 const OrderService = require('../services/OrderService')

// const createOrder = async (req, res) => {
//     try {

//         const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
//         // console.log('req', req.body)

//         if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The input is required'
//             })
//         }
//         const response = await OrderService.createOrder(req.body)
//         return res.status(200).json(response)
//     }
//     catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }



const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body;

        console.log('Received data:', req.body); // Log dữ liệu nhận từ client

        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            console.log('Validation failed: Missing required fields');
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }

        const response = await OrderService.createOrder(req.body);
        console.log('OrderService response:', response);

        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in createOrder controller:', e); // Log lỗi chi tiết
        return res.status(404).json({
            message: e.message || 'Something went wrong',
        });
    }
};
module.exports = {
    createOrder

}