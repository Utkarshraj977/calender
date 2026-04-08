import { useReducer } from 'react';

const initialState = { startDate: null, endDate: null, phase: 'UNSELECTED' };

function rangeReducer(state, action) {
  switch (action.type) {
    case 'CLICK_DATE':
      const clickedDate = action.payload;
      if (state.phase === 'UNSELECTED') {
        return { startDate: clickedDate, endDate: null, phase: 'START_SELECTED' };
      }
      if (state.phase === 'START_SELECTED') {
        const isBefore = new Date(clickedDate) < new Date(state.startDate);
        return { 
          startDate: isBefore ? clickedDate : state.startDate, 
          endDate: isBefore ? state.startDate : clickedDate, 
          phase: 'RANGE_SELECTED' 
        };
      }
      if (state.phase === 'RANGE_SELECTED') {
        return { startDate: clickedDate, endDate: null, phase: 'START_SELECTED' };
      }
      return state;
    case 'CLEAR': // New Clear Action
      return initialState;
    default:
      return state;
  }
}

export function useCalendarRange() {
  const [state, dispatch] = useReducer(rangeReducer, initialState);
  const selectDate = (date) => dispatch({ type: 'CLICK_DATE', payload: date });
  const clearRange = () => dispatch({ type: 'CLEAR' }); // Export clear function

  return { ...state, selectDate, clearRange };
}