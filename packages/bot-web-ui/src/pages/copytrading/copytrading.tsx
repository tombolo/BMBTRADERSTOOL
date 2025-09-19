"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./CopyTradingPage.module.scss";

export default function CopyTradingPage() {
    const [loginId, setLoginId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [currency, setCurrency] = useState<string | null>(null);
    const [isVirtual, setIsVirtual] = useState<boolean>(false);
    const [traderToken, setTraderToken] = useState<string>("");
    const [isCopyTrading, setIsCopyTrading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [statusColor, setStatusColor] = useState<string>("#10B981");
    const [showStatus, setShowStatus] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeToken, setActiveToken] = useState<string>("");
    const [copiedTrades, setCopiedTrades] = useState<number>(0);

    const ws = useRef<WebSocket | null>(null);

    // Initialize WebSocket connection
    useEffect(() => {
        const token = localStorage.getItem("activeToken");
        if (!token) {
            setIsLoading(false);
            return;
        }

        setActiveToken(token);
        initializeWebSocket(token);

        // Fetch user info from localStorage
        setLoginId(localStorage.getItem('active_loginid'));
        setName(localStorage.getItem('name'));
        setBalance(localStorage.getItem('balance'));
        setCurrency(localStorage.getItem('currency'));
        setIsVirtual(localStorage.getItem('is_virtual') === 'true');

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    const initializeWebSocket = (token: string) => {
        ws.current = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=70344");

        ws.current.onopen = () => {
            authorizeConnection(token);
        };

        ws.current.onmessage = (msg) => {
            handleWebSocketMessage(msg);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            showMessage("Connection error. Please refresh the page.", "#EF4444");
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };
    };

    const authorizeConnection = (token: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ authorize: token }));
        }
    };

    const handleWebSocketMessage = (msg: MessageEvent) => {
        const data = JSON.parse(msg.data);

        if (data.error) {
            console.error("API Error:", data.error);
            showMessage(`Error: ${data.error.message}`, "#EF4444");
            return;
        }

        if (data.msg_type === "authorize") {
            setLoginId(data.authorize.loginid);
            setName(data.authorize.fullname || "---");
            getAccountBalance();
        }

        if (data.msg_type === "balance") {
            const bal = data.balance.balance.toFixed(2);
            const cur = data.balance.currency;
            setBalance(`${bal} ${cur}`);
            setIsLoading(false);
        }

        if (data.msg_type === "copy_start") {
            if (data.copy_start === 1) {
                setIsCopyTrading(true);
                showMessage("✅ Copy trading started successfully", "#10B981");
                // Start monitoring copied trades
                monitorCopiedTrades();
            } else {
                showMessage("❌ Failed to start copy trading", "#EF4444");
            }
        }

        if (data.msg_type === "copy_stop") {
            if (data.copy_stop === 1) {
                setIsCopyTrading(false);
                showMessage("🛑 Copy trading stopped successfully", "#10B981");
            } else {
                showMessage("❌ Failed to stop copy trading", "#EF4444");
            }
        }
    };

    const getAccountBalance = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ balance: 1, subscribe: 1 }));
        }
    };

    const monitorCopiedTrades = () => {
        // In a real implementation, you would subscribe to trade events
        // and update the copiedTrades count accordingly
        // This is a simulation that increments the count every 10 seconds
        const interval = setInterval(() => {
            if (isCopyTrading) {
                setCopiedTrades(prev => prev + 1);
            } else {
                clearInterval(interval);
            }
        }, 10000);

        return () => clearInterval(interval);
    };

    // ✅ show status messages
    const showMessage = (msg: string, color: string = "#10B981") => {
        setStatusMessage(msg);
        setStatusColor(color);
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 3000);
    };

    // ✅ start copy trading
    const startCopyTrading = () => {
        if (!traderToken.trim()) {
            showMessage("⚠️ Please enter a valid trader token", "#EF4444");
            return;
        }

        if (!activeToken) {
            showMessage("⚠️ Please login first", "#EF4444");
            return;
        }

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const copyStartRequest = {
                copy_start: traderToken.trim(),
                loginid: loginId !== "---" ? loginId : undefined,
                req_id: Date.now()
            };

            // Remove undefined fields
            Object.keys(copyStartRequest).forEach(key =>
                copyStartRequest[key as keyof typeof copyStartRequest] === undefined &&
                delete copyStartRequest[key as keyof typeof copyStartRequest]
            );

            ws.current.send(JSON.stringify(copyStartRequest));
        } else {
            showMessage("⚠️ Connection not ready. Please try again.", "#EF4444");
        }
    };

    // ✅ stop copy trading
    const stopCopyTrading = () => {
        if (!traderToken.trim()) {
            showMessage("⚠️ No active copy trading session", "#EF4444");
            return;
        }

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const copyStopRequest = {
                copy_stop: traderToken.trim(),
                loginid: loginId !== "---" ? loginId : undefined,
                req_id: Date.now()
            };

            // Remove undefined fields
            Object.keys(copyStopRequest).forEach(key =>
                copyStopRequest[key as keyof typeof copyStopRequest] === undefined &&
                delete copyStopRequest[key as keyof typeof copyStopRequest]
            );

            ws.current.send(JSON.stringify(copyStopRequest));
        } else {
            showMessage("⚠️ Connection not ready. Please try again.", "#EF4444");
        }
    };

    // ✅ handle copy trading button click
    const handleCopyTrading = () => {
        if (isCopyTrading) {
            stopCopyTrading();
        } else {
            startCopyTrading();
        }
    };

    return (
        <div className={styles.copytradingContainer}>
            {/* Animated Background Elements */}
            <div className={styles.animatedBg}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
            </div>

            <div className={styles.container}>
                {/* Header with Logo */}
                <header className={styles.dashboardHeader}>
                    <div className={styles.logoSection}>
                        <div className={styles.logo}>
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" fill="#10B981" />
                                <path d="M21.5 13.5l-6 6-3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>TradeSync Pro</span>
                        </div>
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            {name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '---'}
                        </div>
                    </div>
                </header>

                {/* Main Dashboard */}
                <main className={styles.dashboardMain}>
                    {/* Account Summary Card */}
                    <div className={`${styles.accountSummaryCard} ${styles.sharpCard}`}>
                        {isLoading ? (
                            <div className={styles.loadingPulse}>
                                <div className={styles.pulseLine}></div>
                                <div className={`${styles.pulseLine} ${styles.short}`}></div>
                            </div>
                        ) : (
                            <>
                                <div className={styles.accountInfo}>
                                    <div className={styles.accountId}>{loginId}</div>
                                    <div className={styles.accountName}>{name || "---"}</div>
                                </div>
                                <div className={styles.accountBalance}>
                                    <div className={styles.balanceLabel}>Available Balance</div>
                                    <div className={styles.balanceAmount}>{balance} {currency}</div>
                                </div>
                                <div className={styles.accountStatus}>
                                    <span className={`${styles.statusIndicator} ${isCopyTrading ? styles.active : ''}`}>
                                        {isCopyTrading ? 'Live Trading' : 'Not Trading'}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Trading Controls */}
                    <div className={`${styles.tradingControls} ${styles.sharpCard}`}>
                        <h3 className={styles.sectionTitle}>
                            <span className={styles.titleIcon}>📈</span>
                            Copy Trading Controls
                        </h3>

                        <div className={styles.inputGroup}>
                            <label htmlFor="traderToken">Trader API Token (15-32 characters)</label>
                            <div className={styles.inputContainer}>
                                <input
                                    id="traderToken"
                                    type="text"
                                    className={styles.modernInput}
                                    placeholder="Enter trader's API token"
                                    value={traderToken}
                                    onChange={(e) => setTraderToken(e.target.value)}
                                    disabled={isCopyTrading}
                                    pattern="[\w\s-]{15,32}"
                                    title="Token must be 15-32 characters containing letters, numbers, spaces, or hyphens"
                                />
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                className={`${styles.tradingButton} ${isCopyTrading ? styles.stopTrading : styles.startTrading}`}
                                onClick={handleCopyTrading}
                                disabled={isLoading}
                            >
                                <span className={styles.buttonIcon}>
                                    {isCopyTrading ? '🛑' : '🚀'}
                                </span>
                                <span className={styles.buttonText}>
                                    {isCopyTrading ? 'Stop Copy Trading' : 'Start Copy Trading'}
                                </span>
                                <span className={styles.buttonEffect}></span>
                            </button>
                        </div>

                        <div className={styles.apiInfo}>
                            <small>API: copy_start | copy_stop</small>
                        </div>
                    </div>

                    {/* Stats Preview */}
                    <div className={`${styles.statsPreview} ${styles.sharpCard}`}>
                        <h3 className={styles.sectionTitle}>Performance Summary</h3>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>📊</div>
                                <div className={styles.statValue}>{copiedTrades}</div>
                                <div className={styles.statLabel}>Copied Trades</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>📈</div>
                                <div className={styles.statValue}>--%</div>
                                <div className={styles.statLabel}>Success Rate</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>👥</div>
                                <div className={styles.statValue}>1</div>
                                <div className={styles.statLabel}>Active Traders</div>
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className={`${styles.statusMessage} ${showStatus ? styles.visible : ''}`}>
                        <div className={styles.messageContent} style={{ color: statusColor }}>
                            <span className={styles.messageIcon}>
                                {statusColor === '#10B981' ? '✅' : '⚠️'}
                            </span>
                            {statusMessage}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}