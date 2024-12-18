import React, { useState } from 'react';
import TimerModal from './TimerModal';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (state) => setIsModalOpen(state);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Timer App</h1>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-danger" onClick={() => toggleModal(true)}>
                    Go to Timer
                </button>
            </div>
            <TimerModal show={isModalOpen} onClose={() => toggleModal(false)} />
        </div>
    );
};

export default HomePage;
