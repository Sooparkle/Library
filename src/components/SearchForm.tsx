import React, { useState } from "react";
import DateRangePickers, {DateRangePickersPickers} from "./DateRangePickers";


interface SearchFormProps {
  setTitle : (title : string) => void;
  onSearch : (code : string, startDate : string | null, endDate : string |null) => void;
}

interface DataRangepickerProps {
  onDates : (data :DateRangePickers.DataRangeData) => void
}

interface DateRangePickersData {
  startDate : string | null;
  endDate : string | null;
}

export default function SearchForm(props : SearchFormProps) {
  const [selectValue, setSelectvalue] = useState<string>('종로구');
  const [selectCode, setSelectCode ] = useState<string>("11010")
  const [sendStartDate, setSendStartDate] = useState<string | null>(null);
  const [sendEndDate, setSendEndDate] = useState<string | null>(null);
  

  // useGetQuery(selectValue, sendStartDate, sendEndDate)
  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSearch(selectCode, sendStartDate, sendEndDate)
    setTitle(selectValue)
  }


  const onDates = ({ endDate :string | null, startDate : string | null }: DateRangeData) => {
    const formattedStartDate = startDate?.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedEndDate = endDate?.toISOString().slice(0, 10);

    setSendStartDate(formattedStartDate);
    setSendEndDate(formattedEndDate);
  };

  const handleValue = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const selectOption = e.target.options[e.target.selectedIndex]
    const selectedCode = selectOption.dataset.value;
    const selectedValue = selectOption.value;

    console.log("searchForm component options")

    setSelectCode(selectedCode);
    setSelectvalue(selectedValue);
  };


  return (
    <>
      <form 
        className="form" 
        onSubmit={handleOnSubmit}>

        <select
          aria-label="서울시 구립도서관 코드 선택 버튼"
          className="search-select"
          value={selectValue}
          onChange={(e)=>handleValue(e)}
        >
          <option data-value="11010" value="종로구">종로구</option>
          <option data-value="11020" value="중구">중구</option>
          <option data-value="11030" value="용산구">용산구</option>
          <option data-value="11040" value="성동구">성동구</option>
          <option data-value="11050" value="광진구">광진구</option>
          <option data-value="11060" value="동대문구">동대문구</option>
          <option data-value="11070" value="중량구">중랑구</option>
          <option data-value="11080" value="성북구">성북구</option>
          <option data-value="11090" value="강복구">강북구</option>
          <option data-value="11100" value="도붕구">도봉구</option>
          <option data-value="11110" value="노원구">노원구</option>
          <option data-value="11120" value="은평구">은평구</option>
          <option data-value="11130" value="서대문구">서대문구</option>
          <option data-value="11140" value="마포구">마포구</option>
          <option data-value="11150" value="양청군">양천구</option>
          <option data-value="11160" value="강서구">강서구</option>
          <option data-value="11170" value="구로구">구로구</option>
          <option data-value="11180" value="금천구">금천구</option>
          <option data-value="11190" value="영등포구">영등포구</option>
          <option data-value="11200" value="동작구">동작구</option>
          <option data-value="11210" value="관악구">관악구</option>
          <option data-value="11220" value="서초구">서초구</option>
          <option data-value="11230" value="강남구">강남구</option>
          <option data-value="11240" value="송파구">송파구</option>
          <option data-value="11250" value="강동구">강동구</option>
        </select>
        <DateRangePickers
          onDates={onDates}
        />

        <button 
          aria-label="서울시 구립도서관 선택 제출 버튼"
          type="submit"
        >{ }검색</button>
      </form>

    </>
  );
}
