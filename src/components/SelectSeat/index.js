import React, { useEffect, useState } from 'react'
import "./index.css"
import { useLocation, useNavigate } from 'react-router-dom'
import {Row,Col,Button} from "react-bootstrap"

const SelectSeat = () => {
    const location = useLocation()
    const {title}= location.state
    const [seats,setSeats] = useState([])
    const [selectedSeats,setSelectedSeats] = useState([])
    const navigate = useNavigate()

    const createSeats=()=>{
        let totalRows = 5
        let totalCols = 8
        let tempSeats = []
        let row=0
        let ch = 'A'
        while(row<totalRows){
            let col = 1
            let rowArr = []
            while(col<=totalCols){
                rowArr.push(ch+col)
                col++
            }
            tempSeats.push(rowArr)
            row++
            ch = String.fromCharCode(ch.charCodeAt(0)+1)
        }
        setSeats(tempSeats)
    }

    useEffect(()=>{
        createSeats()
    },[])
  return (
    <div className='select-seat-page'>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <h3>{title}</h3>
            <div className='movie-screen'><p>Screen this side</p></div>
        </div>
        <div className='seats-con'>
            {
                seats.map((seatArr,index)=>{
                   return <Row key={index} style={{marginTop:"1rem"}}>
                        {
                            seatArr.map((seat,index)=>{
                                const isSelected = selectedSeats.indexOf(seat) > -1
                              return  <Col key={seat+index}>
                                    <Button onClick={()=>{
                                        if(selectedSeats.indexOf(seat) >-1){
                                           const  newSelectedSeats = selectedSeats.filter(eachSeat=>eachSeat !== seat)
                                           setSelectedSeats(newSelectedSeats)
                                           return
                                        }
                                        setSelectedSeats([...selectedSeats,seat])
                                    }} style={{border:"none",width:"120px",backgroundColor:isSelected ? "#4287f5":"grey"}}>{seat}</Button>
                                </Col>
                            })
                        }
                    </Row>
                })
            }
        </div>
        <div className='seats-status-con'>
            {
                selectedSeats.length > 0 ? 
                <div>
                    {selectedSeats.map(seat=><span>{seat}</span>)}
                    seats selected
                    <p>Total Rs.<span>{selectedSeats.length * 200}</span></p>
                    <Button onClick={()=>navigate("/success")}>Checkout</Button>
                </div>
                :
                <p>
                    No seats selected
                </p>
            }
        </div>

    </div>
  )
}

export default SelectSeat