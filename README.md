# RentalCar

Web application for a car rental company. Browse available vehicles, filter by brand, price, and mileage, save
favorites, and book a car.

## Features

- Home page with hero banner and call-to-action
- Catalog page with server-side filtering (brand, price, mileage)
- Pagination with "Load more" button
- Favorites list persisted in localStorage
- Car details page with specifications and booking form
- Toast notifications for successful bookings

## Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand (state management)
- Axios (HTTP client)
- CSS Modules
- react-hot-toast (notifications)

## Getting Started

```bash
npm install
npm run dev

Open http://localhost:3000 in your browser.

API

Backend API: https://car-rental-api.goit.global

Routes

- / — Home page
- /catalog — Catalog with filters and pagination
- /catalog/:id — Car details and booking form
```
