import { useState } from "react";

export const DatePicker = () => {
  const [date, setDate] = useState("");
  const format  = 'YYYY-MM-DD';

  const getSeparator = () =>{
    const regex = /[^0-9a-zA-Z]+/;  //숫자 + 영문자 대소
    const match = format.match(regex);

    console.log("match", match)
    


    // if(match){
    //   const symbol = match[0]
    // }
  }

  getSeparator();
  return (
    <div>
      <input
        type="text"
        value={date}
        placeholder="날짜를 입력해주세요"
        onChange={(e)=>setDate(e.target.value)}
      />
    </div>
  );
};
