import { useState } from 'react';
import { quizQuestions } from '../../data/quizData';

const QuizGame = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const question = quizQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === question.correctAnswer;
    
    if (isCorrect) {
      setScore(score + question.points);
    }

    setAnsweredQuestions([...answeredQuestions, {
      question: question.question,
      correct: isCorrect,
      userAnswer: question.answers[answerIndex],
      correctAnswer: question.answers[question.correctAnswer]
    }]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      onComplete('quiz', score);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  if (showResult) {
    const percentage = (score / quizQuestions.reduce((sum, q) => sum + q.points, 0)) * 100;
    
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className="result-header">
            <h2>You finished the quiz!</h2>
            <div className="result-score">
              <div className="score-circle">
                <div className="score-text">
                  <span className="score-number">{Math.round(percentage)}%</span>
                  <span className="score-label">Score</span>
                </div>
              </div>
            </div>
            <p className="result-message">
              {percentage >= 80 ? "Excellent work! You really know your stuff." :
               percentage >= 60 ? "Nice job! You're on the right track." :
               "Good start! Review the explanations below to learn more."}
            </p>
            <div className="points-earned">
              <span className="points-icon">+</span>
              <span>{score} Points</span>
            </div>
          </div>

          <div className="answer-review">
            <h3>Review Your Answers</h3>
            {answeredQuestions.map((item, index) => (
              <div key={index} className={`review-item ${item.correct ? 'correct' : 'incorrect'}`}>
                <div className="review-number">Q{index + 1}</div>
                <div className="review-content">
                  <p className="review-question">{item.question}</p>
                  <p className="review-answer">
                    <span className={item.correct ? 'correct-icon' : 'incorrect-icon'}>
                      {item.correct ? '✓' : '✗'}
                    </span>
                    Your answer: {item.userAnswer}
                  </p>
                  {!item.correct && (
                    <p className="review-correct">
                      Correct answer: {item.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button className="btn btn-secondary" onClick={onBack}>
              Back to Home
            </button>
            <button className="btn btn-primary" onClick={handleRestart}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Financial IQ Challenge</h2>
        <div className="quiz-progress">
          <div className="progress-text">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <div className="question-header">
            <span className="question-category">{question.category}</span>
            <span className="question-points">+{question.points} pts</span>
          </div>
          <h3 className="question-text">{question.question}</h3>
          
          <div className="answers-grid">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-option ${
                  selectedAnswer === index 
                    ? index === question.correctAnswer 
                      ? 'correct' 
                      : 'incorrect'
                    : ''
                } ${selectedAnswer !== null && index === question.correctAnswer ? 'show-correct' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                <span className="answer-text">{answer}</span>
                {selectedAnswer !== null && index === question.correctAnswer && (
                  <span className="answer-icon">✓</span>
                )}
                {selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="answer-icon">✗</span>
                )}
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className="explanation-box">
              <h4><i className="fa-solid fa-lightbulb"></i> Explanation</h4>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>

        {selectedAnswer !== null && (
          <button className="btn btn-primary next-button" onClick={handleNext}>
            {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>

      <div className="current-score">
        Score: {score} points
      </div>
    </div>
  );
};

export default QuizGame;
