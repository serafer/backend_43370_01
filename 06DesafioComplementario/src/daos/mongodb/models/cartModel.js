import mongoose from "mongoose"

const cartProductSchema = new mongoose.Schema(
    {

        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
    });

    const cartSchema = new mongoose.Schema(
        {

            products: {
                type: [cartProductSchema], required: true
            },
        }

);

export const CartsModel = mongoose.model("carts", cartSchema);