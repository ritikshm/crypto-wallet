import { createContext, useState} from "react";

export const AccountContext=createContext(null);



const UserContext = ({children}) => {
    const [cart,setCart]=useState([]);
    const [total,setTotal]=useState(0);
    const [balance,setBalance]=useState(1000);
    return (
        <AccountContext.Provider value={{cart,setCart,total,setTotal,balance,setBalance}}>
            {children}
        </AccountContext.Provider>
    )
}

export default UserContext