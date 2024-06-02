import React, { useState, useEffect ,useContext} from 'react'
import axios from 'axios';
import { MdOutlineRefresh } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { AccountContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import r1 from "../images/r1.gif"

const Home = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true)
    const [orderValue, setOrderValue] = useState("")
    const { setCart,setTotal} = useContext(AccountContext);
    

    const url = "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";
   

    useEffect(() => {
        setLoading(false)
        axios
            .get(url)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err => {
                console.log(err);
            }))
        setTimeout(() => setLoading(true), 1000)

    }, [refresh])
    const getData=(item,orderValue)=>{
        
        item.orderPrice=orderValue
        let orderTotal=+item.orderPrice;
        if(orderTotal>0){
            setCart((prev)=>[...prev,item])
            setTotal((prev)=>prev+orderTotal)
            setRefresh(refresh+1)
            setOrderValue("")
            console.log(item);
        }else{
            toast.warn('Please add some amout before adding to cart!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        
    }
    
    const orderValueChange=(event)=>{
        const value=event.target.value
        setOrderValue(value)
    }
    
 


    return (
        <>
         <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
            
                <div className='refresh'>
                    <button onClick={()=>setRefresh(refresh+1)}>Refresh <MdOutlineRefresh /></button>
                </div>
                {loading?<div>
                <div className='section'>
                    <div className='dataTable'>
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Coin</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price(US$)</th>
                                    <th scope="col">Order</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {data.map((item, i) => (
                                    
                                    <tr key={i}>
                                        <td>{item.slug}</td>
                                        <td>{item.symbol}</td>
                                        <td>{item.metrics.market_data.price_usd.toFixed(2)}</td>
                                        <td className='specialTd'><input type="number" id="order" name={`${i}`}  onChange={orderValueChange}  placeholder="Enter amount"  /><button onClick={()=>getData(item,orderValue)}><FiShoppingCart/><span className='hideAdd'>Add to cart</span></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                
            </div>:

            <div className='loader'>
                <img src={r1} alt='loading' />
            </div>}
        </>
    )
}

export default Home