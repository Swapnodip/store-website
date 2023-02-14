import React, { useEffect, useState } from "react"
import axios from "axios"

const StorePage = (props) => {
    const [items,setItems] = useState([])
    useEffect(()=>{
        axios.get("/items")
        .then(res=>setItems(res.data))
    },[])
    return(
        <div className="StorePage">
            {items.map((i,k)=>(<div className="Item" key={k}>
                <strong>{i.name}</strong>
                <span>{i.value}&#8377;</span>
                <button onClick={()=>{axios.put("/cart",i);props.updateCount()}}>Add to Cart</button>
            </div>))}
        </div>
    )
}

export default StorePage