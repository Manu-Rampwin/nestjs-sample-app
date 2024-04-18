import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService){}

    @Post('login')
    async login(@Body() payload:LoginDto){
        try{
            if(payload.email!=process.env.EMAIL || payload.password!=process.env.password){
                return {message: 'credentials not matched', status: 401}
            }
            const access_token= await this.jwtService.signAsync({email: payload.email}) ;
            return {access_token};
        }catch(error){
            throw error;
        }
    }

}
