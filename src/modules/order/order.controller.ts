import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Could not found user. Cannot create order"
            })
        }

        const result = await orderService.createOrder(req.body, user.id);
        return res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not create the order!"
        })
    }
}

const getProviderOrders = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Could not found user. Cannot fetch provider orders"
            })
        }

        const result = await orderService.getProviderOrders(user.id);
        return res.status(200).json({
            success: true,
            message: "Provider orders fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch provider orders!"
        })
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        const result = await orderService.updateOrderStatus(req.body, orderId as string);
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not update order status!"
        })
    }
}

const getCustomerOrders = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Could not found user. Cannot fetch customer orders"
            })
        }

        const result = await orderService.getCustomerOrders(user.id as string);
        return res.status(200).json({
            success: true,
            message: "Customer orders fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch customer orders!"
        })
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        const result = await orderService.getOrderById(orderId as string);
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch order!"
        })
    }
}

export const orderController = {
    createOrder,
    getProviderOrders,
    updateOrderStatus,
    getCustomerOrders,
    getOrderById
}