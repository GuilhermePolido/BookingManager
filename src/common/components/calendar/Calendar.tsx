import { DateRangePicker, DateRangePickerProps } from "react-date-range";
import "./calendar.css";
import { useState } from "react";
import { addDays, isSameDay } from "date-fns";

interface CalendarProps extends DateRangePickerProps {
  onSelectionComplete: (ranges: any) => void;
}

export default function Calendar(props: CalendarProps) {
  const [selecting, setSelecting] = useState(false);
  const [tempRange, setTempRange] = useState(
    props?.ranges?.[0] ?? {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    }
  );

  const handleChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const same = isSameDay(startDate, endDate);

    if (selecting) {
      if (same) {
        const newRange = {
          ...ranges.selection,
          endDate: addDays(ranges.selection.endDate, 1),
        };
        props.onSelectionComplete?.(newRange);
        setTempRange(newRange);
      } else {
        props.onSelectionComplete?.(ranges.selection);
        setTempRange(ranges.selection);
      }
    } else {
      setTempRange(ranges.selection);
    }

    setSelecting(!selecting);
  };

  return (
    <DateRangePicker
      {...props}
      ranges={[tempRange]}
      className="custom-date-range-picker"
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      staticRanges={[]}
      inputRanges={[]}
    />
  );
}
