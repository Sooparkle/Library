import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

export const DateRangePickers = ({ onDates, handleReset,setIsReset }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


useEffect(()=>{
  if (endDate){
    onDates({startDate, endDate})
  }
},[endDate])


useEffect(()=>{
  setStartDate("");
  setEndDate("");
},[setIsReset])

  return (
    <div className="search-DateRangePicker">

      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date) => setStartDate(date) }
        startDate={startDate}
        endDate={endDate}
        selectsStart
        id="startDateId"
        dateFormat="yyyy/MM/dd"
        placeholderText="검색 시작일"
        getMonthValue={(date) => (date.toLocaleDateString('ko-KR', { month: 'short' }))}

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
        getMonthValue={(date) => (date.toLocaleDateString('ko-KR', { month: 'short' }))}

      />
    </div>
  );
};
