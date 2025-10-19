import { useState } from 'react';
import { scenarios } from '../../data/scenarioData';

const ScenarioGame = ({ onComplete, onBack }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleChoiceSelect = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
  };

  const handleSubmit = () => {
    if (selectedChoice === null) return;

    const choice = scenario.choices[selectedChoice];
    const points = choice.points;
    const newTotal = totalPoints + points;
    
    setTotalPoints(newTotal);
    setCompletedScenarios([...completedScenarios, {
      scenario: scenario.title,
      choice: choice.text,
      outcome: choice.outcome,
      points: points,
      rating: choice.rating
    }]);
    
    // If this is the last scenario, pass the correct total to onComplete
    if (currentScenario === scenarios.length - 1) {
      // We'll call onComplete when showing summary with the correct total
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
    } else {
      setShowSummary(true);
      // The totalPoints state has been updated in handleSubmit, but we need to wait for the state update
      // So we recalculate the total from completedScenarios
      const finalTotal = completedScenarios.reduce((sum, item) => sum + item.points, 0) + 
                         scenario.choices[selectedChoice].points;
      onComplete('scenario', finalTotal);
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setTotalPoints(0);
    setCompletedScenarios([]);
    setShowSummary(false);
  };

  if (showSummary) {
    const maxPoints = scenarios.reduce((sum, s) => 
      sum + Math.max(...s.choices.map(c => c.points)), 0
    );
    const percentage = (totalPoints / maxPoints) * 100;

    return (
      <div className="scenario-container">
        <div className="scenario-summary">
          <div className="summary-header">
            <h2>All scenarios completed!</h2>
            <div className="summary-score">
              <div className="score-display">
                <span className="score-value">{totalPoints}</span>
                <span className="score-max">/ {maxPoints} points</span>
              </div>
              <div className="score-percentage">{Math.round(percentage)}% Success Rate</div>
            </div>
            <p className="summary-message">
              {percentage >= 80 ? "Outstanding decision-making!" :
               percentage >= 60 ? "Good choices! Room to grow!" :
               "Keep learning! Every decision is a lesson."}
            </p>
          </div>

          <div className="scenarios-review">
            <h3>Your Decisions</h3>
            {completedScenarios.map((item, index) => (
              <div key={index} className="scenario-review-card">
                <div className="review-header">
                  <h4>{item.scenario}</h4>
                  <span className={`rating-badge ${item.rating}`}>
                    {item.rating === 'excellent' ? 'Excellent' :
                     item.rating === 'good' ? 'Good' :
                     item.rating === 'okay' ? 'Okay' : 'Learn More'}
                  </span>
                </div>
                <p className="review-choice"><strong>Your choice:</strong> {item.choice}</p>
                <p className="review-outcome">{item.outcome}</p>
                <div className="review-points">+{item.points} points</div>
              </div>
            ))}
          </div>

          <div className="summary-actions">
            <button className="btn btn-secondary" onClick={onBack}>
              Back to Home
            </button>
            <button className="btn btn-primary" onClick={handleRestart}>
              Try Different Choices
            </button>
          </div>
        </div>
      </div>
    );
  }

  const showOutcome = selectedChoice !== null;
  const selectedChoiceData = showOutcome ? scenario.choices[selectedChoice] : null;

  return (
    <div className="scenario-container">
      <div className="scenario-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Life Scenarios</h2>
        <div className="scenario-progress">
          <div className="progress-text">
            Scenario {currentScenario + 1} of {scenarios.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="scenario-content">
        <div className="scenario-card">
          <div className="scenario-icon">{scenario.icon}</div>
          <h3 className="scenario-title">{scenario.title}</h3>
          <p className="scenario-description">{scenario.description}</p>

          <div className="choices-container">
            <h4>What would you do?</h4>
            {scenario.choices.map((choice, index) => (
              <button
                key={index}
                className={`choice-button ${selectedChoice === index ? 'selected' : ''}`}
                onClick={() => handleChoiceSelect(index)}
                disabled={showOutcome}
              >
                <div className="choice-content">
                  <span className="choice-number">{index + 1}</span>
                  <span className="choice-text">{choice.text}</span>
                </div>
                {showOutcome && selectedChoice === index && (
                  <span className={`choice-rating ${choice.rating}`}>
                    {choice.rating === 'excellent' ? '★' :
                     choice.rating === 'good' ? '✓' :
                     choice.rating === 'okay' ? '○' : '•'}
                  </span>
                )}
              </button>
            ))}
          </div>

          {!showOutcome && selectedChoice !== null && (
            <button className="btn btn-primary submit-button" onClick={handleSubmit}>
              See Outcome
            </button>
          )}

          {showOutcome && (
            <div className={`outcome-box ${selectedChoiceData.rating}`}>
              <div className="outcome-header">
                <h4>
                  {selectedChoiceData.rating === 'excellent' ? 'Excellent Choice!' :
                   selectedChoiceData.rating === 'good' ? 'Good Decision!' :
                   selectedChoiceData.rating === 'okay' ? 'Okay Choice' : 'Could Be Better'}
                </h4>
                <span className="outcome-points">+{selectedChoiceData.points} points</span>
              </div>
              <p className="outcome-text">{selectedChoiceData.outcome}</p>
              <div className="outcome-tip">
                <strong><i className="fa-solid fa-lightbulb"></i> Tip:</strong> {selectedChoiceData.tip}
              </div>
              <button className="btn btn-primary next-button" onClick={handleNext}>
                {currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'See Summary'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="current-score">
        Total Points: {totalPoints}
      </div>
    </div>
  );
};

export default ScenarioGame;
