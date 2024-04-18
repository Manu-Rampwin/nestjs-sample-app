import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/Interfaces/team.interface';

@Injectable()
export class TeamService {
    constructor(@InjectModel('Team') private readonly teamModel: Model<Team>){ }

    async addTeam(team:Team){
        const newTeam=new this.teamModel(team);
        const result=await newTeam.save();
        return result;
    }

   async findTeam(team: object){
        const teamExists=await this.teamModel.findOne(team);
        return teamExists;
   }
}
