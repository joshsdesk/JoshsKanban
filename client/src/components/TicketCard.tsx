import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';
import styles from '../styles/TicketCard.module.css';

interface TicketCardProps {
    ticket: TicketData;
    deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
    const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
        const ticketId = Number(event.currentTarget.value);
        if (!isNaN(ticketId)) {
            try {
                const data = await deleteTicket(ticketId);
                return data;
            } catch (error) {
                console.error('Failed to delete ticket:', error);
            }
        }
    };

    return (
        <div className={styles.ticketCard}>
            <h3 className={styles.ticketTitle}>{ticket.name}</h3>
            <p className={styles.ticketDescription}>{ticket.description}</p>
            <p className={styles.ticketAssignee}>{ticket.assignedUser?.username}</p>
            <div className={styles.actions}>
                <Link to='/edit' state={{ id: ticket.id }} className={styles.editButton}>Edit</Link>
                <button
                    type='button'
                    value={String(ticket.id)}
                    onClick={handleDelete}
                    className={styles.deleteButton}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TicketCard;
