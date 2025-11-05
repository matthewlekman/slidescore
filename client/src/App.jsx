import { useState } from 'react'
import './App.css'
import Uploader from './components/Uploader'
import { analysePresentation} from './services/api';
import Dashboard from './components/Dashboard';
import Logo from './assets/slidescore-logo-centered.svg';
import Floaters from './components/Floaters';

function App() {
  const [reportData, setReportData] = useState(null);

  const handleAnalysis = async (file) => {
    try {
      const result = await analysePresentation(file);
      console.log("Analysis result: ", result);

      const { report } = result;
      const { overall_score, critical_issues, estimated_time_minutes, slide_details } = report;
      setReportData(report);
    } catch (error) {
      console.error("Analysis failed: ", error);
    }
  }
return (
  <div className="app-container">
    <Floaters delay={0} x="10%" y="20%" duration={4} />
    <Floaters delay={1} x="85%" y="15%" duration={5} />
    <Floaters delay={2} x="50%" y="10%" duration={4.2} />
    <Floaters delay={0.5} x="5%" y="45%" duration={3.8} />
    <Floaters delay={1.8} x="90%" y="50%" duration={4.6} />
    <Floaters delay={0.5} x="15%" y="70%" duration={4.5} />
    <Floaters delay={1.5} x="80%" y="75%" duration={3.5} />
    <Floaters delay={2.2} x="45%" y="85%" duration={4.8} />
    
    <div className="app-card">
      <div className="app-logo">
        <img src={Logo} alt="SlideScore Logo" className="logo-image"/>
      </div>
      <div className="app-content">
        {!reportData && (
          <>
            <div className="app-hero">
              <h1 className="hero-title">Upload. Analyse. Improve.</h1>
              <p className="hero-subtitle">
                SlideScore evaluates your presentations against best practices for readability and design.
                Identify slides with text that's too small, content that's too dense, or design inconsistencies—all in seconds. 
                Perfect for presenters who want to ensure their message is clear and impactful.
              </p>
            </div>
            <div className="uploader-wrapper">
              <Uploader onAnalyse={handleAnalysis}/>
            </div>
          </>
        )}
        {reportData && 
          <Dashboard 
          overall_score={reportData.overall_score}
          critical_issues={reportData.critical_issues}
          estimated_time_minutes={reportData.estimated_time_minutes}
          slide_details={reportData.slide_details}
          total_slides={reportData.total_slides}
        />}
      </div>
    </div>
  </div>
);
}

export default App;
