import Slide from './Slide.jsx'
import Chart from 'chart.js/auto';
import Report from './Report.jsx';
import { useEffect, useRef } from 'react';


export default function Dashboard({ overall_score = 0, critical_issues = [], estimated_time_minutes = 0, slide_details = [], total_slides = 0}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

   useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    
    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const getScoreColor = (overall_score) => {
      if (overall_score >= 85) return "#48e83c";   
      if (overall_score >= 60) return "#FF6B35";     
      return "#ef4444";
    };
    
    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          { 
            data: [overall_score, 100 - overall_score],
            backgroundColor: [getScoreColor(overall_score), "#ffffff"
        ],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [overall_score]);

  return(
    <>
    <main className="">
        {/* Chart */}
            <div className="flex justify-center items-center mb-5 ">
                <div className="w-50 h-50 mt-17">
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        
        <header className="mb-5 flex flex-col gap-6 ">

            <h1 className="text-6xl font-bold">
                <span className="text-main">{overall_score}</span>
                <span className="text-secondary"> / </span>
                <span className="text-secondary">100</span>
            </h1>
            
            <div className='flex justify-center items-center gap-8'>
                <h2 className="text-secondary-red text-xl">Critical Issues: {critical_issues?.length || 0}</h2>
                <h2 className="text-p text-xl">Estimated Time: {estimated_time_minutes}</h2>
            </div>
        </header>
        <Report report={{
          score: overall_score,
          critical_issues: critical_issues,
          estimated_time_minutes: estimated_time_minutes,
          total_slides: total_slides
          }} />

        <div className="slideshow grid grid-cols-1">


      {slide_details
        .filter(slide => slide.score < 100)
        .map((slide, index) => (
          <div className="rounded-lg transition hover:cursor-pointer" key={index}>
            <Slide json={slide}/>
          </div>
  ))}
    </div>
    </main>
    </>
  )
};
