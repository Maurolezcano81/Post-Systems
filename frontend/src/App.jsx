import useAuth from "./hooks/useAuth"
import NavBar from "./components/Navbar/NavBar"
import Post from "./components/Posts/Post"
import Posts from "./pages/Posts"
const App = () => {
  return (
    <>
      <NavBar />
      <Posts />
    </>
  )
}

export default App
