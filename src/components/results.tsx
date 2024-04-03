import { BasicUserInfo } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";

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
export const ResultsComponent: FunctionComponent<AuthenticationResponsePropsInterface> = (
    props: AuthenticationResponsePropsInterface
): ReactElement => {

    const {
        derivedResponse
    } = props;

    return (
        <>
            <h2>Authentication Response 2</h2>
            <h4 className="sub-title">
                Derived by the&nbsp;
                <code className="inline-code-block">
                    <a href="https://www.npmjs.com/package/@asgardeo/auth-react/v/latest"
                       target="_blank"
                       rel="noreferrer"
                    >
                        @asgardeo/auth-react
                    </a>
                </code>&nbsp;SDK
            </h4>
        </>
    );
};
