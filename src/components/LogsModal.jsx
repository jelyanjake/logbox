import './LogsModal.css';
import { motion, AnimatePresence } from 'framer-motion';

export const LogsModal = ({ logs, onClose }) => {
  return (
    <AnimatePresence>
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ type: "spring", damping: 25, stiffness: 500 }}
    className="logs-modal-overlay" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 500 }}
      className="logs-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Time Logs</h3>
        {logs.length === 0 ? (
          <p>No logs available</p>
        ) : (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => {
                const timeIn = new Date(log.timein);
                const timeOut = new Date(log.timeout);
                const duration = (timeOut - timeIn) / (1000 * 60); // in minutes
                
                return (
                  <tr key={index}>
                    <td>{log.date}</td>
                    <td>{timeIn.toLocaleTimeString()}</td>
                    <td>{timeOut.toLocaleTimeString()}</td>
                    <td>{duration.toFixed(1)} minutes</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
};