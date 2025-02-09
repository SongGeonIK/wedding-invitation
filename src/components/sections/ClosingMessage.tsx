import styles from './ClosingMessage.module.css';

type ClosingMessageProps = {
  closingMessage: string;
};

export function ClosingMessage({ closingMessage }: ClosingMessageProps) {
  return (
    <div className={styles.closingMessageContainer}>
        <p>{closingMessage}</p>
    </div>
  );
}

export default ClosingMessage;
