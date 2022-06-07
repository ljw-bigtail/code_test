import { Navbar, Welcome, Footer, Services, Transaction, Loader } from "./compoents"

const App = () => {
  return (
    <div className="min-h-screen">
      {/* <h1 className='text-3xl font-bold underline'>
        Hello World
      </h1> */}
      <div className="gradient-bg-welcome">
        <Navbar></Navbar>
        <Welcome></Welcome>
      </div>
      <Services></Services>
      <Transaction></Transaction>
      <Footer></Footer>
    </div>
  )
}

export default App
 