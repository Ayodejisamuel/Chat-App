import { response } from "express";
import Messages   from '../model/messageModel.js'

export const getAllMessage = async (req, res, next) => {

    try {
         const {from , to} = req.body;

         if(!from || !to) {

            return res.json({msg: 'both sender and receiver are important'})
            
         }

         const messages = await Messages.find({
            users: {$all: [from, to]},
 
         }).sort({updatedAt: 1})

     const projectedMessages = messages.map( (message) => ({
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
 
     }))

         return res.json(projectedMessages);
    } catch (error) {
        next(error);
    }


}

export const addMessage = async (req, res, next) => {

    try {
        const {from , to, message}  = req.body;

        const data = await Messages.create({

           message: {text: message},
           users: [from, to],
           sender: from,
        

        })

        if(data) return res.json({msg: 'Messages created successfully'})
        return res.json({msg: 'Messages failed to be creatted successfully'});
    } catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ msg: 'Server error' });
    }

}

