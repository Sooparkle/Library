const http = require("http");
const express = require('express');
const path = require("path"); //디렉토리 잡을 떄 (__dirname)
const cors = require('cors');
require("dotenv").config();
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')

let corsOptions = {
  origin: '*',
  // credentials: true
}
//npm install express 
//npm install cors


//npm i dotenv



const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/*", (req, res) => {
  res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Date: Date.now()
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
  });


// 공공도서관 책 데이터 API
  app.post('/library', async (req, res)=>{
    const library =[
      {id : 1, value : 11010 , libName : "종로구" },
      {id : 2, value : 11020, libName : "중구" },
      {id : 3, value : 11030, libName : "용산구" },
      {id : 4, value : 11040, libName : "성동구" },
      {id : 5, value : 11050, libName : "광진구" },
      {id : 6, value : 11060, libName : "동대문구" },
      {id : 7, value : 11070, libName : "중랑구" },
      {id : 8, value : 11080, libName : "성북구" },
      {id : 9, value : 11090, libName : "강북구" },
      {id : 10, value : 11100, libName : "도봉구" },
      {id : 11, value : 11110, libName : "노원구" },
      {id : 12, value : 11120, libName : "은평구" },
      {id : 13, value : 11130, libName : "서대문구" },
      {id : 14, value : 11140, libName : "마포구" },
      {id : 15, value : 11150, libName : "양천구" },
      {id : 16, value : 11160, libName : "강서구" },
      {id : 17, value : 11170, libName : "구로구" },
      {id : 18, value : 11180, libName : "금천구" },
      {id : 19, value : 11190, libName : "영등포구" },
      {id : 20, value : 11200, libName : "동작구" },
      {id : 21, value : 11210, libName : "관악구" },
      {id : 22, value : 11220, libName : "서초구" },
      {id : 23, value : 11230, libName : "강남구" },
      {id : 24, value : 11240, libName : "송파구" },
      {id : 25, value : 11250, libName : "강동구" },
    ];
    
      try{
        const word = req.body.keyword
        const start = req.body.sendStartDate
        const end = req.body.sendEndDate

        for(let i = 0; i < library.length; i++){
          if(word ==library[i].libName){
            const selectedCode = library[i].value;
            console.log("Try 작동")
            
            const libraryApi = new URL('https://data4library.kr/api/loanItemSrchByLib?');
            libraryApi.searchParams.set("authKey", '43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8')
            libraryApi.searchParams.set("dtl_region", selectedCode);
            libraryApi.searchParams.set("startDt", start); //2023-01-01
            libraryApi.searchParams.set("endDt", end) //2023-12-31
            libraryApi.searchParams.set("pageSize", "10");
            libraryApi.searchParams.set("format", 'json');
    
            const options= {
              method : "GET",
              headers : {
                "Content-Type" : "application/json",
              }
            };
    
            const response = await fetch(libraryApi.toString(), options);
    
            if(!response.ok){
              // throw new Error(`Library Fetch failed at SearchForm ${response.status}`);
              throw (`Library Fetch failed at SearchForm`);
            }
    
            const data = await response.json();
            

            if(!data){
              res.json("데이터가 없습니다.")
            }
            const jsonData = data.response.docs;
    
            res.json(jsonData);
          }
          // else{
          //   console.log("검색할 수 없는 서울시 입니다.")
          // };
        };
    
      }
      catch(error){
        console.error("에러가 발생했습니다.", error.message)
      }
    
    })



app.post('/detail', async(req, res)=>{
  console.log("detail date working")
  console.log("req. body",req.body.isbn13)

  try{
    const isbn = req.body.isbn13
    const detailLibrary = new URL('http://data4library.kr/api/usageAnalysisList?');
    detailLibrary.searchParams.set("authKey", '43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8');
    detailLibrary.searchParams.set("isbn13", isbn)
    detailLibrary.searchParams.set("format", 'json');


    const options= {
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
      }
    };

    const response = await fetch(detailLibrary.toString(), options);
    
    if(!response.ok){
      throw new Error("fetch failed", response.status);
    }
    
    const data = await response.json();
    console.log("date", data)
    const jsonData = data.response;
    res.json(jsonData);
    console.log("data fetch completed", jsonData);
  }
  catch(error){
    console.error(`Detail Featch failed ${error.message}`);
    res.json({message : '데이터 정보를 가져오는데 실패 하였습니다.'})
  }
})



  // 네이버 책 이미지 검색 API
  app.post('/navebooks', async(req, res)=>{


    try {
      const title = req.body.book
      const images =[]
      for (const book of Object.values(title)){
  
  
    const naverUrl = new URL('https://openapi.naver.com/v1/search/book.json');
    naverUrl.searchParams.set('query', book);
    naverUrl.searchParams.set('display', 1);
  
    const options ={
      method : 'GET',
      headers : {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': 'ytaQUUoLOhwBVF3BCR1m',
        'X-Naver-Client-Secret': 'FQqOQ31UUj'
      }
    };
    const response = await fetch(naverUrl.toString(), options);
  
    // console.log("FetchBookImage function", response);
  
    if(!response.ok){
      throw new Error (`Naver API fetch failed ${response.status}`)
    }
  
    const data = await response.json();
  
    // console.log("Response URL", data.items[0]);
  
    images.push({
      title : data.items[0].title,
      imageURL : data.items[0].image,
      description : data.items[0].description
    })
  }
    res.json(images);
  // console.log("BookUrl List1", images)
    
  } 
  
  catch(error) {
    console.log("Error fetching data at Node", error)
  };
  })
  


  
http.createServer(app).listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
