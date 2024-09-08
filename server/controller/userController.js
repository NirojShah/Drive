import { User } from "../model/users.js"
import jwt from "jsonwebtoken"



const generateToken = (id) => {
    return jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


const signup = async(req,res)=>{
    try{
        const {name,password,phone} = req.body
        const newUser = await User.create({
            name,password,phone
        })
        if(newUser){
            res.status(200).json({
                status :"success",
                message : "signed up successfully.."
            })
        }
    }catch(err){
        res.status(400).json({
            status : "failed",
            message : err.message
        })
    }
}

const login = async (req, res) => {
    try {

        const {name,password} = req.body
        console.log(req.body)
        let existingUser = await User.findOne({
            name: req.body.name
        })
        console.log(existingUser)
        if (!existingUser || !await existingUser.comparePassword(existingUser.password, req.body.password)) {
            return res.status(400).json({
                status: "failed",
                msg: "Please recheck the password"
            })
        }
        const token = generateToken(existingUser._id)
        res.status(200).json({
            status: "success",
            token,
            data: {
                existingUser
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}


export{signup,login}