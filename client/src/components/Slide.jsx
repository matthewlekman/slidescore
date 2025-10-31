import { useState } from 'react';

const Slide = ({json}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { slide_number = 0, critical_issues = [], score = 0, warnings = [] } = json;
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  
  return (
    <>
      {/* Clickable header */}
      <div 
        className="p-4 hover:border-teal-100 transition hover:cursor-pointer flex justify-between items-center border-2 border-main rounded-xl"
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
        className={`border-2 border-t-0 border-main rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <main className="text-left">

            <div>
              <h2 className="text-secondary-red">Critical Issues: {critical_issues}</h2>
              <h2 className="text-secondary">Score: {score}</h2>
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
        </div>
      </div>
    </>
  );
};

export default Slide;
