import React, { useState } from 'react';
import TimerModal from './TimerModal';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [modalState, setModalState] = useState({
        isModalOpen: false
    });

    const openModal = () => setModalState({ ...modalState, isModalOpen: true });
    const closeModal = () => setModalState({ ...modalState, isModalOpen: false });

    return (
        <div className="container mt-5">
            <h1 className="text-center">Timer App</h1>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/" className="btn btn-danger" onClick={openModal}>
                    Go to Timer
                </Link>
            </div>

            <TimerModal show={modalState.isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default HomePage;
