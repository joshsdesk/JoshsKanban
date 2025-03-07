import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';
import styles from '../styles/CreateTicket.module.css';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData | undefined>(
    {
      id: 0,
      name: '',
      description: '',
      status: 'Todo',
      assignedUserId: 1,
      assignedUser: null
    }
  );

  const navigate = useNavigate();

  const [users, setUsers] = useState<UserData[] | undefined>([]);

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTicket){
      const data = await createTicket(newTicket);
      console.log(data);
      navigate('/');
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }

  const handleUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.formTitle}>Create Ticket</h1>
          <label htmlFor='tName' className={styles.label}>Ticket Name</label>
          <textarea 
            id='tName'
            name='name'
            value={newTicket?.name || ''}
            onChange={handleTextAreaChange}
            className={styles.input}
          />
          <label htmlFor='tStatus' className={styles.label}>Ticket Status</label>
          <select 
            name='status' 
            id='tStatus'
            value={newTicket?.status || ''}
            onChange={handleTextChange}
            className={styles.input}
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
          <label htmlFor='tDescription' className={styles.label}>Ticket Description</label>
          <textarea 
            id='tDescription'
            name='description'
            value={newTicket?.description || ''}
            onChange={handleTextAreaChange}
            className={styles.input}
          />
          <label htmlFor='tUserId' className={styles.label}>User's ID</label>
          <select
            name='assignedUserId'
            value={newTicket?.assignedUserId ?? ''}
            onChange={handleUserChange}
            className={styles.input}
          >
            {users ? users.map((user) => {
              return (
                <option key={user.id} value={String(user.id)}>
                  {user.username}
                </option>
              )
            }) : (
            <textarea 
              id='tUserId'
              name='assignedUserId'
              value={newTicket?.assignedUserId || 0}
              onChange={handleTextAreaChange}
              className={styles.input}
            />
            )}
          </select>
          <button type='submit' className={styles.submitButton}>Submit Form</button>
        </form>
      </div>
    </>
  )
};

export default CreateTicket;