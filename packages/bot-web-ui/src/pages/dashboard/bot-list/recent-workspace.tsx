import React from 'react';
import { observer } from '@deriv/stores';
import { useDBotStore } from 'Stores/useDBotStore';
import { TRecentStrategy } from './types';
import './recent-workspace.scss';

// Replacing emojis with modern trading icons
const BOT_ICONS = [
    '📊', '📈', '📉', '⚡', '🔍', '🎯', '🔄', '💹'
];

const BOT_DESCRIPTIONS = [
    "This bot uses moving averages to identify trends. It enters trades when short-term averages cross above long-term ones.",
    "A volatility-based bot that expands position size during high volatility. It uses Bollinger Bands to determine entry points.",
    "This mean-reversion bot trades when prices deviate from historical averages. It works best in ranging markets.",
    "A breakout strategy that enters trades when price moves beyond support/resistance. Uses volume confirmation.",
    "This bot implements a simple scalping strategy. It aims for small profits with tight stop losses.",
    "A momentum-based bot that follows strong trending moves. Uses RSI to avoid overbought conditions.",
    "This grid bot places orders at fixed intervals above and below price. It profits from market oscillations.",
    "A news-based bot that reacts to economic events. Uses sentiment analysis to determine trade direction."
];

const RecentWorkspace = observer(({ workspace, index }: { workspace: TRecentStrategy, index: number }) => {
    const { dashboard, load_modal } = useDBotStore();

    const handleClick = async () => {
        await load_modal.loadFileFromRecent();
        dashboard.setActiveTab(1);
    };

    const botIcon = BOT_ICONS[index % BOT_ICONS.length];
    const botDescription = BOT_DESCRIPTIONS[index % BOT_DESCRIPTIONS.length];

    return (
        <div className="trading-bot-card" onClick={handleClick} data-index={index}>
            {/* Background Elements */}
            <div className="trading-bot-card__background">
                <div className="trading-bot-card__grid"></div>
                <div className="trading-bot-card__gradient"></div>
            </div>

            {/* Animated Connection Nodes */}
            <div className="trading-bot-card__nodes">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="trading-bot-card__node"></div>
                ))}
            </div>

            {/* Content */}
            <div className="trading-bot-card__content">
                <div className="trading-bot-card__header">
                    <div className="trading-bot-card__icon">{botIcon}</div>
                    <div className="trading-bot-card__title-section">
                        <h3 className="trading-bot-card__name">{workspace.name || 'Untitled Bot'}</h3>
                        <div className="trading-bot-card__status">
                            <span className="trading-bot-card__status-indicator"></span>
                            <span className="trading-bot-card__status-text">Ready</span>
                        </div>
                    </div>
                </div>

                <p className="trading-bot-card__description">{botDescription}</p>

                <div className="trading-bot-card__footer">
                    <div className="trading-bot-card__metrics">
                        <div className="trading-bot-card__metric">
                            <span className="trading-bot-card__metric-value">78%</span>
                            <span className="trading-bot-card__metric-label">Success</span>
                        </div>
                        <div className="trading-bot-card__metric">
                            <span className="trading-bot-card__metric-value">24h</span>
                            <span className="trading-bot-card__metric-label">Active</span>
                        </div>
                    </div>

                    <button className="trading-bot-card__action">
                        <span>Load Strategy</span>
                        <div className="trading-bot-card__action-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            {/* Hover Effects */}
            <div className="trading-bot-card__shine"></div>
            <div className="trading-bot-card__border"></div>
        </div>
    );
});

export default RecentWorkspace;