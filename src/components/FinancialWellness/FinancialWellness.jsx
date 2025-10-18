import { useState } from 'react';
import './FinancialWellness.css';
import QuizGame from './QuizGame';
import ScenarioGame from './ScenarioGame';
import BudgetSimulator from './BudgetSimulator';
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
      id: 'quiz',
      title: 'Financial IQ Challenge',
      icon: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
      description: 'Think you know money? Let\'s find out with some quick questions!',
      color: '#4A90E2',
      emoji: '🧠'
    },
    {
      id: 'scenario',
      title: 'Life Scenarios',
      icon: 'https://cdn-icons-png.flaticon.com/512/3079/3079652.png',
      description: 'Real situations, real choices. What would you do?',
      color: '#7B68EE',
      emoji: '💭'
    },
    {
      id: 'budget',
      title: 'Budget Builder',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
      description: 'Time to build your first budget (or improve your current one!)',
      color: '#50C878',
      emoji: '📝'
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
          icon: '⭐',
          date: new Date().toLocaleDateString()
        });
      }

      return newProgress;
    });
  };

  const renderHome = () => (
    <div className="wellness-home">
      <div className="hero-section">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Money" className="hero-float-img" />
        <h1 className="main-title">
          Get Smart About <span className="gradient-text">Your Money</span>
        </h1>
        <p className="subtitle">Learn finance the fun way — no boring textbooks, we promise!</p>
        
        <div className="stats-bar">
          <div className="stat-item stat-item-1">
            <img src="https://cdn-icons-png.flaticon.com/512/2583/2583839.png" alt="Trophy" className="stat-icon-img" />
            <div>
              <div className="stat-value">{userProgress.totalPoints}</div>
              <div className="stat-label">Points</div>
            </div>
          </div>
          <div className="stat-item stat-item-2">
            <img src="https://cdn-icons-png.flaticon.com/512/3183/3183074.png" alt="Level" className="stat-icon-img" />
            <div>
              <div className="stat-value">Level {userProgress.level}</div>
              <div className="stat-label">Current Level</div>
            </div>
          </div>
          <div className="stat-item stat-item-3">
            <img src="https://cdn-icons-png.flaticon.com/512/2583/2583815.png" alt="Badges" className="stat-icon-img" />
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
              <img src={module.icon} alt={module.title} className="module-icon-img" />
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
        <h2>Why This Actually Matters 💭</h2>
        <div className="info-cards">
          <div className="info-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3045/3045659.png" alt="Balance" className="info-icon-img" />
            <h3>Juggling Multiple Goals</h3>
            <p>Want to save for a car AND pay off loans AND build an emergency fund? Yeah, we get it. Let's figure out the balance together.</p>
          </div>
          <div className="info-card">
            <img src="https://cdn-icons-png.flaticon.com/512/4727/4727266.png" alt="Goals" className="info-icon-img" />
            <h3>Set Goals That Stick</h3>
            <p>No more vague "I should save more" promises. We're talking real numbers, real deadlines, and real results.</p>
          </div>
          <div className="info-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3131/3131607.png" alt="Learning" className="info-icon-img" />
            <h3>Learn the Stuff They Don't Teach</h3>
            <p>Insurance, investments, 401(k)s... all the "adult" stuff explained without the confusing jargon.</p>
          </div>
        </div>
        
        <div className="info-callout">
          <img src="https://cdn-icons-png.flaticon.com/512/3588/3588456.png" alt="Stressed" className="callout-icon-img" />
          <h3>Real Talk:</h3>
          <p>88% of people stress about money. That's... basically everyone. But here's the thing: <strong>financial stress is manageable</strong> when you know what you're doing. And that's exactly what we're here for.</p>
        </div>
      </div>
    </div>
  );

  const renderModule = () => {
    switch(currentModule) {
      case 'quiz':
        return <QuizGame onComplete={updateProgress} onBack={() => setCurrentModule('home')} />;
      case 'scenario':
        return <ScenarioGame onComplete={updateProgress} onBack={() => setCurrentModule('home')} />;
      case 'budget':
        return <BudgetSimulator onComplete={updateProgress} onBack={() => setCurrentModule('home')} />;
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
