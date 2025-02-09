import styles from './InfoBoard.module.css';

type InfoBoardProps = {
    infoMessages: string[];
};

export function InfoBoard({ infoMessages }: InfoBoardProps) { // 구조 분해 할당 적용
  return (
    <div>
      {/* 안내사항 고정 부분 */}
      <div className="header">
        <h2 className="header-title">안내사항</h2>
        <hr className="header-line" />
      </div>

      {/* 안내사항 메세지 */}
      <ul className={styles.infoBoardList}>
        {infoMessages.map((infoMessage, index) => (
          <li key={index} className={styles.infoBoardItem}>
            <span className={styles.infoBoardItemNumber}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.infoBoardItemText}>{infoMessage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
