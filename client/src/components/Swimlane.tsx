import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import styles from '../styles/Swimlane.module.css';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const getLaneClass = () => {
    switch (title) {
      case 'Todo':
        return styles.todo;
      case 'In Progress':
        return styles.inProgress;
      case 'Done':
        return styles.done;
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.swimlane} ${getLaneClass()}`}>
      <h2 className={styles.title}>{title}</h2>
      {tickets.map(ticket => (
        <TicketCard 
          key={ticket.id}
          ticket={ticket}
          deleteTicket={deleteTicket}
        />
      ))}
    </div>
  );
};

export default Swimlane;
