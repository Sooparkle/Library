import { useQuery } from "@tanstack/react-query"

export const fetcingData = async (libCode, start, end) =>{
  console.log("helper", libCode)
  console.log("helper1", start)
  console.log("helper2", end)
    try{
      const resposne = await 
      // fetch(`http://data4library.kr/api/loanItemSrch?authKey=${process.env.REACT_APP_LIBRARY}&libCode=${libCode}&startDt=${start}&endDt=${end}&pageSize=20&format=json`)
      // fetch("https://jsonplaceholder.typicode.com/todos/")
      console.log("URL",resposne )
    if(!resposne.ok) {
      throw new Error ('Access successful but serer access failed', resposne.status)
    }
    // Library process

    const data =  await resposne.json(); 

    const datalist = await data.response.docs
    console.log("helper page data", datalist)
      return datalist
      // sessionStorage.setItem(title, datalist)

      // const data = resposne.json()
      // return data
    }
    catch(error){
        console.error("데이터를 가져오는 데 실패하였습니다.", error)
    }
    finally{}

  }


export const useGetQuery = (code, start, end) =>{
  return  useQuery({
    queryKey : ['library', end],
    queryFn : () => fetcingData(code, start, end),
  })
}
