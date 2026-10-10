import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class UpdateEventDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;
}