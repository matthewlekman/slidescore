import { useState } from 'react';

const Slide = ({json}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { slide_number = 0, critical_issues = [], score = 0, warnings = [] } = json;
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="flex flex-col gap-2">
      {/* Clickable header */}
      <div 
        className="p-4 hover:border-secondary transition hover:cursor-pointer flex justify-between items-center border-2 border-main rounded-full bg-white"
        onClick={toggleDropdown}
      >
        <span className="text-main text-xl font-bold">
          Slide {slide_number}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-p tracking-tighter">
            {score} <span className="text-xs">/ 100</span>
          </span>
          <span 
            className="text-gray-500 text-sm transition-transform duration-300"
            style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}
          >
            ▼
          </span>
        </div>
      </div>
      
      {/* Dropdown content with smooth animation */}
      <div 
        className={`border-2 border-main rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <main className="text-left">
            <div>
              <div className="flex justify-evenly py-2">
                <div className='flex flex-col items-center justify-center bg-red-50 rounded-full w-40 h-40 border-2 border-transparent hover:border-main transition-colors duration-300'>
                  <h1 className="text-red-400 font-bold text-2xl">{critical_issues ? critical_issues.length : 0}</h1>
                  <h2 className="text-secondary-red text-sm">{critical_issues.length === 1 ? 'Critical Issue' : 'Critical Issues'}</h2>
                </div>
                <div className="flex flex-col items-center justify-center bg-secondary rounded-full w-40 h-40 border-2 border-transparent hover:border-main transition-colors duration-300">
                  <h1 className="text-secondary-red font-bold text-2xl">{score}</h1>
                  <h2 className="text-p">Score</h2>
                </div>
              </div>
              <ul className="text-p list-disc list-inside py-2 text-middle">
                {warnings.length > 0 && <h2 className="font-semibold mb-2">Warnings</h2>}
                {warnings.map((warning, index) => (
                  <li key={index} className="text-p-dark">{warning}</li>
                ))}
              </ul>
              <ul className="text-p list-disc list-inside py-2">
                {critical_issues.length > 0 && <h2 className="text-red-500 font-semibold mb-2">Critical Issues</h2>}
                {critical_issues.map((issue, index) => (
                  <li key={index} className="text-p-dark">{issue}</li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Slide;