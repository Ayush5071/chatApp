import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const useLogout = () => {
    const {setAuthUser} = useAuthContext()
    const [loading,setloading] = useState(false);
    const logout = async()=>{
        setloading(true);
        try {
          const res = await fetch("http://localhost:8000/api/auth/logout",{
            method:"POST",
            headers:{"Conetent-Type":"application/json"}
          })
          const data = res.json();
          if(data.error){
            throw new Error(data.error);
          }

          localStorage.removeItem("chat-user");
          setAuthUser(null);

        } catch (error) {
            toast.error(error.message)                        
        } finally {
            setloading(false);
        }
    }
    return {loading,logout};
}

export default useLogout
