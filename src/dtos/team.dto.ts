import {IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class TeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray({})
  @IsEmail({},{each:true})
  members: Array<string>;  
}