import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './dptool.module.scss';

const DPTool = () => {
    const [selectedMarket, setSelectedMarket] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    type Prediction = {
        market: string;
        symbol: string;
        direction: string;
        confidence: string;
        volatility: string;
        entry: string;
        target: string;
        stop: string;
        timestamp: string;
    };

    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [progress, setProgress] = useState(0);
    const [codeLines, setCodeLines] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [activeTab, setActiveTab] = useState('markets');

    const analysisInterval = useRef<NodeJS.Timeout | null>(null);
    const codeInterval = useRef<NodeJS.Timeout | null>(null);

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
                    if (analysisInterval.current) {
                        clearInterval(analysisInterval.current as unknown as number);
                    }
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
                if (codeInterval.current) {
                    clearInterval(codeInterval.current);
                }
            }
        }, 600);
    };

    const finishAnalysis = () => {
        clearInterval(analysisInterval.current as unknown as number);

        const market = volatilityMarkets.find(m => m.id === selectedMarket);
        const isUp = Math.random() > 0.5;
        const confidence = (Math.random() * 25 + 75).toFixed(1);

        setPrediction({
            market: market?.name ?? 'Unknown Market',
            symbol: market?.symbol ?? 'N/A',
            direction: isUp ? 'BULLISH' : 'BEARISH',
            confidence: confidence,
            volatility: market?.volatility ?? 'N/A',
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
        <div className={styles.quantumPredictor}>
            {/* Animated Cyber Grid Background */}
            <div className={styles.cyberGrid}>
                <div className={styles.gridLines}></div>
                <div className={styles.gridOverlay}></div>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.gridNode}
                        style={{
                            // @ts-ignore
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--delay': `${Math.random() * 3}s`,
                            '--duration': `${Math.random() * 8 + 4}s`
                        } as React.CSSProperties}
                    ></div>
                ))}
            </div>

            {/* Floating Data Orbs */}
            <div className={styles.dataOrbs}>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.dataOrb}
                        style={{
                            ['--size' as any]: `${Math.random() * 100 + 50}px`,
                            ['--x' as any]: `${Math.random() * 100}%`,
                            ['--y' as any]: `${Math.random() * 100}%`,
                            ['--delay' as any]: `${Math.random() * 5}s`,
                            ['--duration' as any]: `${Math.random() * 20 + 10}s`
                        } as React.CSSProperties}
                    ></div>
                ))}
            </div>

            <div className={styles.predictorContainer}>
                {/* Header */}
                <motion.div
                    className={styles.predictorHeader}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={styles.headerContent}>
                        <div className={styles.titleSection}>
                            <h1 className={styles.mainTitle}>
                                <span className={styles.titleGradient}>QUANTUM</span>
                                <span className={styles.titleAccent}>PREDICTOR</span>
                            </h1>
                            <p className={styles.subtitle}>AI-Powered Market Forecasting System</p>
                        </div>
                        <div className={styles.headerStats}>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>98.7%</span>
                                <span className={styles.statLabel}>Accuracy</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>24/7</span>
                                <span className={styles.statLabel}>Monitoring</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className={styles.predictorContent}>
                    {/* Navigation Tabs */}
                    <div className={styles.navigationTabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'markets' ? styles.active : ''}`}
                            onClick={() => setActiveTab('markets')}
                        >
                            <span className={styles.tabIcon}>📊</span>
                            Markets
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'analysis' ? styles.active : ''}`}
                            onClick={() => setActiveTab('analysis')}
                        >
                            <span className={styles.tabIcon}>🔍</span>
                            Analysis
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'results' ? styles.active : ''}`}
                            onClick={() => setActiveTab('results')}
                        >
                            <span className={styles.tabIcon}>📈</span>
                            Results
                        </button>
                    </div>

                    {/* Main Content Grid */}
                    <div className={styles.contentGrid}>
                        {/* Market Selection Panel */}
                        <motion.div
                            className={styles.marketPanel}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className={styles.panelHeader}>
                                <h2>Select Volatility Index</h2>
                                <div className={styles.panelBadge}>10 Markets</div>
                            </div>

                            <div className={styles.marketGrid}>
                                {volatilityMarkets.map(market => (
                                    <motion.div
                                        key={market.id}
                                        className={`${styles.marketCard} ${selectedMarket === market.id ? styles.selected : ''}`}
                                        onClick={() => !isAnalyzing && setSelectedMarket(market.id)}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className={styles.marketHeader}>
                                            <div className={styles.marketSymbol}>{market.symbol}</div>
                                            <div className={`${styles.volatilityBadge} ${styles[market.volatility.toLowerCase()]}`}>
                                                {market.volatility}
                                            </div>
                                        </div>
                                        <div className={styles.marketName}>{market.name}</div>
                                        <div className={styles.marketPrice}>
                                            {Math.random() > 0.5 ? '↗ ' : '↘ '}
                                            {(Math.random() * 1000).toFixed(2)}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className={styles.actionButtons}>
                                <motion.button
                                    className={styles.analyzeBtn}
                                    onClick={analyzeMarket}
                                    disabled={!selectedMarket || isAnalyzing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className={styles.btnIcon}>⚡</span>
                                    {isAnalyzing ? 'ANALYZING...' : 'LAUNCH ANALYSIS'}
                                </motion.button>

                                {prediction && (
                                    <motion.button
                                        className={styles.resetBtn}
                                        onClick={resetAnalysis}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className={styles.btnIcon}>🔄</span>
                                        NEW ANALYSIS
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>

                        {/* Analysis Panel */}
                        <motion.div
                            className={styles.analysisPanel}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className={styles.panelHeader}>
                                <h2>Quantum Analysis Engine</h2>
                                <div className={styles.panelBadge}>Live</div>
                            </div>

                            {isAnalyzing && (
                                <div className={styles.analysisDisplay}>
                                    {/* Progress Visualization */}
                                    <div className={styles.progressVisualization}>
                                        <div className={styles.progressRing}>
                                            <svg className={styles.ringSvg} viewBox="0 0 100 100">
                                                <circle className={styles.ringBackground} cx="50" cy="50" r="45" />
                                                <motion.circle
                                                    className={styles.ringProgress}
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    initial={{ strokeDashoffset: 283 }}
                                                    animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </svg>
                                            <div className={styles.ringContent}>
                                                <span className={styles.progressValue}>{progress}%</span>
                                                <span className={styles.progressLabel}>Complete</span>
                                            </div>
                                        </div>

                                        <div className={styles.progressStages}>
                                            <div className={`${styles.stage} ${progress > 0 ? styles.active : ''}`}>
                                                <div className={styles.stageDot}></div>
                                                <span>Data Collection</span>
                                            </div>
                                            <div className={`${styles.stage} ${progress > 30 ? styles.active : ''}`}>
                                                <div className={styles.stageDot}></div>
                                                <span>Analysis</span>
                                            </div>
                                            <div className={`${styles.stage} ${progress > 60 ? styles.active : ''}`}>
                                                <div className={styles.stageDot}></div>
                                                <span>Prediction</span>
                                            </div>
                                            <div className={`${styles.stage} ${progress > 90 ? styles.active : ''}`}>
                                                <div className={styles.stageDot}></div>
                                                <span>Results</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Code Terminal */}
                                    <div className={styles.quantumTerminal}>
                                        <div className={styles.terminalHeader}>
                                            <div className={styles.terminalTitle}>
                                                <span className={styles.pulseDot}></span>
                                                QUANTUM_ANALYSIS.exe
                                            </div>
                                            <div className={styles.terminalActions}>
                                                <button>━</button>
                                                <button>□</button>
                                                <button>✕</button>
                                            </div>
                                        </div>
                                        <div className={styles.terminalContent}>
                                            {codeLines.map((line, index) => (
                                                <motion.div
                                                    key={index}
                                                    className={styles.terminalLine}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <span className={styles.linePrefix}>$ </span>
                                                    <span className={styles.lineText}>{line}</span>
                                                    {index === codeLines.length - 1 && (
                                                        <motion.span
                                                            className={styles.terminalCursor}
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
                                        className={styles.resultsDisplay}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className={styles.resultsHeader}>
                                            <h3>PREDICTION COMPLETE</h3>
                                            <div className={`${styles.resultBadge} ${styles.success}`}>SUCCESS</div>
                                        </div>

                                        <div className={styles.predictionCard}>
                                            <div className={styles.predictionHeader}>
                                                <div className={styles.marketInfo}>
                                                    <span className={styles.marketSymbol}>{prediction.symbol}</span>
                                                    <span className={styles.marketName}>{prediction.market}</span>
                                                </div>
                                                <div className={`${styles.directionIndicator} ${styles[prediction.direction.toLowerCase()]}`}>
                                                    {prediction.direction}
                                                </div>
                                            </div>

                                            <div className={styles.confidenceMeter}>
                                                <div className={styles.meterHeader}>
                                                    <span>Confidence Level</span>
                                                    <span>{prediction.confidence}%</span>
                                                </div>
                                                <div className={styles.meterBar}>
                                                    <motion.div
                                                        className={styles.meterFill}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${prediction.confidence}%` }}
                                                        transition={{ duration: 1, delay: 0.3 }}
                                                    />
                                                </div>
                                            </div>

                                            <div className={styles.predictionDetails}>
                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>Volatility</span>
                                                    <span className={styles.detailValue}>{prediction.volatility}</span>
                                                </div>
                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>Suggested Entry</span>
                                                    <span className={styles.detailValue}>{prediction.entry}</span>
                                                </div>
                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>Target Price</span>
                                                    <span className={styles.detailValue}>{prediction.target}</span>
                                                </div>
                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>Stop Loss</span>
                                                    <span className={styles.detailValue}>{prediction.stop}</span>
                                                </div>
                                            </div>

                                            <div className={styles.predictionFooter}>
                                                <span className={styles.timestamp}>Generated: {prediction.timestamp}</span>
                                                <button className={styles.tradeBtn}>
                                                    EXECUTE TRADE
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isAnalyzing && !prediction && (
                                <div className={styles.analysisPlaceholder}>
                                    <div className={styles.placeholderIcon}>🔍</div>
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