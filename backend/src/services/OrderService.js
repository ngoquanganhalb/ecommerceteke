const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createOrder = (newOrder) => {
    return new Promise(async(resolve, reject) => {
      console.log('newOrder', newOrder)
        const { orderItems,paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body 

        try {

            // const hash = bcrypt.hashSync(password,10)
            // console.log('hash',hash)
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
                user: user,

                        
                
            })
            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS', 
                    data: createdUser
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