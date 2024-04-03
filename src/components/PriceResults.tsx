import { BasicUserInfo } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import styleClasses from '../containers/SlotMachine/SlotMachine.module.scss';

const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        seoul: 21,
        month: 'Jan',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        seoul: 28,
        month: 'Fev',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        seoul: 41,
        month: 'Mar',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        seoul: 73,
        month: 'Apr',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        seoul: 99,
        month: 'May',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        seoul: 144,
        month: 'June',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        seoul: 319,
        month: 'July',
    },
    {
        london: 65,
        paris: 60,
        newYork: 106,
        seoul: 249,
        month: 'Aug',
    },
    {
        london: 51,
        paris: 51,
        newYork: 95,
        seoul: 131,
        month: 'Sept',
    },
    {
        london: 60,
        paris: 65,
        newYork: 97,
        seoul: 55,
        month: 'Oct',
    },
    {
        london: 67,
        paris: 64,
        newYork: 76,
        seoul: 48,
        month: 'Nov',
    },
    {
        london: 61,
        paris: 70,
        newYork: 103,
        seoul: 25,
        month: 'Dec',
    },
];

const valueFormatter = (value: number | null) => `${value}mm`;

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    series: [{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

interface AuthenticationResponsePropsInterface {
    /**
     * Derived Authenticated Response.
     */
    derivedResponse?: any;
}

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

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

    const [tickPlacement, setTickPlacement] = React.useState<
        'start' | 'end' | 'middle' | 'extremities'
    >('middle');
    const [tickLabelPlacement, setTickLabelPlacement] = React.useState<
        'middle' | 'tick'
    >('middle');

    return (
        <>
            <h2 style={{ marginTop: 20 }}></h2>
            <h4 className="sub-title">
                <div className={styleClasses['slot-machine']}>
                    <header className={styleClasses['slot-machine__header']}>
                        <h1 className={styleClasses['slot-machine__title']}><strong>Results</strong></h1>
                        <br />
                    </header>
                </div>
                <div style={{ marginTop: -800 }}>
                    <h3>Last Lottery Result</h3>
                    <div className="container0">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Winning Number
                                </Typography>
                                <Typography variant="h5" component="div">
                                    34 56 78 90
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Your Number
                                </Typography>
                                <Typography variant="h5" component="div">
                                    34 56 78 90
                                </Typography>

                                <Chip label="Congratulations, you're the winner! 🎉" color="success" variant="outlined"  />
                                <Chip label="Better luck next time" color="warning" variant="outlined"  />
                                <Chip label="No Results" color="info" variant="outlined"  />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    <h3>Slot Machine Earnings</h3>
                    <div className="container0">
                        <BarChart
                            dataset={dataset}
                            xAxis={[
                                { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement },
                            ]}
                            {...chartSetting}
                        />
                    </div>
                </div>
            </h4>
        </>
    );
};
