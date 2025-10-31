export default function Slide({json}) {

    const { slide_number = 0, critical_issues = [], score = 0, warnings = [] } = json;

    return (
        <>
        <main className="text-left">
            <header>
                <h2 className="text-main text-xl font-bold">Slide {slide_number} <span className="text-p tracking-tighter">{score} <span className="text-xs">/ 100</span></span></h2>
            </header>

            <div>
                <h2 className="text-secondary-red ">Critical Issues: {critical_issues}</h2>
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