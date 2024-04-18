import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task} from '../interfaces/task.interface';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>){ }

    async addTask(task:Task){
        const newTask=new this.taskModel(task);
        const result=await newTask.save();
        return result;
    }

    async getTasks(email:string){
        const result=await this.taskModel.find({assignee:email}).exec();
        return result;
    }

    async updateTask(taskDetails:Task, updatedDetails: Task){
        const result=await this.taskModel.findOneAndUpdate(taskDetails, updatedDetails,{new:true});
        return result;
    }  
}
