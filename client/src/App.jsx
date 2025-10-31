import { useState } from 'react'
import './App.css'
import Uploader from './components/Uploader'
import { analyzePresentation} from './services/api';

function App() {
  const handleAnalysis = async (file) => {
    try {
      const result = await analyzePresentation(file);
      console.log("Analysis result: ", result);
    } catch (error) {
      console.error("Analysis faiiled: ", error);
    }
  }

  return <Uploader onAnalyze={handleAnalysis}/>
}

export default App;
