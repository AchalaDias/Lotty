import React, { useState, useEffect } from 'react';

import useSlotMachine from '../../hooks/useSlotMachine';
import Wheel from '../../components/Wheel';
import Message from '../../components/Message';
import Button from '../../components/Button';
import styleClasses from './SlotMachine.module.scss';
import DOLLOR_LOGO from "../../images/dollor.png";
import Tooltip from '@mui/material/Tooltip';
import Confetti from 'react-confetti';


const SlotMachine: React.FC = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const { wheels, startSpinningHandler, stopSpinningHandler } = useSlotMachine();

    const [credits, setCredits] = useState<number>(100);
    const [openTooltip, setOpenTooltip] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setOpenTooltip(false), 10000);
    });

    return (
        <div className={styleClasses['slot-machine']}>
            {(wheels.score === 'full' ||  wheels.score === 'consecutive' || wheels.score === 'inconsecutive' ) && (
                <Confetti
                width={width}
                height={height}
                 />
            )}

            <header className={styleClasses['slot-machine__header']}>
                <h2 style={{ float: 'right', marginRight: 100, marginLeft: -200 }} color="primary" className="float-right" >
                    <Tooltip title="This is your available Credit balance for playing the Slot Machine. Remember! You will lose $10 for each mismatch." open={openTooltip} arrow>
                        <img src={DOLLOR_LOGO} className="footer-image" />
                        <div className="box">
                            <strong>{credits}</strong>
                        </div>
                    </Tooltip>
                </h2>
                <h1 className={styleClasses['slot-machine__title']}><strong>Slot Machine</strong></h1>
            </header>

            <div className={styleClasses['slot-machine__wheels-wrapper']}>
                {wheels.indexes &&
                    wheels.indexes.length &&
                    wheels.indexes.map((randomIndex, currIndex) => <Wheel key={currIndex} randomIndex={randomIndex} />)}
            </div>

            <div className={styleClasses['slot-machine__btns-wrapper']}>
                <Button title='Start Spinning' disabled={wheels.status === 'spinning'} onClick={startSpinningHandler} />
                <Button
                    title='Stop It'
                    disabled={wheels.status !== 'spinning'}
                    severity='none'
                    onClick={stopSpinningHandler}
                />
            </div>

            {wheels.status === 'spun' && (
                <div className={styleClasses['slot-machine__message-wrapper']}>
                    <Message score={wheels.score} />
                </div>
            )}
        </div>
    );
};

export default SlotMachine;
