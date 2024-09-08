import { model, Schema } from "mongoose";

const fileSchema = new Schema({
    file :{
        name:{
            type : String,
            require : true
        },
        contentType : {
            type : String,
            require : true
        },
        data : {
            type : Buffer,
            require:true
        }
    },
    to:[{
        id : String,
        // unique:true
    }],
    owner : {
        type:String,
        require:true
    }
})

const Files = model("files",fileSchema)

export {Files}