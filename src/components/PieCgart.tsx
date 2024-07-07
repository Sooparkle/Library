import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

interface Item{
  doc:{
    class_nm : string;
  }
}


interface PieChartProp{
  data : Item [];
}

export const PieChart:React.FC<PieChartProp> = ({data}) => {

  ChartJS.register(ArcElement, Tooltip, Legend)

  let generic: number = 0;
  let philosophy: number = 0;
  let religion: number = 0;
  let social: number = 0;
  let natural: number = 0;
  let tech: number = 0;
  let art: number = 0;
  let language: number = 0;
  let literature: number = 0;
  let history: number = 0;

  data.forEach(element => {
    const classA = element.doc.class_nm.replace(" ", "").split(">");

    if (classA[0] === "총류") {
      generic++;
    } else if (classA[0] === "철학") {
      philosophy++;
    } else if (classA[0] === "종교") {
      religion++;
    } else if (classA[0] === "사회과학") {
      social++;
    } else if (classA[0] === "자연과학") {
      natural++;
    } else if (classA[0] === "기술과학") {
      tech++;
    } else if (classA[0] === "예술") {
      art++;
    } else if (classA[0] === "언어") {
      language++;
    } else if (classA[0] === "문학") {
      literature++;
    } else if (classA[0] === "역사") {
      history++;
    }
  });

  return (
    <div className="chart-wrap">
      <div style={{ maxWidth: "440px" }}>
        <Pie
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top"
              },
              title: {
                display: true,
                text: "가장 많이 대출한 도서 항목"
              }
            }
          }}
          data={{
            labels: ['총류', '철학', '종교', '사회과학', '자연과학', '기술과학', '예술', '언어', '문학', '역사'],
            datasets: [{
              label: '# of Books',
              data: [generic, philosophy, religion, social, natural, tech, art, language, literature, history],
              borderWidth: 1,
              backgroundColor: [
                "#4b45e6",
                "#ff6384",
                "#4cc0c0",
                "#ff9e40",
                "#9a66ff",
                "#ffcd56",
                "#c9cbcf",
                "#36bb44",
                "#37a2eb",
                "#c6e203",
              ]
            }]
          }}
        />
      </div>
      <ul style={{ placeSelf: "center" }}>
        <li>총류 : {generic}</li>
        <li>철학 : {philosophy}</li>
        <li>종교 : {religion}</li>
        <li>사회과학 : {social}</li>
        <li>자연과학 : {natural}</li>
        <li>기술과학 : {tech}</li>
        <li>예술 : {art}</li>
        <li>언어 : {language}</li>
        <li>문학 : {literature}</li>
        <li>역사 : {history}</li>
      </ul>
    </div>
  );
}