import RoseFlower from '../../assets/images/rose-flower.svg';
import styles from './Greeting.module.css';

type GreetingProps = {
  groomFirstName: string;
  brideFirstName: string;
  groomBrithOrder: string; // 신랑의 직함 (예: 차남)
  brideBrithOrder: string; // 신부의 직함 (예: 장녀)
  parents: {
    groomParents: string; // 신랑 부모님
    brideParents: string; // 신부 부모님
  };
  message: string; // 초대 메시지
};

export function Greeting({
  groomFirstName,
  brideFirstName,
  groomBrithOrder,
  brideBrithOrder,
  parents,
  message,
}: GreetingProps) {
  return (
    <div>
      {/* 인사말 고정 부분 */}
      <div className="header">
        <h2 className="header-title">ㅋㅋㅋ인사말</h2>
        <hr className="header-line" />
      </div>

      {/* 이미지 추가 */}
      <div className={styles.imageContainer}>
        <img src={RoseFlower} alt="웨딩 이미지" className={styles.weddingImage} />
      </div>

      {/* 초대 메시지 */}
      <div className={styles.body}>
        <p className={styles.message}>{message}</p>

        {/* 부모님 정보 */}
        <div className={styles.parents}>
          <p>{parents.groomParents}의 {groomBrithOrder} <strong>{groomFirstName}</strong></p>
          <p>{parents.brideParents}의 {brideBrithOrder} <strong>{brideFirstName}</strong></p>
        </div>
      </div>
    </div>
  );
}
