import { Types } from "mongoose"

export interface Task{
    _id?: Types.ObjectId,
    description?: string,
    due_date?: Date,
    assignee?: string,
    status?: boolean
}