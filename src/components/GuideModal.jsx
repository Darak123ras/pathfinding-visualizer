import React from 'react';
import './GuideModal.css';


const guideSteps = [
  {
    id: 1,
    comment: "👋 Welcome to the Pathfinding Visualizer!",
    image: "video.gif"
  },
  {
    id: 2,
    comment: "🟢 Click on the grid to place a START node.",
    image: "start.gif" 
  },
  {
    id: 3,
    comment: "🔴 Then, place the END node the same way.",
    image: "end.gif" 
  },
  {
    id: 4,
    comment: "🧠 Use the control panel to choose an algorithm (BFS, DFS, A*, or Dijkstra).",
    image: "algo.gif"
  },
  {
    id: 5,
    comment: "🧱 Click and drag on cells to create WALLS.",
    image: "walls.gif" 
  },
  {
    id: 6,
    comment: "▶️ Hit 'Visualize' to see the algorithm in action!",
    image: "visualize.gif" 
  },
  {
    id: 7,
    comment: "🧹 Use 'Reset' to clear the board or 'Generate Maze' to add random walls!",
    image: "reset.gif" 
  }
];

const GuideModal = ({ guideIndex, setGuideIndex, setShowGuide }) => {
  const currentStep = guideSteps[guideIndex];
  const isLastStep = guideIndex === guideSteps.length - 1;
  const isFirstStep = guideIndex === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setGuideIndex(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (!isFirstStep) {
      setGuideIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    setShowGuide(false);
    setGuideIndex(0); 
  };

  const handleComplete = () => {
    setShowGuide(false);
    setGuideIndex(0);
  };

  return (
    <div className="guide-overlay">
      <div className="guide-box">
      <p>{currentStep.comment}</p>
        <img
          src={`/assets/guide/${currentStep.image}`}
          alt={`Step ${guideIndex + 1}`}
          className="guide-image"
        />

        <div className="guide-buttons">
        {!isLastStep ? (
            <>
              
              {!isFirstStep && <button onClick={handlePrev}>Prev</button>}
              <button onClick={handleNext}>Next</button>
              <button onClick={handleSkip}>Skip</button>
            </>
          ) : (
            <>
              <button onClick={handlePrev}>Prev</button>
              <button onClick={handleComplete}>Let's Go!</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
