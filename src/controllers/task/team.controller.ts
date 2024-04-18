import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TeamDto } from 'src/dtos/team.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { TeamService } from 'src/services/team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService){}

    @Post('add-team')
    @UseGuards(AuthGuard)
    async addTeam(@Body() teamPayload: TeamDto){
        const taskAdded=await this.teamService.addTeam(teamPayload);
        return {taskAdded};
    }

  
}
