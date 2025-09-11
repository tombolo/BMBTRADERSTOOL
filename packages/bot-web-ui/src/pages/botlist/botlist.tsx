import React, { useEffect, useState } from 'react';
import { getSavedWorkspaces } from '@deriv/bot-skeleton';
import { Text, Icon } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { Localize } from '@deriv/translations';
import { useDBotStore } from 'Stores/useDBotStore';
import RecentWorkspace from '../dashboard/bot-list/recent-workspace';
import './botlist.scss';

const DashboardBotList = observer(() => {
    const { load_modal } = useDBotStore();
    const { ui } = useStore();
    const { is_mobile } = ui;
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isHoveringTitle, setIsHoveringTitle] = useState(false);

    useEffect(() => {
        const loadStrategies = async () => {
            setIsLoading(true);
            const strategies = await getSavedWorkspaces();
            load_modal.setDashboardStrategies(strategies);
            setTimeout(() => setIsLoading(false), 800);
        };
        loadStrategies();
    }, []);

    const filteredBots = load_modal.dashboard_strategies?.filter(bot =>
        bot.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bot-dashboard">
            {/* Animated background elements */}
            <div className="floating-shapes">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="shape"
                        style={{
                            ['--size' as any]: `${Math.random() * 80 + 40}px`,
                            ['--x' as any]: `${Math.random() * 100}%`,
                            ['--y' as any]: `${Math.random() * 100}%`,
                            ['--delay' as any]: `${Math.random() * 3}s`,
                            ['--duration' as any]: `${Math.random() * 20 + 15}s`,
                            ['--color' as any]: `hsla(${Math.random() * 60 + 180}, 70%, 60%, ${Math.random() * 0.1 + 0.05})`
                        }}
                    />
                ))}
            </div>

            {/* Glowing orbs */}
            <div className="orb-background">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div
                        className="title-section"
                        onMouseEnter={() => setIsHoveringTitle(true)}
                        onMouseLeave={() => setIsHoveringTitle(false)}
                    >
                        <h1 className="main-title">
                            <span className={`title-text ${isHoveringTitle ? 'title-hover' : ''}`}>
                                <Localize i18n_default_text="Bot Collection" />
                            </span>
                            <span className={`title-emoji ${isHoveringTitle ? 'emoji-hover' : ''}`}>
                                🤖
                            </span>
                        </h1>
                        <p className="subtitle">
                            <Localize i18n_default_text="Manage your automated trading strategies" />
                        </p>
                    </div>

                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <Icon icon="IcSearch" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search bots..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    {isLoading ? (
                        <div className="skeleton-grid">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton-card">
                                    <div className="skeleton-thumb"></div>
                                    <div className="skeleton-line"></div>
                                    <div className="skeleton-line-sm"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {filteredBots?.length > 0 ? (
                                <div className="bot-grid">
                                    {filteredBots.map((workspace, index) => (
                                        <RecentWorkspace
                                            key={workspace.id}
                                            workspace={workspace}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <Icon icon="IcBox" />
                                    </div>
                                    <Text as="h3" weight="bold" align="center">
                                        <Localize i18n_default_text="No bots found" />
                                    </Text>
                                    <Text as="p" size="xs" align="center" className="empty-text">
                                        {searchTerm ? (
                                            <Localize i18n_default_text="Try a different search term" />
                                        ) : (
                                            <Localize i18n_default_text="Create your first bot to get started" />
                                        )}
                                    </Text>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

export default DashboardBotList;