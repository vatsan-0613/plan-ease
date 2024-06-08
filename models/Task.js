import mongoose, {Schema, model} from 'mongoose';

const TaskSchema = new Schema({
    creator:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 
    title : {
        type : String, 
        required : [true, 'title is required.'],
    },
    description : {
        type : String, 
    },
    due : {
        type : String, 
        required : [true, 'Tag is required.'],
    }
})

const models = mongoose.models || {};

const Task = models.Task || model('Task', TaskSchema); 

export default Task;