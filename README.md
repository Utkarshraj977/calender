# Interactive Calendar

A responsive React calendar designed like a desktop planner, with date-range selection, monthly notes, seasonal imagery, and persistent preferences.

## Features

- Interactive start/end date-range selection
- Month-specific notes stored in `localStorage`
- Persistent dark mode
- Swipe navigation and page-turn audio
- Unsplash-powered seasonal backgrounds with fallbacks

## Tech stack

React, Vite, Tailwind CSS, browser storage, Unsplash API

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Add an Unsplash access key as `VITE_UNSPLASH_ACCESS_KEY`.
