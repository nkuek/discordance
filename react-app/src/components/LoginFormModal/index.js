import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForms from './LoginForms';
import './LoginForms.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForms />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;