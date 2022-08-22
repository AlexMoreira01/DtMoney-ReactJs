import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import closeImg from '../../assets/close.svg';
import { Container, TransactionTypeContainer } from './styles';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}:NewTransactionModalProps){
    return(
        <Modal 
            // Nome das funções foram retirados e repassados os nome da interface 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay" // Removeu estilo
            className="react-modal-content"
        > 
            <button 
                type='button' 
                onClick={onRequestClose} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container>
                <h2>Cadastrar Transação</h2>

                <input type="text"
                placeholder='Titulo'
                />

            <input type="number"
                placeholder='Valor'
            />

            <TransactionTypeContainer>
                <button
                    type="button"
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </button>

                <button
                    type="button"
                >
                    <img src={outcomeImg} alt="Saida" />
                    <span>Saida</span>
                </button>

            </TransactionTypeContainer>

            <input type="text"
                placeholder='Categoria'
            />

            <button type="submit">
                Cadastrar
            </button>

            </Container>

            
                
        </Modal>
    );
}