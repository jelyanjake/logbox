import './LogsModal.css';

export const LogsModal = ({ logs, onClose }) => {
  return (
    <div className="logs-modal-overlay" onClick={onClose}>
      <div className="logs-modal-content" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
};