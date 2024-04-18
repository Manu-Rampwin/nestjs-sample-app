import * as mongoose from 'mongoose';

export const TaskSchema=new mongoose.Schema({
        description: String,
        due_date: Date,
        assignee: String,
        status: Boolean
    },
    {timestamps:true}
)

