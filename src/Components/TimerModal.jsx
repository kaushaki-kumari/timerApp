import React, { useState, useEffect, useCallback } from 'react';
import './TimerModal.css';

const TimerModal = ({ show, onClose }) => {
    const [timerState, setTimerState] = useState({
        isRunning: false,
        time: 0,
        startTime: null,
        accumulatedTime: 0,
    });

    const handleStartPause = useCallback(() => {
        setTimerState((prevState) => {
            if (prevState.isRunning) {
                const currentTime = Date.now();
                return {
                    ...prevState,
                    isRunning: false,
                    accumulatedTime: prevState.accumulatedTime + (currentTime - prevState.startTime),
                    startTime: null,
                };
            } else {
                return {
                    ...prevState,
                    isRunning: true,
                    startTime: Date.now(),
                };
            }
        });
    }, []);

    const handleReset = useCallback(() => {
        setTimerState({
            isRunning: false,
            time: 0,
            startTime: null,
            accumulatedTime: 0,
        });
    }, []);

    useEffect(() => {
        let timer;
        if (timerState.isRunning) {
            timer = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = Math.floor(
                    (timerState.accumulatedTime + (currentTime - timerState.startTime)) / 1000
                );
                setTimerState((prevState) => ({
                    ...prevState,
                    time: elapsedTime,
                }));
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timerState.isRunning, timerState.startTime, timerState.accumulatedTime]);

    if (!show) return null;

    const minutes = Math.floor(timerState.time / 60);
    const seconds = timerState.time % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className={`modal fade show ${show ? 'd-block' : ''}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Timer Counter</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <h2>{formattedTime}</h2>
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
