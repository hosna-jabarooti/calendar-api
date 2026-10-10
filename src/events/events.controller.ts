import {
    Body,
    Controller,
    Post,
    Delete,
    Patch,
    Query,
    Param,
    ParseUUIDPipe,
    Get
} from "@nestjs/common";

import { EventsService } from "./events.service.js";
import { CreateEventDto } from "./dto/create-event.dto.js";
import { EventStartDateDto } from "./dto/event-start-date.dto.js";
import { UpdateEventDto } from "./dto/update-event.dto.js";
import { EventDateDto } from "./dto/event-date.dto.js";
import { SearchEventDto } from "./dto/search-event.dto.js";

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService
    ) { }

    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @Delete()
    async remove(@Query() eventStartDateDto: EventStartDateDto) {
        return this.eventsService.remove(eventStartDateDto);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe)
        id: string,
        @Body() updateEventDto: UpdateEventDto,
    ) {
        return this.eventsService.update(
            id,
            updateEventDto,
        );
    }

    @Get('day')
    async findDay(@Query() eventDateDto: EventDateDto) {
        return this.eventsService.findDay(eventDateDto);
    }

    @Get('week')
    async findWeek(@Query() eventDateDto: EventDateDto) {
        return this.eventsService.findWeek(eventDateDto);
    }

    @Get('month')
    async findMonth(@Query() eventDateDto: EventDateDto) {
        return this.eventsService.findMonth(eventDateDto);
    }

    @Get('search')
    async search(@Query() searchEventDto: SearchEventDto) {
        return this.eventsService.search(searchEventDto);
    }

    @Get('conflicts')
    async findConflicts(@Query() eventDateDto: EventDateDto) {
        return this.eventsService.findConflicts(eventDateDto);
    }
}