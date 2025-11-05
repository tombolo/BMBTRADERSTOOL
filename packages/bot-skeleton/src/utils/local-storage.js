import LZString from 'lz-string';
import localForage from 'localforage';
import DBotStore from '../scratch/dbot-store';
import { save_types } from '../constants/save-type';

// Import bots from utils/bots
import HMSpeedBot from './bots/$hmspeedbot$.xml';
import AutoC4VoltaiPremiumRobot from './bots/AUTOC4VOLTAIPREMIUMROBOT.xml';
import AIUnderRecoveryBot from './bots/Aiunderrecoveryunder345adjustable.xml';
import AlgoSniper from './bots/AlgoSniper.xml';
import BRAMEvenOddPrinter from './bots/BRAMEVENODDPRINTER.xml';
import BRAMSpeedBot from './bots/BRAMSPEEDBOT.xml';
import CandleMineV2 from './bots/CandlemineVersion2.xml';
import DerivWizard from './bots/Derivwizard.xml';
import DoubleOverWithAnalysis from './bots/DoubleOverWithanalysis.xml';
import EnhancedDigitSwitcherV5 from './bots/ENHANCEDDigitSwitcherVERSION5.xml';
import ExpertSpeedBot from './bots/ExpertSpeedBot.xml';
import ExpertSpeedBotByChosenDollar from './bots/ExpertSpeedBotByCHOSENDOLLARPRINTERFx.xml';
import MasterBotV6 from './bots/MASTERBOTV6UPGRADEDDBot.xml';
import MarketKiller from './bots/Marketkiller.xml';
import MrDukeV2Bot from './bots/Mrdukeov2bot.xml';
import OverDestroyerByMikeG from './bots/OVERDESTROYERBYMIKEG.xml';
import OverDestroyerByStateFX from './bots/OverDestroyerbystatefx.xml';
import ProfitGainerXVT from './bots/PROFITGAINERXVT.xml';
import ProfitGainerXVTSetup from './bots/PROFITGAINERXVTscunentrypointbeforrun.xml';
import StatesDigitSwitcherV2 from './bots/STATESDigitSwitcherV2.xml';
import SignalSniperAutoBot from './bots/SignalSniperAutoBot.xml';
import V6StrikerBot from './bots/V6strikerbot.xml';
import MasterG8OverUnder from './bots/masterG8OVERUNDERBYSTATEFXVERSION12026.xml';
import BRAM_ENTRYPOINT_EXPERT from './bots/BRAM_ENTRYPOINT_EXPERT.xml';


// Ensure Blockly is available globally
const getBlockly = () => {
    if (typeof window !== 'undefined' && window.Blockly) {
        return window.Blockly;
    }
    throw new Error('Blockly not available - workspace not initialized');
};

// Static bot configurations - Bots from utils/bots
const STATIC_BOTS = {
    hm_speed_bot2: {
        id: 'hm_speed_bot2',
        name: 'BRAM ENTRYPOINT EXPERT',
        xml: BRAM_ENTRYPOINT_EXPERT,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    hm_speed_bot: {
        id: 'hm_speed_bot',
        name: 'HM SPEED BOT',
        xml: HMSpeedBot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    bram_even_odd_printer: {
        id: 'bram_even_odd_printer',
        name: 'BRAM EVEN ODD PRINTER',
        xml: BRAMEvenOddPrinter,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    bram_speed_bot: {
        id: 'bram_speed_bot',
        name: 'BRAM SPEED BOT',
        xml: BRAMSpeedBot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    deriv_wizard: {
        id: 'deriv_wizard',
        name: 'DERIV WIZARD',
        xml: DerivWizard,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    over_destroyer_mike_g: {
        id: 'over_destroyer_mike_g',
        name: 'OVER DESTROYER',
        xml: OverDestroyerByMikeG,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
    signal_sniper_auto: {
        id: 'signal_sniper_auto',
        name: 'SIGNAL SNIPER AUTO BOT',
        xml: SignalSniperAutoBot,
        timestamp: Date.now(),
        save_type: save_types.LOCAL,
    },
};

const getStaticBots = () => Object.values(STATIC_BOTS);

/**
 * 🔒 Disable saving bots
 */
export const saveWorkspaceToRecent = async () => {
    console.warn('[INFO] Saving disabled → Using static bots only.');
    const {
        load_modal: { updateListStrategies },
    } = DBotStore.instance;
    updateListStrategies(getStaticBots());
};

/**
 * ✅ Always return static bots
 */
export const getSavedWorkspaces = async () => {
    const bots = getStaticBots();
    console.log(
        '[DEBUG] Available static bots:',
        bots.map(bot => bot.id)
    );
    return bots;
};

/**
 * Load a bot by ID (from static list only)
 */
export const loadStrategy = async strategy_id => {
    console.log(`[DEBUG] Attempting to load bot: ${strategy_id}`);

    // Check for duplicate IDs
    const staticBots = getStaticBots();
    const duplicateIds = staticBots.filter((bot, index) => staticBots.findIndex(b => b.id === bot.id) !== index);

    if (duplicateIds.length > 0) {
        console.error(
            '[ERROR] Duplicate bot IDs found:',
            duplicateIds.map(b => b.id)
        );
    }

    const strategy = staticBots.find(bot => bot.id === strategy_id);

    if (!strategy) {
        console.error(
            `[ERROR] Bot with id "${strategy_id}" not found. Available bots:`,
            staticBots.map(b => b.id)
        );
        return false;
    }

    try {
        // Check if workspace is initialized
        if (!Blockly.derivWorkspace) {
            console.error('[ERROR] Blockly workspace not initialized');
            return false;
        }

        // Clear existing workspace first
        console.log('[DEBUG] Clearing existing workspace');
        Blockly.derivWorkspace.clear();

        const parser = new DOMParser();
        const xmlDom = parser.parseFromString(strategy.xml, 'text/xml').documentElement;

        // Check if XML is valid
        if (xmlDom.querySelector('parsererror')) {
            console.error('[ERROR] Invalid XML content for bot:', strategy_id);
            return false;
        }

        const convertedXml = convertStrategyToIsDbot(xmlDom);

        Blockly.Xml.domToWorkspace(convertedXml, Blockly.derivWorkspace);
        Blockly.derivWorkspace.current_strategy_id = strategy_id;

        console.log(`[SUCCESS] Loaded static bot: ${strategy.name} (ID: ${strategy_id})`);
        return true;
    } catch (error) {
        console.error('Error loading static bot:', error);
        return false;
    }
};

/**
 * 🔒 Disable removing bots
 */
export const removeExistingWorkspace = async () => {
    console.warn('[INFO] Remove disabled → Static bots only.');
    return false;
};

/**
 * Ensure xml has `is_dbot` flag
 */
export const convertStrategyToIsDbot = xml_dom => {
    if (!xml_dom) return;
    xml_dom.setAttribute('is_dbot', 'true');
    return xml_dom;
};

// 🧹 Clear storage & recents at startup
localStorage.removeItem('saved_workspaces');
localStorage.removeItem('recent_strategies');
console.log('[INFO] Cleared saved/recent bots → Static bots only.');
