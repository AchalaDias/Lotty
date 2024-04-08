/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { BasicUserInfo, Hooks, useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
// import { default as authConfig } from "../../public/config.json";
import LOGIN_LOGO from "../images/login-lady.png";
import { DefaultLayout } from "../layouts/default";
import { useLocation } from "react-router-dom";
import { LogoutRequestDenied } from "../components/LogoutRequestDenied";
import { USER_DENIED_LOGOUT } from "../constants/errors";
import { ResponsiveAppBar } from "../components/menu-bar";
import { SlotMachineComponent } from "../components/SlotMachine";
import { ResultsComponent } from "../components/PriceResults";
import { LotteryComponent } from "../components/Lottery";
import FOOTER_LOGOS from "../images/footer.png";

interface DerivedState {
    authenticateResponse: BasicUserInfo,
    idToken: string[],
    decodedIdTokenHeader: string,
    decodedIDTokenPayload: Record<string, string | number | boolean>;
}

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const HomePage: FunctionComponent = (): ReactElement => {

    const {
        state,
        signIn,
        signOut,
        getBasicUserInfo,
        getIDToken,
        getDecodedIDToken,
        on
    } = useAuthContext();

    const [derivedAuthenticationState, setDerivedAuthenticationState] = useState<DerivedState>(null);
    const [hasAuthenticationErrors, setHasAuthenticationErrors] = useState<boolean>(false);
    const [hasLogoutFailureError, setHasLogoutFailureError] = useState<boolean>();

    const [menuBarHandlerSlotMachine, setMenuBarHandlerSlotMachine] = useState<boolean>(true);
    const [menuBarHandlerLottery, setMenuBarHandlerLottery] = useState<boolean>(false);
    const [menuBarHandlerResults, setMenuBarHandlerResults] = useState<boolean>(false);

    const search = useLocation().search;
    const stateParam = new URLSearchParams(search).get('state');
    const errorDescParam = new URLSearchParams(search).get('error_description');

    useEffect(() => {

        if (!state?.isAuthenticated) {
            return;
        }

        (async (): Promise<void> => {
            const basicUserInfo = await getBasicUserInfo();
            const idToken = await getIDToken();
            const decodedIDToken = await getDecodedIDToken();

            const derivedState: DerivedState = {
                authenticateResponse: basicUserInfo,
                idToken: idToken.split("."),
                decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
                decodedIDTokenPayload: decodedIDToken
            };

            setDerivedAuthenticationState(derivedState);
        })();
    }, [state.isAuthenticated, getBasicUserInfo, getIDToken, getDecodedIDToken]);

    useEffect(() => {
        if (stateParam && errorDescParam) {
            if (errorDescParam === "End User denied the logout request") {
                setHasLogoutFailureError(true);
            }
        }
    }, [stateParam, errorDescParam]);

    const handleLogin = useCallback(() => {
        setHasLogoutFailureError(false);
        signIn()
            .catch(() => setHasAuthenticationErrors(true));
    }, [signIn]);

    /**
      * handles the error occurs when the logout consent page is enabled
      * and the user clicks 'NO' at the logout consent page
      */
    useEffect(() => {
        on(Hooks.SignOut, () => {
            setHasLogoutFailureError(false);
        });

        on(Hooks.SignOutFailed, () => {
            if (!errorDescParam) {
                handleLogin();
            }
        })
    }, [on, handleLogin, errorDescParam]);

    const handleLogout = () => {
        signOut();
    };

    // If `clientID` is not defined in `config.json`, show a UI warning.
    if (!process.env.REACT_APP_ASGARDEO_CLIENT_ID) {

        return (
            <div className="content">
                <h2>You need to update the Client ID to proceed.</h2>
                <p>Please open &quot;src/config.json&quot; file using an editor, and update
                    the <code>clientID</code> value with the registered application&apos;s client ID.</p>
                <p>Visit repo <a
                    href="https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/master/samples/asgardeo-react-app">README</a> for
                    more details.</p>
            </div>
        );
    }

    if (hasLogoutFailureError) {
        return (
            <LogoutRequestDenied
                errorMessage={USER_DENIED_LOGOUT}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
        );
    }

    return (
        <DefaultLayout
            isLoading={state.isLoading}
            hasErrors={hasAuthenticationErrors}
        >
            {
                state.isAuthenticated
                    ? (


                        <div>
                            <ResponsiveAppBar 
                            setMenuBarHandlerSlotMachine={setMenuBarHandlerSlotMachine}
                            setMenuBarHandlerLottery={setMenuBarHandlerLottery}
                            setMenuBarHandlerResults={setMenuBarHandlerResults}
                            />
                            {
                                menuBarHandlerSlotMachine ?
                                    <div className="content">
                                        <SlotMachineComponent
                                            derivedResponse={derivedAuthenticationState}
                                        />
                                    </div>
                                    : null
                            }
                            {
                                menuBarHandlerLottery ?
                                    <div className="content">
                                        <LotteryComponent
                                            derivedResponse={derivedAuthenticationState}
                                        />
                                    </div>
                                    : null
                            }
                            {
                                menuBarHandlerResults ?
                                    <div className="content">
                                       <ResultsComponent
                                            derivedResponse={derivedAuthenticationState}
                                        />
                                    </div>
                                    : null
                            }
                            
                        </div>
                    )
                    : (

                        <div className="container0">
                            <div className="header-title">
                                <h1>
                                    <strong>Lotty</strong>
                                </h1>
                            </div>

                            <div className="content0">
                                <div className="home-image0">
                                    <img alt="react-logo" src={LOGIN_LOGO} className="react-logo-image logo0" />
                                </div>
                                <button
                                    className="btn primary"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Login
                                </button>
                                <h4 className={"spa-app-description"}>
                                    <a href="https://wso2.com/asgardeo/docs/guides/#developer-guide" rel="noreferrer noopener">
                                        Asgardeo Auth
                                    </a>
                                </h4>
                            </div>
                            <img src={FOOTER_LOGOS} className="footer-image" />
                        </div>
                    )
            }
        </DefaultLayout>
    );
};
