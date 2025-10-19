import { useState } from 'react';
import './FinancialWellness.css';
import ScenarioGame from './ScenarioGame';
import BudgetSimulator from './BudgetSimulator';
import MazeGame from './MazeGame';
import ProgressTracker from './ProgressTracker';

const FinancialWellness = () => {
  const [currentModule, setCurrentModule] = useState('home');
  const [userProgress, setUserProgress] = useState({
    quizScore: 0,
    scenariosCompleted: 0,
    budgetsMade: 0,
    totalPoints: 0,
    level: 1,
    badges: []
  });

  const modules = [
    {
      id: 'maze',
      title: 'Maze Navigator',
      icon: 'fa-solid fa-map-location-dot',
      description: 'Navigate life\'s financial maze from college to retirement! Now with quiz questions!',
      color: '#8B1538'
    },
    {
      id: 'scenario',
      title: 'Life Scenarios',
      icon: 'fa-solid fa-people-group',
      description: 'Real situations, real choices. What would you do?',
      color: '#A52A4A'
    },
    {
      id: 'budget',
      title: 'Budget Builder',
      icon: 'fa-solid fa-calculator',
      description: 'Time to build your first budget (or improve your current one!)',
      color: '#C44E6A'
    }
  ];

  const updateProgress = (type, value) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      
      switch(type) {
        case 'quiz':
          newProgress.quizScore += value;
          newProgress.totalPoints += value;
          break;
        case 'scenario':
          newProgress.scenariosCompleted += 1;
          newProgress.totalPoints += value;
          break;
        case 'budget':
          newProgress.budgetsMade += 1;
          newProgress.totalPoints += value;
          break;
      }

      // Level up system
      const newLevel = Math.floor(newProgress.totalPoints / 100) + 1;
      if (newLevel > newProgress.level) {
        newProgress.level = newLevel;
        newProgress.badges.push({
          name: `Level ${newLevel} Achiever`,
          icon: 'fa-solid fa-star',
          date: new Date().toLocaleDateString()
        });
      }

      return newProgress;
    });
  };

  const renderHome = () => (
    <div className="wellness-home">
      <div className="hero-section">
        <i className="fa-solid fa-piggy-bank hero-float-icon"></i>
        <h1 className="main-title">
          Get Smart About <span className="gradient-text">Your Money</span>
        </h1>
        <p className="subtitle">Learn finance the fun way - no boring textbooks, we promise!</p>
        
        <div className="stats-bar">
          <div className="stat-item stat-item-1">
            <i className="fa-solid fa-star stat-icon-fa"></i>
            <div>
              <div className="stat-value">{userProgress.totalPoints}</div>
              <div className="stat-label">Points</div>
            </div>
          </div>
          <div className="stat-item stat-item-2">
            <i className="fa-solid fa-ranking-star stat-icon-fa"></i>
            <div>
              <div className="stat-value">Level {userProgress.level}</div>
              <div className="stat-label">Current Level</div>
            </div>
          </div>
          <div className="stat-item stat-item-3">
            <i className="fa-solid fa-medal stat-icon-fa"></i>
            <div>
              <div className="stat-value">{userProgress.badges.length}</div>
              <div className="stat-label">Badges</div>
            </div>
          </div>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map(module => (
          <div 
            key={module.id}
            className="module-card"
            style={{ borderTopColor: module.color }}
            onClick={() => setCurrentModule(module.id)}
          >
            <div className="module-icon" style={{ backgroundColor: module.color + '20' }}>
              <i className={`${module.icon} module-icon-fa`}></i>
            </div>
            <h3 className="module-title">{module.title}</h3>
            <p className="module-description">{module.description}</p>
            <button 
              className="module-button"
              style={{ backgroundColor: module.color }}
            >
              Let's Go! {module.emoji}
            </button>
          </div>
        ))}
      </div>

      <div className="info-section">
        <h2>Why This Actually Matters</h2>
        <div className="info-cards">
          <div className="info-card">
            <i className="fa-solid fa-list-check info-icon-fa"></i>
            <h3>Juggling Multiple Goals</h3>
            <p>Want to save for a car AND pay off loans AND build an emergency fund? Yeah, we get it. Let's figure out the balance together.</p>
          </div>
          <div className="info-card">
            <i className="fa-solid fa-rocket info-icon-fa"></i>
            <h3>Set Goals That Stick</h3>
            <p>No more vague "I should save more" promises. We're talking real numbers, real deadlines, and real results.</p>
          </div>
          <div className="info-card">
            <i className="fa-solid fa-lightbulb info-icon-fa"></i>
            <h3>Learn the Stuff They Don't Teach</h3>
            <p>Insurance, investments, 401(k)s... all the "adult" stuff explained without the confusing jargon.</p>
          </div>
        </div>
        
        <div className="info-callout">
          <i className="fa-solid fa-chart-line callout-icon-fa"></i>
          <h3>Real Talk:</h3>
          <p>88% of people stress about money. That's... basically everyone. But here's the thing: <strong>financial stress is manageable</strong> when you know what you're doing. And that's exactly what we're here for.</p>
        </div>
      </div>
    </div>
  );

  const renderModule = () => {
    switch(currentModule) {
      case 'scenario':
        return <ScenarioGame onComplete={updateProgress} onBack={() => setCurrentModule('home')} />;
      case 'budget':
        return <BudgetSimulator onComplete={updateProgress} onBack={() => setCurrentModule('home')} />;
      case 'maze':
        return <MazeGame onComplete={updateProgress} onBack={() => setCurrentModule('home')} />;
      default:
        return renderHome();
    }
  };

  return (
    <div className="financial-wellness-container">
      <ProgressTracker progress={userProgress} />
      {renderModule()}
    </div>
  );
};

export default FinancialWellness;
