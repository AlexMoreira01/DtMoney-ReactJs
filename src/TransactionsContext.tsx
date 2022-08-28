import { createContext, useEffect, useState, ReactNode} from 'react'
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// Herda todos os camos do Transaction exceto o id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// Pega somente os dados que nos selecionamos
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }


interface TransactionsProviderProps {
    children: ReactNode; // aceita qualquer tipo de elemento do react
}

interface TransactionsContextData {
    transactions: Transaction[],
    // Função que recebe transaction do tipo transactionsInput e retorna promise vazia
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const  TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);
// Forçando com que o que ele ache que possua esse formato, não outro jeito de se fazer quando é um objeto ele sempre dara erro sem isso
// Aqui nao se tem problema pois o valor inicial nunca é usado e logo ele é substituido

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })

        // Axios retorna os objetos inseridos, aqui se pega eles e os acicionam ao estado abaixo
        const { transaction } = response.data;

        setTransactions([
            // Se copia todas as informações para se acicionar a nova -- imutabilbiade
            ...transactions,
            transaction
        ])
    }

    return(
        // Retornando um objeto => 1° {} para javascript | 2° para o objeto 
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}