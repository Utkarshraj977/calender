📅 Interactive Monthly Calendar Widget
    A high-performance, responsive calendar application built with React 18 and Tailwind CSS v4. This project features dynamic theming, interactive date range selection, persistent month-specific note-taking, and immersive audiovisual feedback.


🎨 Design Philosophy
    The widget is designed to feel like a physical desktop planner. It combines modern glassmorphism with a classic "spiral-bound" notebook aesthetic, using dominant color extraction to ensure the UI feels organic to the current season.


✨ Key Features
    🖼️ Dynamic Seasonal Imagery: Fetches high-resolution nature landscapes from the Unsplash API tailored to the current month.

    🗓️ Smart Range Selection: A 3-phase interactive selection system (Start → End → Reset) with fluid range highlighting.

    📓 Persistent Per-Month Notes: A ruled-paper notebook section that saves unique data for every month/year combination using localStorage.

    🌓 Cross-Session Dark Mode: A manual theme toggle with persistent state memory.

    🎭 Tactile Animations: Custom CSS perspective transitions and synchronized audio feedback (page-turn sounds) for a physical feel.



🧠 Architectural Choices
    Tailwind v4 (CSS-First): Leverages the new engine for lightning-fast builds and zero-runtime CSS overhead.

    State Lifting: The "View" state is centralized in the parent component to keep the Calendar, Notes, and Background API in perfect sync.

    API Resilience: Includes a hardcoded fallback asset array to ensure the UI remains beautiful even if Unsplash rate limits are hit.

    Native Audio: Uses the native Browser Audio API for zero-dependency sound triggers during month transitions.


🛠️ Tech Stack
    Frontend: React 18 (Vite)

    Styling: Tailwind CSS v4 (using the @tailwindcss/vite plugin)

    API Integration: Unsplash API for dynamic seasonal imagery

    State Management: React Hooks (useState, useEffect, useReducer)

    Persistence: Browser localStorage


🚀 Local Setup
    
    1. Clone & Install
        Bash
        git clone [your-repo-link]
        cd cal
        npm install
    2. Environment Configuration
        Create a .env file in the root directory and add your Unsplash credentials:

        Code snippet
        VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
    3. Launch
        Bash
        # Start development server
        npm run dev

        # Build for production
        npm run build


📁 Project Structure

    src/
    ├── components/
    │   ├── Calendar/       # Logic for date grids & range selection
    │   ├── Notebook/       # Ruled-paper UI and persistence logic
    │   └── UI/             # Reusable buttons, toggles, and glass containers
    ├── hooks/              # useLocalStorage & useColorExtraction
    ├── assets/             # Audio files for tactile feedback
    └── App.jsx             # Main state orchestrator



