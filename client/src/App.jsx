import { useState } from 'react'
import './App.css'
import Uploader from './components/Uploader'
import { analyzePresentation} from './services/api';
import Dashboard from './components/Dashboard';
import Logo from './assets/slidescore-logo-centered.svg';
import Floaters from './components/Floaters';

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
  <div className="app-container">
    {/* Floating slides */}
    <Floaters delay={0} x="10%" y="20%" duration={4} />
    <Floaters delay={1} x="85%" y="15%" duration={5} />
    <Floaters delay={2} x="50%" y="10%" duration={4.2} />
    <Floaters delay={0.5} x="5%" y="45%" duration={3.8} />
    <Floaters delay={1.8} x="90%" y="50%" duration={4.6} />
    <Floaters delay={0.5} x="15%" y="70%" duration={4.5} />
    <Floaters delay={1.5} x="80%" y="75%" duration={3.5} />
    <Floaters delay={2.2} x="45%" y="85%" duration={4.8} />
    
    <div className="app-card">
      {/* Logo - stays fixed */}
      <div className="app-logo">
        <img src={Logo} alt="SlideScore Logo" className="logo-image"/>
      </div>
      
      {/* Scrollable content area */}
      <div className="app-content">
        {!reportData && (
          <>
            <div className="app-hero">
              <h1 className="hero-title">Upload. Analyze. Improve.</h1>
              <p className="hero-subtitle">
                SlideScore evaluates your presentations against best practices for readability and design.
                Identify slides with text that's too small, content that's too dense, or design inconsistencies—all in seconds. 
                Perfect for presenters who want to ensure their message is clear and impactful.
              </p>
            </div>
            <div className="uploader-wrapper">
              <Uploader onAnalyze={handleAnalysis}/>
            </div>
          </>
        )}
        {reportData && <Dashboard {...reportData}/>}
      </div>
    </div>
  </div>
);
}

export default App;
