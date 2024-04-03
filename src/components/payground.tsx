import { BasicUserInfo } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";

import SlotMachine from '../containers/SlotMachine';
import '../lib/styles/main.scss';

interface AuthenticationResponsePropsInterface {
    /**
     * Derived Authenticated Response.
     */
    derivedResponse?: any;
}

/**
 * Displays the derived Authentication Response from the SDK.
 *
 * @param {AuthenticationResponsePropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const PlaygroundComponent: FunctionComponent<AuthenticationResponsePropsInterface> = (
    props: AuthenticationResponsePropsInterface
): ReactElement => {

    const {
        derivedResponse
    } = props;

    return (
        <>
            <h2 style={{ marginTop: 60 }}></h2>
            <h4 className="sub-title">
                <SlotMachine />
            </h4>
        </>
    );
};
