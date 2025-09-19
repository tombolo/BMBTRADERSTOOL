import React from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Icon, Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { getCurrencyDisplayCode } from '@deriv/shared';
import { useDevice } from '@deriv-com/ui';
import AccountSwitcher from '../../../../core/src/App/Containers/AccountSwitcher';
import AccountSwitcherMobile from '../../../../core/src/App/Containers/AccountSwitcher/account-switcher-mobile';
import AccountInfoWrapper from '../../../../core/src/App/Components/Layout/Header/account-info-wrapper';
import AccountInfoIcon from '../../../../core/src/App/Components/Layout/Header/account-info-icon';
import DisplayAccountType from '../../../../core/src/App/Components/Layout/Header/display-account-type';

type CopytradingProps = {
    acc_switcher_disabled_message?: string;
    account_type?: string;
    balance?: string;
    currency?: string;
    disableApp?: () => void;
    enableApp?: () => void;
    is_dialog_on?: boolean;
    is_disabled?: boolean;
    is_eu?: boolean;
    is_virtual?: boolean;
    is_mobile?: boolean;
    loginid?: string;
    toggleDialog?: () => void;
};

const Copytrading: React.FC<CopytradingProps> = ({
    acc_switcher_disabled_message = '',
    account_type = '',
    balance = '0.00',
    currency = '',
    disableApp = () => { },
    enableApp = () => { },
    is_dialog_on = false,
    is_disabled = false,
    is_eu = false,
    is_virtual = false,
    is_mobile = false,
    loginid = '',
    toggleDialog = () => { },
}) => {
    const currency_lower = currency?.toLowerCase();
    const { isDesktop } = useDevice();

    return (
        <div className="acc-info__wrapper">
            <div className="acc-info__separator" />
            <AccountInfoWrapper
                is_disabled={is_disabled}
                disabled_message={acc_switcher_disabled_message}
                is_mobile={is_mobile}
            >
                <div
                    data-testid="dt_acc_info"
                    id="dt_core_account-info_acc-info"
                    className={classNames('acc-info', {
                        'acc-info--show': is_dialog_on,
                        'acc-info--is-virtual': is_virtual,
                        'acc-info--is-disabled': is_disabled,
                    })}
                    onClick={is_disabled ? undefined : () => toggleDialog()}
                >
                    <span className="acc-info__id">
                        {isDesktop ? (
                            <AccountInfoIcon is_virtual={is_virtual} currency={currency_lower} />
                        ) : (
                            (is_virtual || currency) && (
                                <AccountInfoIcon is_virtual={is_virtual} currency={currency_lower} />
                            )
                        )}
                    </span>
                    {(typeof balance !== 'undefined' || !currency) && (
                        <div className="acc-info__account-type-and-balance">
                            <p
                                data-testid="dt_balance"
                                className={classNames('acc-info__balance', {
                                    'acc-info__balance--no-currency': !currency && !is_virtual,
                                })}
                            >
                                {!currency ? (
                                    <Localize i18n_default_text="No currency assigned" />
                                ) : (
                                    `${balance} ${getCurrencyDisplayCode(currency)}`
                                )}
                            </p>
                            <Text size="xxxs" line_height="s">
                                <DisplayAccountType account_type={account_type} is_eu={is_eu} />
                            </Text>
                            {loginid && (
                                <Text size="xxxs" line_height="s" className="acc-info__loginid">
                                    ID: {loginid}
                                </Text>
                            )}
                        </div>
                    )}
                    {is_disabled ? (
                        <Icon data_testid="dt_lock_icon" icon="IcLock" />
                    ) : (
                        <Icon
                            data_testid="dt_select_arrow"
                            icon="IcChevronDownBold"
                            className="acc-info__select-arrow"
                        />
                    )}
                </div>
            </AccountInfoWrapper>
            {isDesktop ? (
                <CSSTransition
                    in={is_dialog_on}
                    timeout={200}
                    classNames={{
                        enter: 'acc-switcher__wrapper--enter',
                        enterDone: 'acc-switcher__wrapper--enter-done',
                        exit: 'acc-switcher__wrapper--exit',
                    }}
                    unmountOnExit
                >
                    <div className="acc-switcher__wrapper">
                        <AccountSwitcher />
                    </div>
                </CSSTransition>
            ) : (
                <AccountSwitcherMobile
                    is_visible={is_dialog_on}
                    disableApp={disableApp}
                    enableApp={enableApp}
                    toggle={toggleDialog}
                />
            )}
        </div>
    );
};

export default Copytrading;
