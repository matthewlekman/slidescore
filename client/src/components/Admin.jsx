import Slide from './Slide.jsx'
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';


const AdminPage = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const score = 54;
  const criticalIssues= [1,2];
  const estimatedTime = 5.4;
  const slides = [[12,53],[53,2]]

   useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    
    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    
    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          { 
            data: [score, 100 - score],
            backgroundColor: ["#48e83c", "#e0ffff"],
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
  }, [score]);

  return(
    <>
    <main className="">
        {/* Chart */}
            <div className="flex justify-center items-center mb-5 ">
                <div className="w-50 h-50">
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        
        <header className="mb-5 flex flex-col gap-6 ">

            <h1 className="text-6xl font-bold">
                <span className="text-p">{score}</span>
                <span className="text-secondary"> / </span>
                <span className="text-secondary">100</span>
            </h1>
            
            <div className='flex justify-center items-center gap-8 font-bold'>
                <h2 className="text-secondary-red text-xl">Critical Issues: {criticalIssues.length || 0}</h2>
                <h2 className="text-secondary-red text-xl">Estimated Time: {estimatedTime}</h2>
            </div>
        </header>


        <div className="slideshow flex gap-10">
      {slides.map((slide, index) => (
        <div className="border-2 rounded-lg p-4 border-main hover:bg-amber-100 transition hover:cursor-pointer">
        <Slide key={index} json={slide}/>
        </div>
      ))}
    </div>
    </main>


    
    
    </>
  )
};


export default AdminPage;
