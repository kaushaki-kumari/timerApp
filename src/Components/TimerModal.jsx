import React, { useState, useEffect } from 'react';

const TimerModal = ({ show, onClose }) => {
    const [timerState, setTimerState] = useState({
        isRunning: false,
        time: 0
    });

    useEffect(() => {
        let timer;
        if (timerState.isRunning) {
            timer = setInterval(() => {
                setTimerState(prevState => ({ ...prevState, time: prevState.time + 1 }));
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timerState.isRunning]);

    const handleStartPause = (e) => {
        e.stopPropagation();
        setTimerState(prevState => ({ ...prevState, isRunning: !prevState.isRunning }));
    };

    const handleReset = (e) => {
        e.stopPropagation();
        setTimerState({ isRunning: false, time: 0 });
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Timer Counter</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        <h2>{timerState.time} seconds</h2>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleStartPause}>
                            {timerState.isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerModal;
