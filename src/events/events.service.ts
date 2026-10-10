import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, ILike, Repository } from "typeorm";

import { Event } from "./event.entity.js";
import { CreateEventDto } from "./dto/create-event.dto.js";
import { EventStartDateDto } from "./dto/event-start-date.dto.js";
import { UpdateEventDto } from "./dto/update-event.dto.js";
import { EventDateDto } from "./dto/event-date.dto.js";
import { SearchEventDto } from "./dto/search-event.dto.js";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
    ) { }

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const { title, description, startDateTime, endDateTime } =
            createEventDto;

        const start = new Date(`${startDateTime}Z`);
        const end = new Date(`${endDateTime}Z`);

        if (start >= end) {
            throw new BadRequestException("Start date must be before end date");
        }

        const eventCount = await this.eventRepository.count();
        if (eventCount >= 1000) {
            throw new BadRequestException("Maximum number of events");
        }

        const event = this.eventRepository.create({
            title,
            description,
            startDateTime: start,
            endDateTime: end,
        });

        return this.eventRepository.save(event);
    }

    async remove(eventStartDateDto: EventStartDateDto) {
        const startDateTime = new Date(`${eventStartDateDto.startDateTime}Z`);

        const event = await this.eventRepository.findOne({
            where: {
                startDateTime,
            },
        });

        if (!event) {
            throw new NotFoundException("Event not found");
        }

        await this.eventRepository.remove(event);

        return {
            message: "Event deleted successfully",
        };
    }

    async update(
        eventId: string,
        updateEventDto: UpdateEventDto,
    ) {
        const event = await this.eventRepository.findOne({
            where: {
                id: eventId,
            },
        });

        if (!event) {
            throw new NotFoundException("Event not found");
        }
        event.title = updateEventDto.title;

        return this.eventRepository.save(event);
    }

    async findDay(eventDateDto: EventDateDto): Promise<Event[]> {
        const startOfDay = new Date(`${eventDateDto.date}T00:00:00.000Z`);
        const endOfDay = new Date(`${eventDateDto.date}T23:59:59.999Z`);

        return this.eventRepository.find({
            where: {
                startDateTime: Between(startOfDay, endOfDay),
            },
            order: { startDateTime: 'ASC' },
        });
    }

    async findWeek(eventDateDto: EventDateDto): Promise<Event[]> {
        const startDate = new Date(`${eventDateDto.date}T00:00:00.000Z`);
        const endDate = new Date(startDate);

        endDate.setUTCDate(endDate.getUTCDate() + 7);

        return this.eventRepository.find({
            where: {
                startDateTime: Between(startDate, endDate),
            },
            order: { startDateTime: 'ASC' },
        })
    }

    async findMonth(eventDateDto: EventDateDto): Promise<Event[]> {
        const startDate = new Date(`${eventDateDto.date}T00:00:00.000Z`);
        startDate.setUTCDate(1); 

        const endDate = new Date(startDate);
        endDate.setUTCMonth(endDate.getUTCMonth() + 1);

        return this.eventRepository.find({
            where: {
                startDateTime: Between(startDate, endDate),
            },
            order: { startDateTime: 'ASC' },
        })
    }

    async search(searchEventDto: SearchEventDto): Promise<Event[]> {
        const keyword = `%${searchEventDto.q}%`;

        return this.eventRepository.find({
            where: [
                {
                    title: ILike(keyword),
                },
                {
                    description: ILike(keyword),
                },
            ],
            order: { startDateTime: 'ASC' },
        });
    }

    async findConflicts(eventDateDto: EventDateDto): Promise<Event[]> {

        const events = await this.findDay(eventDateDto);

        const conflictIds = new Set<string>();
        let maxEndEvent: Event | null = null;

        for (const event of events) {
            if (maxEndEvent &&
                event.startDateTime < maxEndEvent.endDateTime) {
                conflictIds.add(maxEndEvent.id);
                conflictIds.add(event.id);
            }
            if (!maxEndEvent || event.endDateTime > maxEndEvent.endDateTime) {
                maxEndEvent = event;
            }
        }

        return events.filter((event) => conflictIds.has(event.id));
    }
}