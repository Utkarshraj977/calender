import { useState, useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import { useSwipe } from '../hooks/useSwipe';

export default function CalendarWidget() {
    
    const playFlipSound = () => {
    const audio = new Audio('/flip1.aac'); 
    audio.volume = 0.4; // Set volume (0.0 to 1.0)
    audio.play().catch(e => console.log("Audio playback blocked until user interacts."));
  };
  // 1. INITIALIZE DARK MODE FROM LOCAL STORAGE
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('calendar_theme');
    return savedTheme === 'dark';
  });

  // App State
  const [swipeDirection, setSwipeDirection] = useState("");
  const [currentView, setCurrentView] = useState(new Date());
  const [isFlipping, setIsFlipping] = useState(false);

  // API State
  const [dominantColor, setDominantColor] = useState('#3b82f6');
  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  // Month Navigation Handlers
  const prevMonth = () => {
    setSwipeDirection("right");
    setIsFlipping(true);
    playFlipSound(); // <--- Trigger sound
    setTimeout(() => {
      setCurrentView(new Date(currentView.getFullYear(), currentView.getMonth() - 1, 1));
      setIsFlipping(false);
    }, 300); // Sync timing with the CSS animation
  };

  const nextMonth = () => {
    setSwipeDirection("left");
    setIsFlipping(true);
    playFlipSound(); // <--- Trigger sound
    setTimeout(() => {
      setCurrentView(new Date(currentView.getFullYear(), currentView.getMonth() + 1, 1));
      setIsFlipping(false);
    }, 300);
  };
  const swipeHandlers = useSwipe(nextMonth, prevMonth);

  // 2. SYNC DARK MODE TO DOM AND SAVE TO LOCAL STORAGE
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('calendar_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('calendar_theme', 'light');
    }
  }, [isDarkMode]);

  // Unsplash API Call with Built-in Fallbacks
  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setIsLoadingImage(true);
      const monthIndex = currentView.getMonth();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const currentMonthName = monthNames[monthIndex];

      const fallbackImages = [
        "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552089123-2d26224fdae1?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473496169904-658ba37448eb?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=2000&auto=format&fit=crop"
      ];

      const applyFallback = () => {
        if (!isMounted) return;
        setImageUrl(fallbackImages[monthIndex]);
        setDominantColor('#3b82f6');
        setIsLoadingImage(false);
      };

      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

      if (!accessKey) {
        applyFallback();
        return;
      }

      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${currentMonthName} nature&orientation=landscape&client_id=${accessKey}`);
        if (response.ok && isMounted) {
          const data = await response.json();
          setImageUrl(data.urls.regular);
          if (data.color) setDominantColor(data.color);
        } else {
          applyFallback();
        }
      } catch (error) {
        applyFallback();
      } finally {
        if (isMounted) setIsLoadingImage(false);
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [currentView]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 transition-colors duration-300">

      {/* THEME TOGGLE */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 rounded-lg font-medium shadow-sm transition-colors cursor-pointer"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* HERO IMAGE CONTAINER */}
        <div className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm relative group">
          
          {/* LOADING SPINNER */}
          {isLoadingImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm z-30">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* SPIRAL OVERLAY (Notebook Binding) */}
          <div className="absolute top-0 left-0 w-full flex justify-around px-4 z-20 pointer-events-none opacity-80">
            {[...Array(15)].map((_, i) => (
              <svg key={i} width="20" height="40" viewBox="0 0 20 40" className="-mt-2">
                <path
                  d="M 10 0 C 25 10, 25 30, 10 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
                <circle cx="10" cy="5" r="3" fill="#374151" />
                <circle cx="10" cy="35" r="3" fill="#374151" />
              </svg>
            ))}
          </div>

          {/* IMAGE */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Monthly Theme"
              className="w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 transition-transform duration-700"
            />
          )}

          {/* DEPTH VIGNETTE */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-8">
        {/* CALENDAR GRID */}
        <div className="w-full md:w-2/3">
          <CalendarGrid
            themeColor={dominantColor}
            currentView={currentView}
            isFlipping={isFlipping}
            swipeDirection={swipeDirection}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            swipeHandlers={swipeHandlers}
          />
        </div>

        {/* NOTES SECTION */}
        <div className="w-full md:w-1/3">
          <NotesSection currentView={currentView} />
        </div>
      </div>
    </div>
  );
}