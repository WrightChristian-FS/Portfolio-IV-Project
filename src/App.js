import {Routes, Route} from 'react-router-dom'; 
import Nav from './components/NavigationBar'; 
import Search from './components/Search';


function App() { 
  return(
    <div style={styles.container}>
      <main>
        <Nav></Nav>
        <section>
          <Routes>
            <Route path='/' element={<Search/>}/>
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default App; 

const styles = { 
  container: { 
    backgroundColor: '#6290C3 ', 
    height: '100vh'
  }
}