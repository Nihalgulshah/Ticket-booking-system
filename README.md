## TICKET BOOKING SYSTEM

This is a full stack ticket booking system built using Node.j,Express,PostgreSQL,React,TypeScript, and Vite.


Features

## User Features Ticket Booking System
- View available shows  
- Visual seat selection grid  
- Safe booking with transaction locks  
- Updated real-time seat availability  

## Admin Features
- Create new shows  
- View all shows  
- Manage start times & seat counts  


## Tech Stack

## Backend
- Node.js  
- Express.js  
- PostgreSQL  
- SQL transactions + row level locking  
- REST API architecture  

## Frontend
- React (TypeScript)  
- Vite  
- Axios  
- Context API  


##  Database Schema

## shows  Table
| Column | Type |
|--------|------|
| id | serial primary key |
| name | text |
| start_time | timestamp |
| total_seats | int |
| booked_seats | int |

## bookings Table
| Column | Type |
|--------|------|
| id | serial primary key |
| show_id | int references shows(id) |
| seats | int |
| status | text |


## Concurrency Control

Seat booking uses:

sql
SELECT * FROM shows WHERE id = $1 FOR UPDATE;

## Backend
cd backend
npm install
cp .env.example .env
npm run dev


## Frontend
cd frontend
npm install
cp .env.example .env
npm run dev


## Demo Flow
Open frontend (Home page)
Create a show (Admin)
Book seats for a show
Confirm booking
Check availability updates
View bookings list

