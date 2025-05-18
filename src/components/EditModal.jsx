import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EditModal.css';

export const EditModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    idnum: user.idnum,
    phone: user.phone
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    await onSave(user.id, formData);
  };

  return (
    <AnimatePresence>
      <>
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        <div className="modal-position-wrapper">
          <motion.div
            className="wasdwasd"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ID Number:</label>
                <input
                  type="text"
                  name="idnum"
                  value={formData.idnum}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
};