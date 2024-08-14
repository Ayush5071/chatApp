import MessageContainer from "../../components/MessageContainer"
import Sidebar from "../../components/Sidebar"

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[780px] h-[350px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer/>         
    </div>
  )
}

export default Home
