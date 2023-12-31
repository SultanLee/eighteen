"use client"
import { useSession, signIn, signOut } from 'next-auth/react'
import './maintest.css'
import { useEffect, useState } from 'react'
import axios from "axios"

export default function MainTest()  {
const [data, setData] = useState([])
const [input, setInput] = useState("")
const [records, setRecords] = useState(data)

useEffect(()=>{
  axios.get("https://api.manana.kr/karaoke/kumyoung.json")
  .then((response)=>{setData(response.data)})

  console.log(data)
}, [])

const fetchTitle = async () => {
  const res = await fetch('api/search/searchTitle',
    {
      method: 'POST',
      body : JSON.stringify({title:input})
    })
  const result = await res.json()
  //console.log(data)
  setData(result)
  console.log(input)
  console.log(data)
}


const handleChange = (value) => {
  setInput(value)
  console.log(input)
  fetchTitle()
}


return (
    <div className="mMain">
      <h1 className={"title"}>노래방 검색</h1>
      <h3 className={"title-sub"}>※안전하지 않음</h3>
      <div className="search">
        <input
          type="text"
          placeholder="검색..."
          className="searchBar"
          value = {input}
          onInput={(e)=>handleChange(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>제공</th>
              <th>번호</th>
              <th>제목</th>
              <th>가수</th>
              <th>북마크</th>
            </tr>
          </thead>
          <tbody>
          {data && data.filter((item)=>{
              if(input===""){
                
              }
              else if(item.title.toLowerCase().includes(input.toLowerCase())){
                return item
              }
            })
            .map((item, index) => {
              return <tr key={index}>
                <td>{item.brand}</td>
                <td>{item.no}</td>
                <td>{item.title}</td>
                <td>{item.singer}</td>
                <td><button>ㅇ</button></td>
                </tr>
            })}
          </tbody>
        </table>


      </div>
    </div>
  )
}