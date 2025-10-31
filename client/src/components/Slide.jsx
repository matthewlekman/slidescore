const Slide = ({json}) => {
    const slideNumber = 1;
    const criticalIssues=1;
    const score = 1;
    const warnings = ['1', '2']



  return(
    <>
    <main className="text-left">
        <header>
            <h2 className="text-main text-xl font-bold">Slide {slideNumber} <span className="text-p tracking-tighter">{score} <span className="text-xs">/ 100</span></span></h2>
        </header>

        <div>
            <h2 className="text-secondary-red ">Critical Issues: {criticalIssues}</h2>
            <h2 className="text-secondary ">Score: {score}</h2>
            <ul className="text-secondary">
            <h2 className="">Warnings</h2>
            {warnings.map((warning, index) => (
                <li key={index} className="text-p-dark">- {warning}</li>
            ))}
            </ul>


        </div>

        <div>

        </div>
    </main>


    
    
    </>
  )
};


export default Slide;