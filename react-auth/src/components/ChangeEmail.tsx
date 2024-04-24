import React, { useState } from 'react';
import axios from 'axios';

const ChangeEmail: React.FC = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        '/api/user/change-email',
        { newEmail, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error changing email:', error);
      setMessage('Error changing email. Please try again.');
    }
  };

  return (
    <div>
      <h2>Change Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Change Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeEmail;