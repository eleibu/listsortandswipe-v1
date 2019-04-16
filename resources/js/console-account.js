import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Landing } from './console-account-landing.js';
import { ChangePwd } from './console-account-changepwd.js';
import { Renew } from './console-account-renewupgrade.js';
import { Upgrade } from './console-account-renewupgrade.js';

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMask: false
        };
        this.setShowMask = this.setShowMask.bind(this);
    }
    setShowMask(show) {
        this.setState({
            showMask: show
        });
    }
    render() {
        let maskStyle;
        if (this.state.showMask) {
            maskStyle = {display: 'block'};
        } else {
            maskStyle = {display: 'none'};
        }
        return (
            <React.Fragment>
                <CSSTransition in={(this.props.accountSubpage == 'Landing')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <Landing
                        accountData_name={this.props.accountData_name}
                        accountData_surname={this.props.accountData_surname}
                        accountData_email={this.props.accountData_email}
                        accountData_companyName={this.props.accountData_companyName}
                        accountData_countryName={this.props.accountData_countryName}
                        accountData_accountType={this.props.accountData_accountType}
                        accountData_accountLicenceKey={this.props.accountData_accountLicenceKey}
                        accountData_accountExpiresAt={this.props.accountData_accountExpiresAt}
                        accountData_domainCountBase={this.props.accountData_domainCountBase}
                        accountData_domainCountAdditional={this.props.accountData_domainCountAdditional}
                        domainsUsed={this.props.domainsUsed}
                        setAccountSubpage={this.props.setAccountSubpage}
                    />
                </CSSTransition>
                <CSSTransition in={(this.props.accountSubpage == 'ChangePwd')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <ChangePwd
                        accountData_email={this.props.accountData_email}
                        setShowMask={this.setShowMask}
                        setAccountSubpage={this.props.setAccountSubpage}
                        showMainMsg={this.props.showMainMsg}
                        closeMainMsg={this.props.closeMainMsg}
                        addServerRequestObj={this.props.addServerRequestObj}
                        deleteServerRequestObj={this.props.deleteServerRequestObj}
                    />
                </CSSTransition>
                <CSSTransition in={(this.props.accountSubpage == 'Renew')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <Renew
                        accountData_name={this.props.accountData_name}
                        accountData_surname={this.props.accountData_surname}
                        accountData_companyName={this.props.accountData_companyName}
                        accountData_countryName={this.props.accountData_countryName}
                        accountData_accountType={this.props.accountData_accountType}
                        accountData_accountExpiresAt={this.props.accountData_accountExpiresAt}
                        accountData_domainCountAdditional={this.props.accountData_domainCountAdditional}
                        setAccountData={this.props.setAccountData}
                        setShowMask={this.setShowMask}
                        setAccountSubpage={this.props.setAccountSubpage}
                        showMainMsg={this.props.showMainMsg}
                        closeMainMsg={this.props.closeMainMsg}
                        addServerRequestObj={this.props.addServerRequestObj}
                        deleteServerRequestObj={this.props.deleteServerRequestObj}
                    />
                </CSSTransition>
                <CSSTransition in={(this.props.accountSubpage == 'Upgrade')} classNames="accountcontent-trans" timeout={{ enter: 200, exit: 200 }} unmountOnExit>
                    <Upgrade
                        accountData_name={this.props.accountData_name}
                        accountData_surname={this.props.accountData_surname}
                        accountData_companyName={this.props.accountData_companyName}
                        accountData_countryName={this.props.accountData_countryName}
                        accountData_accountType={this.props.accountData_accountType}
                        accountData_accountExpiresAt={this.props.accountData_accountExpiresAt}
                        accountData_domainCountAdditional={this.props.accountData_domainCountAdditional}
                        setAccountData={this.props.setAccountData}
                        setShowMask={this.setShowMask}
                        setAccountSubpage={this.props.setAccountSubpage}
                        showMainMsg={this.props.showMainMsg}
                        closeMainMsg={this.props.closeMainMsg}
                        addServerRequestObj={this.props.addServerRequestObj}
                        deleteServerRequestObj={this.props.deleteServerRequestObj}
                    />
                </CSSTransition>
                <div style={maskStyle} className="account-mask">
                </div>
            </React.Fragment>
        );
    }
}