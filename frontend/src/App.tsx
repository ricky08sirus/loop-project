import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoadData } from "./hooks/useLoadData";
function App() {
  const { rawData, loading } = useLoadData();

  if (loading) return <div>Loading...</div>;


  return (
    <div>
      <h1>Filterable Data Table</h1>
      <pre>{JSON.stringify(rawData.slice(0, 5), null, 2)}</pre>
    </div>
    


     
    
  )
}

export default App
