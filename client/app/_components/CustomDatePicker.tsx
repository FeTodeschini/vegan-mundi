import React from 'react';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../_styles/datepicker.css'
import { CustomDatePickerProps } from '../_types/global';

export default function CustomDatePicker({ label, selectedDate, onDateChange }: CustomDatePickerProps) {
    return (
        <div>
            <span>{label}</span>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange}
                dateFormat="MM/dd/yyyy"
                popperPlacement="bottom"
                showPopperArrow={false}
                calendarClassName="datepicker"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select a date..."
                minDate={addDays(new Date(), 3)}
            />
        </div>
    )
}