import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";

export const Login = () => {
  const {loading,login} = useLogin();
  const [username,setUsername] = useState("");
  const [password,setpassword] = useState("");
  const handleSubmit = async (e)=>{
    e.preventDefault();
    await login({username,password});
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                <span className="text-white">Chat App</span>
            </h1>

            <div>
              <form onSubmit={handleSubmit}>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter Username" className="w-full input input-bordered h-10" />
                <label className="label p-2">
                    <span className="text-base label-text">Password</span>
                </label>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
                <button type="submit" className="btn btn-success btn-block mt-2"
            disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span>:"Login"}
            </button>
              </form>
            </div>
            <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                {"Don't"} have an account?
            </Link>

        </div>
    </div>
  )
}

