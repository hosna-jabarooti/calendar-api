import { IsNotEmpty, Matches } from "class-validator";

export class EventStartDateDto {
    @IsNotEmpty()
    @Matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        { message: "Invalid startDateTime, correct format: yyyy-mm-ddTHH:mm" },
    )
    startDateTime: string;
}