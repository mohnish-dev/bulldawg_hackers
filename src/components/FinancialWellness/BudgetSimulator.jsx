import { useState } from 'react';

const BudgetSimulator = ({ onComplete, onBack }) => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [expenses, setExpenses] = useState({
    housing: '',
    utilities: '',
    food: '',
    transportation: '',
    insurance: '',
    healthcare: '',
    savings: '',
    entertainment: '',
    other: ''
  });
  const [showResults, setShowResults] = useState(false);

  const expenseCategories = [
    { key: 'housing', label: 'Housing (Rent/Mortgage)', icon: '🏠', recommended: 30 },
    { key: 'utilities', label: 'Utilities', icon: '💡', recommended: 5 },
    { key: 'food', label: 'Food & Groceries', icon: '🍔', recommended: 15 },
    { key: 'transportation', label: 'Transportation', icon: '🚗', recommended: 15 },
    { key: 'insurance', label: 'Insurance', icon: '🛡️', recommended: 10 },
    { key: 'healthcare', label: 'Healthcare', icon: '⚕️', recommended: 5 },
    { key: 'savings', label: 'Savings & Investments', icon: '💰', recommended: 20 },
    { key: 'entertainment', label: 'Entertainment', icon: '🎮', recommended: 5 },
    { key: 'other', label: 'Other', icon: '📦', recommended: 5 }
  ];

  const handleExpenseChange = (category, value) => {
    setExpenses({
      ...expenses,
      [category]: value
    });
  };

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const totalExpenses = Object.values(expenses).reduce(
      (sum, exp) => sum + (parseFloat(exp) || 0), 0
    );
    const remaining = income - totalExpenses;
    const savingsPercentage = income > 0 ? ((parseFloat(expenses.savings) || 0) / income) * 100 : 0;

    return { income, totalExpenses, remaining, savingsPercentage };
  };

  const handleSubmit = () => {
    const { income, totalExpenses } = calculateBudget();
    if (income > 0 && totalExpenses > 0) {
      setShowResults(true);
      const points = calculatePoints();
      onComplete('budget', points);
    }
  };

  const calculatePoints = () => {
    const { income, remaining, savingsPercentage } = calculateBudget();
    let points = 50; // Base points

    // Bonus for positive remaining balance
    if (remaining > 0) points += 20;
    
    // Bonus for good savings rate
    if (savingsPercentage >= 20) points += 30;
    else if (savingsPercentage >= 10) points += 15;

    // Bonus for balanced budget (within recommended ranges)
    let categoriesInRange = 0;
    expenseCategories.forEach(cat => {
      const expenseAmount = parseFloat(expenses[cat.key]) || 0;
      const percentage = income > 0 ? (expenseAmount / income) * 100 : 0;
      const difference = Math.abs(percentage - cat.recommended);
      if (difference <= 5) categoriesInRange++;
    });
    points += categoriesInRange * 5;

    return Math.min(points, 100);
  };

  const getBudgetRating = () => {
    const { remaining, savingsPercentage } = calculateBudget();
    
    if (remaining < 0) return { rating: 'needs-work', message: 'Budget needs adjustment', icon: '⚠️', color: '#E74C3C' };
    if (savingsPercentage >= 20 && remaining > 0) return { rating: 'excellent', message: 'Excellent budget!', icon: '⭐', color: '#27AE60' };
    if (savingsPercentage >= 10) return { rating: 'good', message: 'Good budget!', icon: '👍', color: '#3498DB' };
    return { rating: 'okay', message: 'Decent budget', icon: '👌', color: '#F39C12' };
  };

  const handleReset = () => {
    setMonthlyIncome('');
    setExpenses({
      housing: '', utilities: '', food: '', transportation: '',
      insurance: '', healthcare: '', savings: '', entertainment: '', other: ''
    });
    setShowResults(false);
  };

  if (showResults) {
    const { income, totalExpenses, remaining, savingsPercentage } = calculateBudget();
    const rating = getBudgetRating();
    const points = calculatePoints();

    return (
      <div className="budget-container">
        <div className="budget-results">
          <div className="results-header">
            <h2>Budget Analysis 💰</h2>
            <div className="rating-display" style={{ backgroundColor: rating.color + '20', borderColor: rating.color }}>
              <span className="rating-icon">{rating.icon}</span>
              <span className="rating-text">{rating.message}</span>
            </div>
            <div className="points-earned">
              <span className="points-icon">⭐</span>
              <span>{points} Points Earned</span>
            </div>
          </div>

          <div className="budget-summary">
            <div className="summary-card income-card">
              <h3>💵 Monthly Income</h3>
              <div className="amount">${income.toFixed(2)}</div>
            </div>
            <div className="summary-card expense-card">
              <h3>📊 Total Expenses</h3>
              <div className="amount">${totalExpenses.toFixed(2)}</div>
            </div>
            <div className={`summary-card balance-card ${remaining >= 0 ? 'positive' : 'negative'}`}>
              <h3>{remaining >= 0 ? '✅' : '⚠️'} Remaining</h3>
              <div className="amount">${remaining.toFixed(2)}</div>
            </div>
          </div>

          <div className="expense-breakdown">
            <h3>Expense Breakdown</h3>
            <div className="breakdown-chart">
              {expenseCategories.map(cat => {
                const amount = parseFloat(expenses[cat.key]) || 0;
                const percentage = income > 0 ? (amount / income) * 100 : 0;
                const recommended = cat.recommended;
                const difference = percentage - recommended;
                
                return (
                  <div key={cat.key} className="breakdown-item">
                    <div className="breakdown-label">
                      <span className="category-icon">{cat.icon}</span>
                      <span className="category-name">{cat.label}</span>
                      <span className="category-amount">${amount.toFixed(2)}</span>
                    </div>
                    <div className="breakdown-bars">
                      <div className="bar-container">
                        <div 
                          className={`bar actual-bar ${Math.abs(difference) <= 5 ? 'good' : Math.abs(difference) <= 10 ? 'okay' : 'high'}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="bar-labels">
                        <span className="percentage">{percentage.toFixed(1)}%</span>
                        <span className={`difference ${difference > 5 ? 'high' : difference < -5 ? 'low' : 'good'}`}>
                          {difference > 0 ? '+' : ''}{difference.toFixed(1)}% vs recommended
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="budget-insights">
            <h3>💡 Insights & Tips</h3>
            <div className="insights-grid">
              {remaining < 0 && (
                <div className="insight-card warning">
                  <span className="insight-icon">⚠️</span>
                  <p><strong>Overspending:</strong> Your expenses exceed your income. Consider reducing non-essential spending.</p>
                </div>
              )}
              {savingsPercentage < 10 && (
                <div className="insight-card warning">
                  <span className="insight-icon">💰</span>
                  <p><strong>Low Savings:</strong> Try to save at least 10-20% of your income for emergencies and future goals.</p>
                </div>
              )}
              {savingsPercentage >= 20 && (
                <div className="insight-card success">
                  <span className="insight-icon">⭐</span>
                  <p><strong>Great Savings!</strong> You're saving {savingsPercentage.toFixed(1)}% - excellent financial habit!</p>
                </div>
              )}
              {parseFloat(expenses.insurance) / income * 100 < 5 && (
                <div className="insight-card info">
                  <span className="insight-icon">🛡️</span>
                  <p><strong>Insurance:</strong> Consider adequate insurance coverage to protect against unexpected events.</p>
                </div>
              )}
            </div>
          </div>

          <div className="results-actions">
            <button className="btn btn-secondary" onClick={onBack}>
              Back to Home
            </button>
            <button className="btn btn-primary" onClick={handleReset}>
              Create New Budget
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { totalExpenses, remaining } = calculateBudget();

  return (
    <div className="budget-container">
      <div className="budget-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Budget Builder 💰</h2>
        <p className="budget-subtitle">Create your personalized monthly budget</p>
      </div>

      <div className="budget-form">
        <div className="income-section">
          <label className="form-label">
            <span className="label-icon">💵</span>
            Monthly Income
          </label>
          <input
            type="number"
            className="form-input income-input"
            placeholder="Enter your monthly income"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
        </div>

        {monthlyIncome && (
          <>
            <div className="expenses-section">
              <h3>Monthly Expenses</h3>
              <div className="expenses-grid">
                {expenseCategories.map(cat => (
                  <div key={cat.key} className="expense-input-group">
                    <label className="form-label">
                      <span className="label-icon">{cat.icon}</span>
                      {cat.label}
                      <span className="recommended-tag">{cat.recommended}% recommended</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0.00"
                      value={expenses[cat.key]}
                      onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="budget-preview">
              <div className="preview-item">
                <span>Total Expenses:</span>
                <span className="preview-amount">${totalExpenses.toFixed(2)}</span>
              </div>
              <div className="preview-item">
                <span>Remaining:</span>
                <span className={`preview-amount ${remaining >= 0 ? 'positive' : 'negative'}`}>
                  ${remaining.toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              className="btn btn-primary submit-button"
              onClick={handleSubmit}
              disabled={totalExpenses === 0}
            >
              Analyze Budget
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BudgetSimulator;
