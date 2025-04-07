import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const CreditScoreAdvisor = () => {
  const [formData, setFormData] = useState({
    income: "",
    debt: "",
    credit_utilization: "",
    payment_history: "",
    credit_age: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate initial loading screen
  useEffect(() => {
    setTimeout(() => {
      setShowInitialLoader(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response for testing purposes
      // In production, this would be a real API call:
      // const response = await axios.post("http://localhost:8000/assess-credit-score/", {...})
      
      const mockResponse = {
        data: {
          credit_score: Math.floor(Math.random() * 300) + 550, // Random score between 550-850
          credit_score_category: "Good" // This would be calculated based on the actual score
        }
      };

      setResult(mockResponse.data);
    } catch (err) {
      setError("Error calculating credit score. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  // Determine credit score CSS class
  const getCreditScoreClass = (score) => {
    if (!score) return "";
    if (score >= 750) return "credit-excellent";
    if (score >= 700) return "credit-good";
    if (score >= 650) return "credit-fair";
    return "credit-poor";
  };

  // Calculate progress percentage for progress bar
  const getProgressPercentage = (score) => {
    if (!score) return 0;
    return Math.min(100, Math.max(0, (score / 850) * 100));
  };

  // Get score category text
  const getCreditScoreCategory = (score) => {
    if (!score) return "Not Available";
    if (score >= 800) return "Exceptional";
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    return "Poor";
  };

  // Responsive adjustments for the score legend
  const renderScoreLegend = () => {
    const isSmallScreen = windowWidth < 768;
    
    return (
      <div className={`score-legend ${isSmallScreen ? 'grid-cols-2' : 'grid-cols-5'}`}>
        <div className="score-legend-item">
          <strong className="score-exceptional">800+</strong>
          <span>Exceptional</span>
        </div>
        <div className="score-legend-item">
          <strong className="score-excellent">750-799</strong>
          <span>Excellent</span>
        </div>
        <div className="score-legend-item">
          <strong className="score-good">700-749</strong>
          <span>Good</span>
        </div>
        <div className="score-legend-item">
          <strong className="score-fair">650-699</strong>
          <span>Fair</span>
        </div>
        <div className="score-legend-item">
          <strong className="score-poor">Below 650</strong>
          <span>Poor</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating credit card particles */}
      <div className="credit-particles">
        <div className="credit-particle"></div>
        <div className="credit-particle"></div>
        <div className="credit-particle"></div>
        <div className="credit-particle"></div>
        <div className="credit-particle"></div>
        <div className="credit-particle"></div>
      </div>
      
      {/* Initial loading screen */}
      {showInitialLoader && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Credit Advisor<span className="loading-dots"></span></div>
        </div>
      )}

      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h2>Credit Score Advisor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field">
            <label htmlFor="income" className="form-label">Annual Income ($)</label>
            <input 
              type="number" 
              id="income"
              name="income" 
              placeholder="Enter your annual income" 
              value={formData.income} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="debt" className="form-label">Total Debt ($)</label>
            <input 
              type="number" 
              id="debt"
              name="debt" 
              placeholder="Enter your total debt" 
              value={formData.debt} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="credit_utilization" className="form-label">Credit Utilization (%)</label>
            <input 
              type="number" 
              id="credit_utilization"
              name="credit_utilization" 
              placeholder="Enter your credit utilization percentage" 
              value={formData.credit_utilization} 
              onChange={handleChange} 
              min="0"
              max="100"
              required 
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="payment_history" className="form-label">On-Time Payment History (%)</label>
            <input 
              type="number" 
              id="payment_history"
              name="payment_history" 
              placeholder="Enter your on-time payment percentage" 
              value={formData.payment_history} 
              onChange={handleChange} 
              min="0"
              max="100"
              required 
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="credit_age" className="form-label">Credit Age (Years)</label>
            <input 
              type="number" 
              id="credit_age"
              name="credit_age" 
              placeholder="How long have you had credit?" 
              value={formData.credit_age}
              onChange={handleChange} 
              min="0"
              required 
            />
          </div>
          <div className="form-field" style={{ paddingLeft: "5rem" }}>
          <button type="submit" disabled={loading} className="submit-button" >
            {loading ? "Calculating..." : "Check Credit Score" }

          </button>
          </div>
          
        </form>
        
        

        {error && <div className="error">{error}</div>}

        {loading && !error && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <p>Analyzing your credit profile<span className="loading-dots"></span></p>
          </div>
        )}

        {result && !loading && (
          <div className="result">
            <h3>Your Credit Results</h3>
            
            <div className="score-wrapper">
              <div className="credit-score-value">
                <span className={getCreditScoreClass(result.credit_score)}>
                  {result.credit_score}
                </span>
              </div>
              
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${getProgressPercentage(result.credit_score)}%` }}
                ></div>
              </div>
            </div>
            
            <p className="result-category">
              Category: <strong className={getCreditScoreClass(result.credit_score)}>
                {getCreditScoreCategory(result.credit_score)}
              </strong>
            </p>
            
            {renderScoreLegend()}
            
            <div className="recommendations">
              <h4>Recommendations</h4>
              <ul>
                <li>Keep your credit utilization below 30%</li>
                <li>Always make payments on time</li>
                <li>Don't apply for too many new credit lines</li>
                {result.credit_score < 700 && (
                  <li>Consider paying down high-interest debt first</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreditScoreAdvisor;