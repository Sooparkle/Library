import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from 'date-fns/locale';


export interface DateRangePickersProps {
  onDates : (data: DateRangePickersData ) => void;
}

export interface DateRangePickersData {
  startDate: Date | null;
  endDate: Date | null;
}

export const DateRangePickers : React.FC<DateRangePickersProps> = ({ onDates }) => {
  const [startDate, setStartDate] = useState<Date |null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


useEffect(()=>{
  if (endDate){
    onDates({startDate, endDate})
  }
},[endDate])


useEffect(() => {
  const today = new Date();
  today.setDate(today.getDate() -1);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 16);

  setStartDate(oneWeekAgo);
  setEndDate(today);
}, []);

  return (
    <div className="search-DateRangePicker">

      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date)  => setStartDate(date) }
        startDate={startDate}
        endDate={endDate}
        selectsStart
        id="startDateId"
        dateFormat="yyyy/MM/dd"
        placeholderText="검색 시작일"
      />

      <DatePicker
        locale={ko}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        id="endDateId"
        dateFormat="yyyy/MM/dd"
        placeholderText="검색 종료일"

      />
    </div>
  );
};
