import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import styles from '../styles/EditTicket.module.css';

const EditTicket = () => {
    const [ticket, setTicket] = useState<TicketData | undefined>();

    const navigate = useNavigate();
    const { state } = useLocation();

    const fetchTicket = async (ticketId: TicketData) => {
        try {
            const data = await retrieveTicket(ticketId.id);
            setTicket(data);
        } catch (err) {
            console.error('Failed to retrieve ticket:', err);
        }
    };

    useEffect(() => {
        fetchTicket(state);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (ticket && ticket.id !== null) {
            updateTicket(ticket.id, ticket);
            navigate('/');
        } else {
            console.error('Ticket data is undefined.');
        }
    };

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };

    return (
        <div className={styles.container}>
            {ticket ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={`${styles.formTitle} ${styles.fullWidth}`}>Edit Ticket</h1>

                    {/* Column 1 - Ticket Name */}
                    <div>
                        <label htmlFor='tName' className={styles.label}>Ticket Name</label>
                        <textarea
                            id='tName'
                            name='name'
                            value={ticket.name || ''}
                            onChange={handleTextAreaChange}
                            className={styles.input}
                        />
                    </div>

                    {/* Column 2 - Ticket Status */}
                    <div>
                        <label htmlFor='tStatus' className={styles.label}>Ticket Status</label>
                        <select
                            name='status'
                            value={ticket.status || ''}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value='Todo'>Todo</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Done'>Done</option>
                        </select>
                    </div>

                    {/* Full Width - Description */}
                    <div className={styles.fullWidth}>
                        <label htmlFor='tDescription' className={styles.label}>Ticket Description</label>
                        <textarea
                            id='tDescription'
                            name='description'
                            value={ticket.description || ''}
                            onChange={handleTextAreaChange}
                            className={styles.input}
                        />
                    </div>

                    {/* Full Width - Submit Button */}
                    <button type='submit' className={`${styles.submitButton} ${styles.fullWidth}`}>
                        Submit Form
                    </button>
                </form>
            ) : (
                <div className={styles.error}>Issues fetching ticket</div>
            )}
        </div>
    );
};

export default EditTicket;
