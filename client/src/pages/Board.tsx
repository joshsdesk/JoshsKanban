import { useEffect, useState, useLayoutEffect } from 'react';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import auth from '../utils/auth';
import styles from '../styles/Board.module.css';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    // Updated state for filtering and sorting
    const [filterText, setFilterText] = useState('');
    const [sortBy, setSortBy] = useState<'name'>('name'); // Only sort by name since createdAt doesn't exist

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchTickets = async () => {
        try {
            const data = await retrieveTickets();
            setTickets(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    };

    const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
        try {
            const data = await deleteTicket(ticketId);
            fetchTickets();
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            fetchTickets();
        }
    }, [loginCheck]);

    // Apply filter and sort before rendering
    const getFilteredAndSortedTickets = (status: string) => {
        return tickets
            .filter(ticket =>
                ticket.status === status &&
                (ticket.name?.toLowerCase().includes(filterText.toLowerCase()) ?? false)
            )
            .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {!loginCheck ? (
                <div className={styles.loginNotice}>
                    <h1>Login to create & view tickets</h1>
                </div>
            ) : (
                <div className={styles.board}>
                    {/* Filter & Sort Controls */}
                    <div className={styles.controls}>
                        <input
                            type="text"
                            placeholder="Filter by name"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className={styles.filterInput}
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'name')}
                            className={styles.sortSelect}
                        >
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>

                    <div className={styles.boardDisplay}>
                        {boardStates.map((status) => (
                            <Swimlane
                                title={status}
                                key={status}
                                tickets={getFilteredAndSortedTickets(status)}
                                deleteTicket={deleteIndvTicket}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Board;
