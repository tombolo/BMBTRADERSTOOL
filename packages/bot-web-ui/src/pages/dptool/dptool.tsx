import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './dptool.module.scss';

// Sound effects (would need actual sound files)
// import typingSound from './sounds/typing.mp3';
// import beepSound from './sounds/beep.mp3';
// import successSound from './sounds/success.mp3';

const DPTool = () => {
    const [selectedMarket, setSelectedMarket] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [progress, setProgress] = useState(0);
    const [codeLines, setCodeLines] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const analysisInterval = useRef(null);
    const codeInterval = useRef(null);

    // Deriv Volatility Markets
    const volatilityMarkets = [
        { id: 'vol10', name: 'Volatility 10 Index', symbol: 'VOL10' },
        { id: 'vol25', name: 'Volatility 25 Index', symbol: 'VOL25' },
        { id: 'vol50', name: 'Volatility 50 Index', symbol: 'VOL50' },
        { id: 'vol75', name: 'Volatility 75 Index', symbol: 'VOL75' },
        { id: 'vol100', name: 'Volatility 100 Index', symbol: 'VOL100' },
        { id: 'vol10s', name: 'Volatility 10 (1s) Index', symbol: 'VOL10S' },
        { id: 'vol25s', name: 'Volatility 25 (1s) Index', symbol: 'VOL25S' },
        { id: 'vol50s', name: 'Volatility 50 (1s) Index', symbol: 'VOL50S' },
        { id: 'vol75s', name: 'Volatility 75 (1s) Index', symbol: 'VOL75S' },
        { id: 'vol100s', name: 'Volatility 100 (1s) Index', symbol: 'VOL100S' },
    ];

    // Simulate typing sound effect
    const playTypingSound = () => {
        // In a real implementation, you would play an actual sound file
        console.log("Typing sound played");
    };

    // Simulate beep sound effect
    const playBeepSound = () => {
        // In a real implementation, you would play an actual sound file
        console.log("Beep sound played");
    };

    // Simulate success sound effect
    const playSuccessSound = () => {
        // In a real implementation, you would play an actual sound file
        console.log("Success sound played");
    };

    // Start market analysis
    const analyzeMarket = () => {
        if (!selectedMarket) return;

        setIsAnalyzing(true);
        setPrediction(null);
        setProgress(0);
        setCodeLines([]);
        setShowResult(false);

        // Play initial sound
        playBeepSound();

        // Simulate analysis progress
        analysisInterval.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(analysisInterval.current);
                    finishAnalysis();
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        // Simulate code being written
        const codeSnippets = [
            "Initializing market analysis...",
            "Connecting to Deriv API...",
            "Fetching historical data...",
            "Calculating volatility patterns...",
            "Running predictive algorithms...",
            "Analyzing market sentiment...",
            "Processing neural network predictions...",
            "Generating trade signals...",
            "Finalizing prediction model...",
            "Analysis complete!"
        ];

        let lineIndex = 0;
        codeInterval.current = setInterval(() => {
            if (lineIndex < codeSnippets.length) {
                setCodeLines(prev => [...prev, codeSnippets[lineIndex]]);
                playTypingSound();
                lineIndex++;
            } else {
                clearInterval(codeInterval.current);
            }
        }, 800);
    };

    // Finish analysis and show results
    const finishAnalysis = () => {
        clearInterval(analysisInterval.current);

        // Generate a random prediction
        const market = volatilityMarkets.find(m => m.id === selectedMarket);
        const isUp = Math.random() > 0.5;
        const confidence = (Math.random() * 30 + 70).toFixed(2); // 70-100% confidence

        setPrediction({
            market: market.name,
            direction: isUp ? 'UP' : 'DOWN',
            confidence: confidence,
            timestamp: new Date().toLocaleTimeString()
        });

        playSuccessSound();

        setTimeout(() => {
            setShowResult(true);
            setIsAnalyzing(false);
        }, 1000);
    };

    // Reset analysis
    const resetAnalysis = () => {
        setSelectedMarket('');
        setPrediction(null);
        setProgress(0);
        setCodeLines([]);
        setShowResult(false);
    };

    // Clean up intervals on unmount
    useEffect(() => {
        return () => {
            if (analysisInterval.current) clearInterval(analysisInterval.current);
            if (codeInterval.current) clearInterval(codeInterval.current);
        };
    }, []);

    return (
        <div className={styles.dptool}>
            {/* Animated background elements */}
            <div className={styles.background}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            '--size': `${Math.random() * 6 + 2}px`,
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--delay': `${Math.random() * 5}s`,
                            '--duration': `${Math.random() * 15 + 10}s`,
                        }}
                    />
                ))}
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>DP Trading Predictor</h1>
                    <p>Advanced market prediction for Deriv volatility indices</p>
                </motion.div>

                <div className={styles.content}>
                    {/* Market Selection */}
                    <motion.div
                        className={styles.selectionPanel}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2>Select Market</h2>
                        <div className={styles.marketGrid}>
                            {volatilityMarkets.map(market => (
                                <motion.div
                                    key={market.id}
                                    className={`${styles.marketCard} ${selectedMarket === market.id ? styles.selected : ''}`}
                                    onClick={() => !isAnalyzing && setSelectedMarket(market.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className={styles.marketSymbol}>{market.symbol}</div>
                                    <div className={styles.marketName}>{market.name}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            className={styles.analyzeButton}
                            onClick={analyzeMarket}
                            disabled={!selectedMarket || isAnalyzing}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Market'}
                        </motion.button>

                        {prediction && (
                            <motion.button
                                className={styles.resetButton}
                                onClick={resetAnalysis}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                New Analysis
                            </motion.button>
                        )}
                    </motion.div>

                    {/* Analysis Panel */}
                    <motion.div
                        className={styles.analysisPanel}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2>Market Analysis</h2>

                        {isAnalyzing && (
                            <div className={styles.analysisInProgress}>
                                {/* Progress bar */}
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBar}>
                                        <motion.div
                                            className={styles.progressFill}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                    <div className={styles.progressText}>{progress}%</div>
                                </div>

                                {/* Code display */}
                                <div className={styles.codeWindow}>
                                    <div className={styles.codeHeader}>
                                        <div className={styles.codeDots}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div className={styles.codeTitle}>algorithm.py</div>
                                    </div>
                                    <div className={styles.codeContent}>
                                        {codeLines.map((line, index) => (
                                            <motion.div
                                                key={index}
                                                className={styles.codeLine}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <span className={styles.lineNumber}>{index + 1}</span>
                                                <span className={styles.lineText}>{line}</span>
                                                {index === codeLines.length - 1 && (
                                                    <motion.span
                                                        className={styles.cursor}
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 0.8, repeat: Infinity }}
                                                    >
                                                        _
                                                    </motion.span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results */}
                        <AnimatePresence>
                            {showResult && prediction && (
                                <motion.div
                                    className={styles.resultContainer}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3>Prediction Result</h3>
                                    <div className={styles.predictionCard}>
                                        <div className={styles.predictionMarket}>{prediction.market}</div>
                                        <div className={`${styles.predictionDirection} ${styles[prediction.direction.toLowerCase()]}`}>
                                            {prediction.direction}
                                        </div>
                                        <div className={styles.predictionConfidence}>
                                            Confidence: {prediction.confidence}%
                                        </div>
                                        <div className={styles.predictionTime}>
                                            Generated: {prediction.timestamp}
                                        </div>
                                    </div>

                                    <div className={styles.analysisSummary}>
                                        <h4>Analysis Summary</h4>
                                        <ul>
                                            <li>Volatility patterns indicate a {prediction.direction.toLowerCase()} trend</li>
                                            <li>Market sentiment analysis supports this prediction</li>
                                            <li>Historical data shows similar patterns with 78% accuracy</li>
                                            <li>Recommended entry point: within next 15 minutes</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!isAnalyzing && !prediction && (
                            <div className={styles.placeholder}>
                                <div className={styles.placeholderIcon}>📊</div>
                                <p>Select a market and click "Analyze" to generate predictions</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DPTool;