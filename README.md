Calendar API

This project is a RESTful Calendar API built with NestJS, TypeScript, TypeORM, and PostgreSQL.

I implemented the main calendar features required in the task, including: create, delete, edit, list, search, and detect conflicts in Events.

Setup

First install the project deopendencies:
```bash
npm install
```

Create a .env file in the root directory. (I've written in .env.sample file)
the PostgreSQL database should be available with the same connection information.

After that run the project with:
```bash
npm run start:dev
```

The API will be available on:  
http:localhost:3000 (or 300)

API Endpoints

Create Event  
POST /events

• The request body includes:

• title
• description
• startDateTime
• endDateTime

Example:
```
{
"title": "Team Meeting",
"description": "Some description..",
"startDateTime": "2026-10-02T10:00",
"endDateTime:: "2026-10-02T11:00"
}
```
——————————————————————————————————————————————

Delete Event
```
DELETE /events?startDateTime=2026-10-02T10:00
```
I used the start date/time as the query parameter because the task specifies removing an event based on its start date/time.
——————————————————————————————————————————————

Update Event  
PATCH /events/:id

updates the title of an event: expmple PATCH /events/4b4a79f0-4e9e-4b5e-9c13-efa8bee72bee
The task didn't specify how the event should be identified when editing its title, so I used the event id as a path parameter because it's suitable for updating a specific resource.
——————————————————————————————————————————————

Get Events of a Day/Week/Month
```
GET /events/day?date=2026-10-02
```
```
GET /events/week?date=2026-10-02
```
```
GET /events/month?date=2026-10-02
```

returns the events from the specified date.
——————————————————————————————————————————————

Search Events
```
GET /events/search?q=mee
```

searches events by keyword. (the search is case-insensitive)
——————————————————————————————————————————————

Get Conflicting Events
```
GET /events/conflicts?date=2026-10-02
```

returns all events that have time conflicts.
I used sort list then handled then in memory by tracking the maximun end time of previous events.


Response Format
the API returns the complete information of event (including id).

Example:

```
{
"id": "70f9d293-0a9e-497c-84fd-7a095da0ea57",
"title": "second meeting",
"description": "some description",
"startDateTime": "2026-09-28T10:00:00.000Z",
"endDateTime": "2026-09-28T11:00:00.000Z",
"createdAt": "2026-09-28T13:16:04.966Z",
"updatedAt": "2026-09-28T13:16:04.966Z"
},
```
(the Z in the end of dates is shown because of UTC timezone).

Project Structure
it follows NestJS modular architecture:

```
src/
|— events/
|   |—dto/ (used for request validation)
|   |—event.entity.ts
|   |—events.controller.ts (handles HTTP requests)
|   |—events.module.ts
|   |_events.service.ts (main logic)
|   
|
|— migrations/
|— app.module.ts (also controller & service)
|_ main.ts (also ../data-source for PostgreSQL Migrations)
```
