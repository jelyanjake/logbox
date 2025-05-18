import { motion, AnimatePresence } from 'framer-motion';
import './StatusModal.css';
import successIcon from '../assets/like.gif';
import errorIcon from '../assets/warning.gif';

const NewModal = ({ status, message, userImage }) => {
  return (
    <AnimatePresence>
      {status && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <div className="modal-position-wrapper">
            <motion.div
              className={`status-modal ${status}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <div className="status-content">
                {/* Show GIF only for success/error states */}
                {status === 'error' && (
                  <motion.img 
                    src={errorIcon}
                    alt="Error"
                    className="status-gif"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  />
                )}

                {/* Show spinner only for loading state */}
                {status === 'loading' && (
                  <div className="spinner-container">
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                )}
                  
                  {status === 'success' && (
                    <motion.p
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    >
                      <img src={userImage} alt="User" className="user-image" />
                      {message}
                    </motion.p>
                  )}

                  {status === 'error' && (
                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    >
                        {message}
                    </motion.p>
                  )}

                  {status === 'loading' && (
                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    >
                        {message}
                    </motion.p>
                  )}

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewModal;