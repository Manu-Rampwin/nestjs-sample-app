import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { TaskDto } from 'src/dtos/task.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { TaskService } from 'src/services/task.service';
import { TeamService } from 'src/services/team.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService, private readonly teamService: TeamService){}

    @Post('add-task')
    @UseGuards(AuthGuard)
    async addTask(@Body() taskPayload: TaskDto){
        try{
            const assigneeExists=await this.teamService.findTeam({members: taskPayload.assignee})
            if(!assigneeExists){
                return {success:false, message: 'No Team Exists with the given Assignee', status: 400}
            }
            const taskAdded=await this.taskService.addTask(taskPayload);
            return {taskAdded};
        }catch(error){
            throw error;
        }
    }

    @Get('get-tasks/:email')
    @UseGuards(AuthGuard)
    async getTasks(@Param('email') assigneeEmail: string){
       try{
            const tasks=await this.taskService.getTasks(assigneeEmail);
            return {tasks};
       }catch(error){
            throw error;
       }
    }

    @Get('change-status/:taskId')
    @UseGuards(AuthGuard)
    async changeStatusOfTask(@Param('taskId') taskId:string, @Query('status') status: boolean){
        try{
            const taskUpdated=await this.taskService.updateTask({_id: new Types.ObjectId(taskId)}, {status});
            return {taskUpdated};
        }catch(error){
            throw error;
        }
    }

    @Delete('delete-task/:taskId')
    @UseGuards(AuthGuard)
    async deleteTask(@Param('taskId') taskId:string){
        try{
            const taskDeleted=await this.taskService.deleteTask(taskId);
            return {taskDeleted};
        }catch(error){
            throw error;
        }
    }
}
