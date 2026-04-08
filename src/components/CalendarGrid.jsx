import { useCalendarRange } from '../hooks/useCalendarRange';

// Accept the lifted state as props
export default function CalendarGrid({ themeColor, currentView, isFlipping, prevMonth, nextMonth,swipeDirection,swipeHandlers }) {
  const { startDate, endDate, phase, selectDate, clearRange } = useCalendarRange();
  
  const now = new Date();
  const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const year = currentView.getFullYear();
  const month = currentView.getMonth(); 
  
  const daysInMonthCount = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  const emptySpaces = (firstDayOfMonth + 6) % 7; 

  const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => 
    `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
  );

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const animationClass = isFlipping 
    ? (swipeDirection === "left" ? "animate-swipe-left" : "animate-swipe-right") 
    : "";

  return (
    <div 
      {...swipeHandlers}
      className="w-full h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300 flex flex-col"
      style={{ '--tw-color-theme': themeColor }} 
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          {/* Call the props passed from the parent */}
          <button onClick={prevMonth} className="p-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-200 transition-colors">&lt;</button>
          <button onClick={nextMonth} className="p-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-200 transition-colors">&gt;</button>
        </div>
      </div>

      {/* The rest of the file remains exactly the same! */}
      <div className={`transition-transform w-full h-full  ${isFlipping ? 'animate-3d-flip' : ''}`}>
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {weekDays.map((day, index) => (
            <div key={day} className={`text-xs font-bold ${index === 6 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {Array.from({ length: emptySpaces }).map((_, i) => <div key={`empty-${i}`} />)}

          {daysInMonth.map((dayString) => {
            const dayNumber = parseInt(dayString.split('-')[2]);
            const isSunday = new Date(dayString).getDay() === 0;
            const isToday = dayString === todayString;
            
            const isStart = dayString === startDate;
            const isEnd = dayString === endDate;
            const isInRange = startDate && endDate && dayString > startDate && dayString < endDate;

            const selectionStyle = (isStart || isEnd) ? { backgroundColor: themeColor, color: 'white' } : {};
            const rangeStyle = isInRange ? { backgroundColor: themeColor, opacity: 0.2 } : {};

            return (
              <div key={dayString} className="relative aspect-square">
                {isInRange && <div className="absolute inset-0 w-full h-full" style={rangeStyle}></div>}
                
                <button
                  onClick={() => selectDate(dayString)}
                  style={selectionStyle}
                  className={`
                    w-full h-full flex items-center justify-center rounded-full text-sm font-medium transition-all relative z-10
                    ${isToday && !isStart && !isEnd ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold' : ''}
                    ${isSunday && !isStart && !isEnd && !isToday ? 'text-red-500' : ''}
                    ${!isStart && !isEnd && !isInRange && !isToday && !isSunday ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                  `}
                >
                  {dayNumber}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 h-10 flex justify-end">
        {phase !== 'UNSELECTED' && (
          <button 
            onClick={clearRange}
            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 transition-colors"
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
}