import React from 'react';
import DatePicker from './DatePicker';

interface DateRangePickerProps {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

/**
 * Simple range picker composed of two DatePicker components. Emits
 * both start and end values on change.
 */
const DateRangePicker: React.FC<DateRangePickerProps> = ({ start, end, onChange }) => {
  return (
    <div className="flex space-x-2">
      <DatePicker
        label="De"
        value={start}
        onChange={(e) => onChange(e.target.value, end)}
      />
      <DatePicker
        label="Até"
        value={end}
        onChange={(e) => onChange(start, e.target.value)}
      />
    </div>
  );
};

export default DateRangePicker;