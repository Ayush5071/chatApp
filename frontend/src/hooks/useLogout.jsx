import { useState } from "react"

const useLogout = () => {
    const [loading,setloading] = useState(false);
    const logout = async()=>{
        setloading(true);
        try {
          cosnt res = fetch()
        } catch (error) {
                        
        } finally {
            setloading(false);
        }
    }
}

export default useLogout
