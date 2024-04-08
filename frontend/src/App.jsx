import useAuth from "./hooks/useAuth"

const App = () => {
  const { authData, isGuest} = useAuth()
  ;
  return (
    <>
      {isGuest  == true ? <h1>HOLA</h1> : <h1>BIENDO REGISTRADO {authData.user}</h1>}
    </>
  )
}

export default App
