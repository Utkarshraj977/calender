import { useState, useEffect } from 'react';

// Accept the currentView prop from the parent
export default function NotesSection({ currentView }) {
  const [notes, setNotes] = useState('');

  // Create a unique key for the specific month and year (e.g., "calendar_notes_2026_3")
  const storageKey = `calendar_notes_${currentView.getFullYear()}_${currentView.getMonth()}`;

  // 1. Whenever the month changes (storageKey changes), load that month's specific notes
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    // If there are notes, set them. If not, clear the text area!
    setNotes(savedNotes || ''); 
  }, [storageKey]); 

  // 2. Handle typing and save instantly to the specific month's key
  const handleNoteChange = (e) => {
    const newText = e.target.value;
    setNotes(newText);
    localStorage.setItem(storageKey, newText);
  };

  return (
    <div className="w-full h-full min-h-[250px] p-6 bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-sm border border-yellow-100 dark:border-gray-700 flex flex-col transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
        <span>📝</span> Monthly Notes
      </h3>
      <textarea
        value={notes}
        onChange={handleNoteChange} // Use our new handler
        placeholder="Write your notes here..."
        className="w-full flex-1 min-h-[140px] p-0 bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-gray-800 dark:text-gray-200 ruled-paper leading-[28px]"
      />
    </div>
  );
}