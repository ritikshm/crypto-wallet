import React, { useState, useContext } from 'react'
import logo from '../images/logo2.svg'
import { FiShoppingCart } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AccountContext } from './UserContext';
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const [hide, setHide] = useState("rightH");
  const { cart, total, setTotal, setCart, balance, setBalance } = useContext(AccountContext);
  const handleHide = () => {
    setHide("rightT")
  }
  const removeHandleHide = () => {
    setHide("rightH")
  }
  const purchaseOrder = () => {
    let remainingBalance = balance - total;
    
    if(total>balance){
      toast.warn('You do not have enough Balance for this order!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      setBalance(remainingBalance.toFixed(2));
      setCart([])
      setTimeout(() => {
        setHide("rightH")
      }, 1500);
      setTotal(0)
      toast.success('Transaction completed', {
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
  //butnow btn
  const buyNow=()=>{
    if(cart.length===0){
      toast.warn('Please add some item to cart!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      let remainingBalance = balance - total;
      if(total>balance){
        toast.warn('You do not have enough Balance for this order!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }else{
        setBalance(remainingBalance.toFixed(2));
        setCart([])
        setTimeout(() => {
          setHide("rightH")
        }, 1500);
        setTotal(0)
        
        toast.success('Transaction completed', {
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
    
  }

  const deleteItem = (item, id) => {
    const updatedItem = cart.filter((elem, ind) => {
      return ind !== id;
    })
    let remainingTotal = +item.orderPrice;
    setCart(updatedItem)
    setTotal((prev) => prev -remainingTotal)
  }

  return (
    <>
      <header>
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
        <nav
        >
          <div className='navbar'>
            <div className='leftNav'>
              <img src={logo} alt='logo' />
            </div>
            <div className='rightNav'>
              <div className='rightNavItem'>
                <button onClick={buyNow}>Buy now</button>
                <span onClick={handleHide} className='cartSpan'>My Cart &nbsp;<FiShoppingCart />
                <span className='cartVal'>{cart.length}</span>
                </span>

                <span className='spanHide'>Balance : $<span>{balance}</span></span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* //sidebar */}
      <div className={`sidebar ${hide}`} >
        <span className="backBtn" onClick={removeHandleHide}><FaArrowLeftLong /></span>
        <div className='cart'>
          <div className='wallet'>
            <IoWalletOutline />
            <p>My Balance : <span>{`$ ${balance}`}</span></p>
          </div>
          <div className='emptyCart'>
            {cart.length === 0 && <p> Nothing in the cart!</p>}
          </div>
          {cart.length === 0 ? <></> : <div className='cartItems'>
            {cart.map((item, i) => {
              let n = +item.orderPrice;

              return (
                <div className='orders' key={i}>
                  <div className='orderL'>
                    <p>{item.slug}</p>
                  </div>
                  <div className='orderR'>
                    <p>Order : $<span>{n.toFixed(2)}</span></p>
                    <div onClick={() => deleteItem(item, i)}><AiOutlineDelete /></div>
                  </div>
                </div>
              )
            })}
           

          </div>}
          {cart.length === 0 ? <></>:<div className='totalPurchase'>
              <p>Total amount</p>
              <p className='totalAmount'><span>$</span>{total.toFixed(2)}</p>
              <button className='buyNow' onClick={purchaseOrder}>Purchase</button>
            </div>}
        </div>
      </div>

    </>
  )
}

export default Navbar