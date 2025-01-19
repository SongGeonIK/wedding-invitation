import WeddingBell from '../../assets/images/wedding-bell.svg';
import RoseFlower from '../../assets/images/rose-flower.svg';

import './Greeting.css';

type GrettingProps = {
  bride: string;
  groom: string;
  groomTitle: string; // 신랑의 직함 (예: 차남)
  brideTitle: string; // 신부의 직함 (예: 장녀)
  parents: {
    groomParents: string; // 신랑 부모님
    brideParents: string; // 신부 부모님
  };
  message: string; // 초대 메시지
};

export function Gretting({
  groom,
  bride,
  groomTitle,
  brideTitle,
  parents,
  message,
}: GrettingProps) {
  return (
    <div className="gretting-container">
      {/* 인사말 고정 부분 */}
      <div className="header">
        <h2 className="header-title">인사말</h2>
        <hr className="header-line" />
      </div>

      {/* 이미지 추가 */}
      <div className="image-container">
        <img src={RoseFlower} alt="웨딩 이미지" className="wedding-image" />
      </div>

      {/* 초대 메시지 */}
      <div className="body">
        <p className="message">{message}</p>

        {/* 부모님 정보 */}
        <div className="parents">
          <p>{parents.groomParents}의 {groomTitle} <strong>{groom}</strong></p>
          <p>{parents.brideParents}의 {brideTitle} <strong>{bride}</strong></p>
        </div>
      </div>
    </div>
  );
}
