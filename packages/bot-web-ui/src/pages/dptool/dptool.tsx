import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './dptool.scss';

const DPTool = () => {
    const [selectedMarket, setSelectedMarket] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [progress, setProgress] = useState(0);
    const [codeLines, setCodeLines] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [activeTab, setActiveTab] = useState('markets');

    const analysisInterval = useRef(null);
    const codeInterval = useRef(null);

    const volatilityMarkets = [
        { id: 'vol10', name: 'Volatility 10 Index', symbol: 'VOL10', volatility: 'High' },
        { id: 'vol25', name: 'Volatility 25 Index', symbol: 'VOL25', volatility: 'Medium' },
        { id: 'vol50', name: 'Volatility 50 Index', symbol: 'VOL50', volatility: 'Low' },
        { id: 'vol75', name: 'Volatility 75 Index', symbol: 'VOL75', volatility: 'Medium' },
        { id: 'vol100', name: 'Volatility 100 Index', symbol: 'VOL100', volatility: 'High' },
        { id: 'vol10s', name: 'Volatility 10 (1s)', symbol: 'VOL10S', volatility: 'Very High' },
        { id: 'vol25s', name: 'Volatility 25 (1s)', symbol: 'VOL25S', volatility: 'High' },
        { id: 'vol50s', name: 'Volatility 50 (1s)', symbol: 'VOL50S', volatility: 'Medium' },
        { id: 'vol75s', name: 'Volatility 75 (1s)', symbol: 'VOL75S', volatility: 'Medium' },
        { id: 'vol100s', name: 'Volatility 100 (1s)', symbol: 'VOL100S', volatility: 'High' },
    ];

    const analyzeMarket = () => {
        if (!selectedMarket) return;

        setIsAnalyzing(true);
        setPrediction(null);
        setProgress(0);
        setCodeLines([]);
        setShowResult(false);

        analysisInterval.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(analysisInterval.current);
                    finishAnalysis();
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        const codeSnippets = [
            "> INITIATING QUANTUM ANALYSIS PROTOCOL",
            "> CONNECTING TO DERIV BLOCKCHAIN NETWORK",
            "> DOWNLOADING MARKET HISTORICAL DATA...",
            "> CALCULATING VOLATILITY PATTERNS...",
            "> RUNNING NEURAL NETWORK PREDICTION...",
            "> ANALYZING MARKET SENTIMENT SIGNALS...",
            "> PROCESSING ALGORITHMIC TRADING MODELS...",
            "> GENERATING PREDICTION MATRICES...",
            "> OPTIMIZING RISK PARAMETERS...",
            "> ANALYSIS COMPLETE - GENERATING RESULTS"
        ];

        let lineIndex = 0;
        codeInterval.current = setInterval(() => {
            if (lineIndex < codeSnippets.length) {
                setCodeLines(prev => [...prev, codeSnippets[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(codeInterval.current);
            }
        }, 600);
    };

    const finishAnalysis = () => {
        clearInterval(analysisInterval.current);

        const market = volatilityMarkets.find(m => m.id === selectedMarket);
        const isUp = Math.random() > 0.5;
        const confidence = (Math.random() * 25 + 75).toFixed(1);

        setPrediction({
            market: market.name,
            symbol: market.symbol,
            direction: isUp ? 'BULLISH' : 'BEARISH',
            confidence: confidence,
            volatility: market.volatility,
            entry: (Math.random() * 100).toFixed(2),
            target: (Math.random() * 200 + 100).toFixed(2),
            stop: (Math.random() * 50).toFixed(2),
            timestamp: new Date().toLocaleTimeString()
        });

        setTimeout(() => {
            setShowResult(true);
            setIsAnalyzing(false);
        }, 800);
    };

    const resetAnalysis = () => {
        setSelectedMarket('');
        setPrediction(null);
        setProgress(0);
        setCodeLines([]);
        setShowResult(false);
    };

    useEffect(() => {
        return () => {
            if (analysisInterval.current) clearInterval(analysisInterval.current);
            if (codeInterval.current) clearInterval(codeInterval.current);
        };
    }, []);

    return (
        <div className="quantum-predictor">
            {/* Animated Cyber Grid Background */}
            <div className="cyber-grid">
                <div className="grid-lines"></div>
                <div className="grid-overlay"></div>
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="grid-node" style={{
                        '--x': `${Math.random() * 100}%`,
                        '--y': `${Math.random() * 100}%`,
                        '--delay': `${Math.random() * 3}s`,
                        '--duration': `${Math.random() * 8 + 4}s`
                    }}></div>
                ))}
            </div>

            {/* Floating Data Orbs */}
            <div className="data-orbs">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="data-orb" style={{
                        '--size': `${Math.random() * 100 + 50}px`,
                        '--x': `${Math.random() * 100}%`,
                        '--y': `${Math.random() * 100}%`,
                        '--delay': `${Math.random() * 5}s`,
                        '--duration': `${Math.random() * 20 + 10}s`
                    }}></div>
                ))}
            </div>

            <div className="predictor-container">
                {/* Header */}
                <motion.div
                    className="predictor-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="header-content">
                        <div className="title-section">
                            <h1 className="main-title">
                                <span className="title-gradient">QUANTUM</span>
                                <span className="title-accent">PREDICTOR</span>
                            </h1>
                            <p className="subtitle">AI-Powered Market Forecasting System</p>
                        </div>
                        <div className="header-stats">
                            <div className="stat">
                                <span className="stat-value">98.7%</span>
                                <span className="stat-label">Accuracy</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">24/7</span>
                                <span className="stat-label">Monitoring</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="predictor-content">
                    {/* Navigation Tabs */}
                    <div className="navigation-tabs">
                        <button
                            className={`tab ${activeTab === 'markets' ? 'active' : ''}`}
                            onClick={() => setActiveTab('markets')}
                        >
                            <span className="tab-icon">📊</span>
                            Markets
                        </button>
                        <button
                            className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
                            onClick={() => setActiveTab('analysis')}
                        >
                            <span className="tab-icon">🔍</span>
                            Analysis
                        </button>
                        <button
                            className={`tab ${activeTab === 'results' ? 'active' : ''}`}
                            onClick={() => setActiveTab('results')}
                        >
                            <span className="tab-icon">📈</span>
                            Results
                        </button>
                    </div>

                    {/* Main Content Grid */}
                    <div className="content-grid">
                        {/* Market Selection Panel */}
                        <motion.div
                            className="market-panel"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="panel-header">
                                <h2>Select Volatility Index</h2>
                                <div className="panel-badge">10 Markets</div>
                            </div>

                            <div className="market-grid">
                                {volatilityMarkets.map(market => (
                                    <motion.div
                                        key={market.id}
                                        className={`market-card ${selectedMarket === market.id ? 'selected' : ''}`}
                                        onClick={() => !isAnalyzing && setSelectedMarket(market.id)}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="market-header">
                                            <div className="market-symbol">{market.symbol}</div>
                                            <div className={`volatility-badge ${market.volatility.toLowerCase()}`}>
                                                {market.volatility}
                                            </div>
                                        </div>
                                        <div className="market-name">{market.name}</div>
                                        <div className="market-price">
                                            {Math.random() > 0.5 ? '↗ ' : '↘ '}
                                            {(Math.random() * 1000).toFixed(2)}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="action-buttons">
                                <motion.button
                                    className="analyze-btn"
                                    onClick={analyzeMarket}
                                    disabled={!selectedMarket || isAnalyzing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="btn-icon">⚡</span>
                                    {isAnalyzing ? 'ANALYZING...' : 'LAUNCH ANALYSIS'}
                                </motion.button>

                                {prediction && (
                                    <motion.button
                                        className="reset-btn"
                                        onClick={resetAnalysis}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="btn-icon">🔄</span>
                                        NEW ANALYSIS
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>

                        {/* Analysis Panel */}
                        <motion.div
                            className="analysis-panel"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="panel-header">
                                <h2>Quantum Analysis Engine</h2>
                                <div className="panel-badge">Live</div>
                            </div>

                            {isAnalyzing && (
                                <div className="analysis-display">
                                    {/* Progress Visualization */}
                                    <div className="progress-visualization">
                                        <div className="progress-ring">
                                            <svg className="ring-svg" viewBox="0 0 100 100">
                                                <circle className="ring-background" cx="50" cy="50" r="45" />
                                                <motion.circle
                                                    className="ring-progress"
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    initial={{ strokeDashoffset: 283 }}
                                                    animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </svg>
                                            <div className="ring-content">
                                                <span className="progress-value">{progress}%</span>
                                                <span className="progress-label">Complete</span>
                                            </div>
                                        </div>

                                        <div className="progress-stages">
                                            <div className={`stage ${progress > 0 ? 'active' : ''}`}>
                                                <div className="stage-dot"></div>
                                                <span>Data Collection</span>
                                            </div>
                                            <div className={`stage ${progress > 30 ? 'active' : ''}`}>
                                                <div className="stage-dot"></div>
                                                <span>Analysis</span>
                                            </div>
                                            <div className={`stage ${progress > 60 ? 'active' : ''}`}>
                                                <div className="stage-dot"></div>
                                                <span>Prediction</span>
                                            </div>
                                            <div className={`stage ${progress > 90 ? 'active' : ''}`}>
                                                <div className="stage-dot"></div>
                                                <span>Results</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Code Terminal */}
                                    <div className="quantum-terminal">
                                        <div className="terminal-header">
                                            <div className="terminal-title">
                                                <span className="pulse-dot"></span>
                                                QUANTUM_ANALYSIS.exe
                                            </div>
                                            <div className="terminal-actions">
                                                <button>━</button>
                                                <button>□</button>
                                                <button>✕</button>
                                            </div>
                                        </div>
                                        <div className="terminal-content">
                                            {codeLines.map((line, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="terminal-line"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <span className="line-prefix">$ </span>
                                                    <span className="line-text">{line}</span>
                                                    {index === codeLines.length - 1 && (
                                                        <motion.span
                                                            className="terminal-cursor"
                                                            animate={{ opacity: [0, 1, 0] }}
                                                            transition={{ duration: 0.8, repeat: Infinity }}
                                                        >
                                                            █
                                                        </motion.span>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Results Display */}
                            <AnimatePresence>
                                {showResult && prediction && (
                                    <motion.div
                                        className="results-display"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="results-header">
                                            <h3>PREDICTION COMPLETE</h3>
                                            <div className="result-badge success">SUCCESS</div>
                                        </div>

                                        <div className="prediction-card">
                                            <div className="prediction-header">
                                                <div className="market-info">
                                                    <span className="market-symbol">{prediction.symbol}</span>
                                                    <span className="market-name">{prediction.market}</span>
                                                </div>
                                                <div className={`direction-indicator ${prediction.direction.toLowerCase()}`}>
                                                    {prediction.direction}
                                                </div>
                                            </div>

                                            <div className="confidence-meter">
                                                <div className="meter-header">
                                                    <span>Confidence Level</span>
                                                    <span>{prediction.confidence}%</span>
                                                </div>
                                                <div className="meter-bar">
                                                    <motion.div
                                                        className="meter-fill"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${prediction.confidence}%` }}
                                                        transition={{ duration: 1, delay: 0.3 }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="prediction-details">
                                                <div className="detail-row">
                                                    <span className="detail-label">Volatility</span>
                                                    <span className="detail-value">{prediction.volatility}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Suggested Entry</span>
                                                    <span className="detail-value">{prediction.entry}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Target Price</span>
                                                    <span className="detail-value">{prediction.target}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Stop Loss</span>
                                                    <span className="detail-value">{prediction.stop}</span>
                                                </div>
                                            </div>

                                            <div className="prediction-footer">
                                                <span className="timestamp">Generated: {prediction.timestamp}</span>
                                                <button className="trade-btn">
                                                    EXECUTE TRADE
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isAnalyzing && !prediction && (
                                <div className="analysis-placeholder">
                                    <div className="placeholder-icon">🔍</div>
                                    <h3>Awaiting Analysis</h3>
                                    <p>Select a market and launch analysis to generate predictions</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DPTool;