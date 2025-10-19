const ProgressTracker = ({ progress }) => {
  const getProgressPercentage = () => {
    const nextLevelPoints = progress.level * 100;
    const currentLevelPoints = (progress.level - 1) * 100;
    const pointsInLevel = progress.totalPoints - currentLevelPoints;
    return (pointsInLevel / 100) * 100;
  };

  return (
    <div className="progress-tracker">
      <div className="tracker-content">
        <div className="level-info">
          <span className="level-badge">Level {progress.level}</span>
          <div className="level-progress">
            <div 
              className="level-progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className="level-next">
            {Math.max(0, (progress.level * 100) - progress.totalPoints)} pts to Level {progress.level + 1}
          </span>
        </div>

        {progress.badges.length > 0 && (
          <div className="recent-badges">
            {progress.badges.slice(-3).map((badge, index) => (
              <div key={index} className="badge-item" title={badge.date}>
                <span className="badge-icon"><i className={badge.icon}></i></span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
