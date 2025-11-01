import { useEffect, useState } from 'react';

export default function Report({report}) {
    const [reportMessage, setReportMessage] = useState([]);
    const { 
        total_slides = 0, 
        critical_issues = [], 
        score = 0, 
        warnings = [],  
        estimated_time_minutes = 0
    } = report;


    const handleScoreFeedback = () => {
        if (score >= 90) {
            setReportMessage(prev => [...prev, "Excellent work! Your presentation is well-designed and effectively communicates your message."]);
        } else if (score >= 75) {
            setReportMessage(prev => [...prev, "Good job! Your presentation is solid, but there are a few areas that could be improved for better clarity and impact."]);
        } else if (score >= 50) {
            setReportMessage(prev => [...prev, "Fair effort. Consider revising your slides to enhance readability and reduce content density."]);
        } else {
            setReportMessage(prev => [...prev, "Needs improvement. Focus on simplifying your slides, increasing text size, and ensuring design consistency to make your presentation more effective."]);
        }
    }

    const handleSlideNumberFeedback = () => {
        if (total_slides <= 10) {
            setReportMessage(prev => [...prev, "Your presentation has a manageable number of slides. Ensure each slide is concise and focused on key points."]);
        } else if (total_slides <= 30) {
            setReportMessage(prev => [...prev, "With a moderate number of slides, be cautious of overwhelming your audience. Aim for clarity and brevity on each slide."]);
        } else {
            setReportMessage(prev => [...prev, "Your presentation has a high number of slides. Consider consolidating content and focusing on the most important messages to maintain audience engagement."]);
        }
    }

    const handleCriticalIssuesFeedback = () => {
        if (critical_issues.length === 0) {
            setReportMessage(prev => [...prev, "Great! No critical issues were found in your presentation."]);
        } else {
            setReportMessage(prev => [...prev, `Attention needed: There are ${critical_issues.length} critical issues in your presentation that should be addressed to improve its effectiveness.`]);
        }
    }

    const handleTimeFeedback = () => {
        if (estimated_time_minutes <= 15) {
            setReportMessage(prev => [...prev, "Your estimated presentation time is concise. Ensure your content is clear and impactful within this timeframe."]);
        } else if (estimated_time_minutes <= 45) {
            setReportMessage(prev => [...prev, "With a moderate presentation time, balance depth of content with audience engagement."]);
        } else {
            setReportMessage(prev => [...prev, "For a longer presentation, consider breaking up content and incorporating interactive elements to maintain audience interest."]);
        }
    }

    const handleGenerateReport = () => {
        setReportMessage([]);
        handleScoreFeedback();
        handleSlideNumberFeedback();
        handleCriticalIssuesFeedback();
        handleTimeFeedback();
    }

    useEffect(() => {
        handleGenerateReport();
    }, []);

    console.log("reportMessage state:", reportMessage); 

    return (
    <div className="border-2 border-secondary rounded-2xl overflow-hidden transition-all duration-300 ease-in-out mb-5 animate-fade-in">
        <div className="p-4">
        <h2 className="text-main font-bold text-2xl">Your Tailored Feeback</h2>
        <main className="text-left py-4">
            <ul style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            color: '#333',
            fontSize: '20px',
            lineHeight: '1.6'
            }}>
            {reportMessage.map((message, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                {message}
                </li>
            ))}
            </ul>
        </main>
        </div>
    </div>
    )
}