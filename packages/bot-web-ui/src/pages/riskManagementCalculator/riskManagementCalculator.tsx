import React, { useState, useEffect } from 'react';
import styles from './riskManagementCalculator.module.scss';

const RiskManagementCalculator = () => {
    const [capital, setCapital] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);
    const [animateResults, setAnimateResults] = useState(false);

    const calculateResults = () => {
        if (!capital || isNaN(Number(capital)) || Number(capital) <= 0) return;
        setIsCalculated(true);
        setAnimateResults(true);
    };

    const resetCalculator = () => {
        setCapital('');
        setIsCalculated(false);
        setAnimateResults(false);
    };

    const appendNumber = (num: number | string) => {
        setCapital((prev) => (prev === '0' ? num.toString() : (prev || '') + num.toString()));
    };

    const deleteLast = () => {
        setCapital((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
    };

    // Reset animation state after calculation completes
    useEffect(() => {
        if (animateResults) {
            const timer = setTimeout(() => setAnimateResults(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [animateResults]);

    return (
        <div className={styles.container}>
            {/* Animated background elements */}
            <div className={styles.animatedBackground}>
                <div className={styles.floatingParticle} style={{ '--delay': '0s', '--size': '8px', '--left': '10%', '--duration': '15s' } as React.CSSProperties}></div>
                <div className={styles.floatingParticle} style={{ '--delay': '1s', '--size': '12px', '--left': '20%', '--duration': '20s' } as React.CSSProperties}></div>
                <div className={styles.floatingParticle} style={{ '--delay': '3s', '--size': '6px', '--left': '30%', '--duration': '18s' } as React.CSSProperties}></div>
                <div className={styles.floatingParticle} style={{ '--delay': '2s', '--size': '10px', '--left': '40%', '--duration': '25s' } as React.CSSProperties}></div>
                <div className={styles.floatingParticle} style={{ '--delay': '4s', '--size': '14px', '--left': '60%', '--duration': '22s' } as React.CSSProperties}></div>
                <div className={styles.floatingParticle} style={{ '--delay': '5s', '--size': '7px', '--left': '80%', '--duration': '17s' } as React.CSSProperties}></div>
                <div className={styles.floatingParticle} style={{ '--delay': '6s', '--size': '9px', '--left': '90%', '--duration': '19s' } as React.CSSProperties}></div>
            </div>

            <div className={styles.mainContent}>
                <h1 className={styles.title}>
                    <span className={styles.titleText}>Risk Management Calculator</span>
                    <div className={styles.titleUnderline}></div>
                </h1>

                <div className={styles.contentWrapper}>
                    {/* Input Column */}
                    <div className={`${styles.inputColumn} ${animateResults ? styles.calculated : ''}`}>
                        <label className={styles.label}>
                            <span className={styles.labelIcon}>💼</span>
                            Enter Your Capital ($)
                        </label>
                        <div className={styles.display}>
                            {capital ? `$${capital}` : '$0'}
                            <div className={styles.displayCurrencyGlow}></div>
                        </div>

                        {/* Keypad */}
                        <div className={styles.keypad}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => (item === '⌫' ? deleteLast() : appendNumber(item))}
                                    className={`${styles.keypadButton} ${typeof item === 'number' || item === '.'
                                        ? styles.numberButton
                                        : styles.deleteButton
                                        }`}
                                >
                                    {item}
                                    <span className={styles.buttonRipple}></span>
                                </button>
                            ))}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                onClick={calculateResults}
                                className={styles.calculateButton}
                                disabled={!capital || isNaN(Number(capital)) || Number(capital) <= 0}
                            >
                                <span>Calculate Risk</span>
                                <div className={styles.buttonSparkle}></div>
                            </button>
                            <button
                                onClick={resetCalculator}
                                className={styles.resetButton}
                            >
                                <span>Clear</span>
                            </button>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className={styles.resultsColumn}>
                        <h2 className={styles.resultsTitle}>
                            Risk Management Plan
                            <div className={styles.resultsTitleAnimation}></div>
                        </h2>

                        <div className={styles.resultsGrid}>
                            <ResultCard
                                title="Stake Amount"
                                value={isCalculated ? `$${(Number(capital) * 0.1).toFixed(2)}` : '$0.00'}
                                color="#6366F1"
                                icon="💰"
                                animate={animateResults}
                                delay={0}
                            />
                            <ResultCard
                                title="Take Profit"
                                value={isCalculated ? `$${(Number(capital) * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#10B981"
                                icon="🎯"
                                animate={animateResults}
                                delay={100}
                            />
                            <ResultCard
                                title="Stop Loss"
                                value={isCalculated ? `$${(Number(capital) * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#EF4444"
                                icon="🛑"
                                animate={animateResults}
                                delay={200}
                            />
                            <ResultCard
                                title="Loss Protection"
                                value="3 Trades"
                                color="#8B5CF6"
                                icon="🛡️"
                                animate={animateResults}
                                delay={300}
                            />
                        </div>

                        <div className={`${styles.warningBox} ${animateResults ? styles.animateIn : ''}`}>
                            <div className={styles.warningTitle}>
                                <span>⚠️</span> Martingale Sequence (x2)
                            </div>
                            <div className={styles.warningContent}>
                                {isCalculated
                                    ? `${(Number(capital) * 0.02).toFixed(2)} → ${(Number(capital) * 0.04).toFixed(2)} → ${(Number(capital) * 0.08).toFixed(2)}`
                                    : 'Enter amount to calculate'}
                            </div>
                        </div>

                        <div className={`${styles.infoBox} ${animateResults ? styles.animateIn : ''}`}>
                            <div className={styles.infoTitle}>
                                <span>💼</span> Required Capital Buffer
                            </div>
                            <div className={styles.infoValue}>
                                {isCalculated ? `$${(Number(capital) * 0.02 * 7).toFixed(2)}` : '$0.00'}
                                <div className={styles.valuePulse}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type ResultCardProps = {
    title: string;
    value: string;
    color: string;
    icon: React.ReactNode;
    animate: boolean;
    delay: number;
};

const ResultCard = ({ title, value, color, icon, animate, delay }: ResultCardProps) => {
    const rgb = hexToRgb(color);

    return (
        <div className={`${styles.resultCard} ${animate ? styles.animateIn : ''}`}
            style={{
                backgroundColor: `rgba(${rgb},0.1)`,
                borderLeft: `4px solid ${color}`,
                animationDelay: `${delay}ms`,
                '--glow-color': color
            } as React.CSSProperties}>
            <div className={styles.cardIcon} style={{ color }}>
                {icon}
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                    {title}
                </div>
                <div className={styles.cardValue}>
                    {value}
                </div>
            </div>
            <div className={styles.cardGlow}></div>
        </div>
    );
};

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

export default RiskManagementCalculator;