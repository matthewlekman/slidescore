import { useState } from 'react'
import './App.css'
import Uploader from './components/Uploader'
import { analyzePresentation} from './services/api';
import Dashboard from './components/Dashboard';

function App() {
  const [reportData, setReportData] = useState(null);


  const handleAnalysis = async (file) => {
    try {
      const result = await analyzePresentation(file);
      console.log("Analysis result: ", result);

      const { report } = result;
      const { overall_score, critical_issues, estimated_time_minutes, slide_details } = report;
      setReportData({
        score: overall_score,
        criticalIssues: critical_issues,
        estimatedTime: estimated_time_minutes,
        slide_details: slide_details
      });
    } catch (error) {
      console.error("Analysis failed: ", error);
    }
  }
  return (
    <>
      {!reportData && <Uploader onAnalyze={handleAnalysis}/>}
      {reportData && <Dashboard {...reportData}/>}
    </>
  )
}

export default App;
