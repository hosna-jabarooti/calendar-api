import { IsString, Matches, MaxLength } from "class-validator";

export class CreateEventDto {
    @IsString()
    @MaxLength(100, { message: "title must be at most 100 characters" })
    title: string;

    @IsString()
    description: string;

    @Matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        { message: "startDateTime must be in yyyy-mm-ddTHH:mm format (UTC)" },
    )
    startDateTime: string;

    @Matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        { message: "endDateTime must be in yyyy-mm-ddTHH:mm format (UTC)" },
    )
    endDateTime: string;
}