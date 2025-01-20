const Order = require("../models/OrderProduct")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        console.log('newOrder', newOrder)
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder

        try {

            const createdOrder = await Order.create({
                orderItems,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    phone

                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user

            })
            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrder
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createOrder,

}