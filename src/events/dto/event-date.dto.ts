import { IsNotEmpty, Matches } from "class-validator";

export class EventDateDto {
    @IsNotEmpty()
    @Matches(
        /^\d{4}-\d{2}-\d{2}$/,
        { message: "Invalid date, correct format: yyyy-mm-dd" },
    )
    date: string;
}