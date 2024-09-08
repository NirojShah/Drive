import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name :{
        type : String,
        require:true
    },
    phone : {
        type : String,
        require:true
    },
    password :{
        type : String,
        require:true
    }
})

userSchema.methods.comparePassword = async function (dbPassword, enteredPassword) {
    // return await bcrypt.compare(enteredPassword, dbPassword)
    return enteredPassword === dbPassword
}

const User = model("users",userSchema)

export {User}