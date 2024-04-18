import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  due_date: Date;

  @IsEmail()
  @IsNotEmpty()
  assignee: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean
}