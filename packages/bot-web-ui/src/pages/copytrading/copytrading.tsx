import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon, Text } from '@deriv/components';
import { Localize } from '@deriv/translations';
import { getCurrencyDisplayCode } from '@deriv/shared';
import { useDevice } from '@deriv-com/ui';
import AccountInfoWrapper from '../../../../core/src/App/Components/Layout/Header/account-info-wrapper';
import AccountInfoIcon from '../../../../core/src/App/Components/Layout/Header/account-info-icon';
import DisplayAccountType from '../../../../core/src/App/Components/Layout/Header/display-account-type';
import './CopyTradingPage.module.scss';


const Copytrading: React.FC = () => {
    const [balance, setBalance] = useState<string>('0.00');
    const [currency, setCurrency] = useState<string>('');
    const [loginid, setLoginid] = useState<string>('');
    const [accountType, setAccountType] = useState<string>('Real');

    const { isDesktop } = useDevice();
    useEffect(() => {
        // Example: get values from localStorage (or API call later)
        const stored_balance = localStorage.getItem('balance');
        const stored_currency = localStorage.getItem('currency');
        const stored_loginid = localStorage.getItem('active_loginid');
        const stored_type = localStorage.getItem('account_type');

        if (stored_balance) setBalance(stored_balance);
        if (stored_currency) setCurrency(stored_currency);
        if (stored_loginid) setLoginid(stored_loginid);
        if (stored_type) setAccountType(stored_type);
    }, []);

    return (
        <div className="copytrading__wrapper">
            <AccountInfoWrapper is_disabled={false} disabled_message="" is_mobile={false}>
                <div
                    data-testid="dt_acc_info"
                    id="dt_core_account-info_acc-info"
                    className={classNames('copytrading__acc-info')}
                >
                    <span className="copytrading__icon">
                        <AccountInfoIcon is_virtual={false} currency={currency.toLowerCase()} />
                    </span>

                    <div className="copytrading__details">
                        <p
                            data-testid="dt_balance"
                            className={classNames('copytrading__balance', {
                                'copytrading__balance--no-currency': !currency,
                            })}
                        >
                            {!currency ? (
                                <Localize i18n_default_text="No currency assigned" />
                            ) : (
                                `${balance} ${getCurrencyDisplayCode(currency)}`
                            )}
                        </p>
                        <Text size="xxxs" line_height="s">
                            <DisplayAccountType account_type={accountType} is_eu={false} />
                        </Text>
                        {loginid && (
                            <Text size="xxxs" line_height="s" className="copytrading__loginid">
                                ID: {loginid}
                            </Text>
                        )}
                    </div>

                    <Icon
                        data_testid="dt_select_arrow"
                        icon="IcChevronDownBold"
                        className="copytrading__select-arrow"
                    />
                </div>
            </AccountInfoWrapper>
        </div>
    );
};

export default Copytrading;
