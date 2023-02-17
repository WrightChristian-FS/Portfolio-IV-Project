import {Routes, Route} from 'react-router-dom'; 
import Nav from './components/NavigationBar'; 
import Search from './components/Search';
import Home from './components/Home'
import UnitedStates from './pages/UnitedStates'
import Brazil from './pages/Brazil'
import Canada from './pages/Canada';
import Mexico from './pages/Mexico'; 


function App() { 
  return(
    <div style={styles.container}>
      
        <Nav/>
        <section style={styles.test}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/UnitedStates' element={<UnitedStates />}/>
            <Route path='/Brazil' element={<Brazil />}/>
            <Route path='/Canada' element={<Canada />}/>
            <Route path='/Mexico' element={<Mexico />}/>
          </Routes>
        </section>
    </div>
  )
}

export default App; 

const styles = { 
  container: { 
    backgroundColor: '#6290C3 ', 
    display: 'flex', 
    flexDirection: 'row',
  }, 

}