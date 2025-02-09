import { useState } from 'react';
import styles from './GiftInfo.module.css';
import KakaoPay from '../../assets/images/logos/kakaopay.png';
import { Toaster, toast } from "react-hot-toast";

type BankInfo = {
  name: string;
  accountNumber: string;
  kakaoPayAvailable: boolean;
};

type ParentsInfo = {
  name: string;
  bank: BankInfo;
};

type FamilyMemberInfo = {
  name: string;
  bank: BankInfo;
  father?: ParentsInfo;
  mother?: ParentsInfo;
};

type GiftInfoProps = {
  groomInfo: FamilyMemberInfo;
  brideInfo: FamilyMemberInfo;
};

export function GiftInfo({ groomInfo, brideInfo }: GiftInfoProps) {
  const [groomExpanded, setGroomExpanded] = useState(false);
  const [brideExpanded, setBrideExpanded] = useState(false);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="header">
        <h2 className="header-title">마음 전하실 곳</h2>
        <hr className="header-line" />
      </div>

      <div className={styles.container}>
        {/* 신랑 */}
        <div className={styles.section}>
          <div
            className={`${styles.header} ${groomExpanded ? styles.expanded : ''}`}
            onClick={() => setGroomExpanded(!groomExpanded)}
          >
            신랑측 계좌번호 확인하기 <span>{groomExpanded ? '▲' : '▼'}</span>
          </div>
          {groomExpanded && (
            <div className={styles.content}>
              <AccountInfo person={groomInfo} side={Side.Groom} />
            </div>
          )}
        </div>

        {/* 신부 */}
        <div className={styles.section}>
          <div
            className={`${styles.header} ${brideExpanded ? styles.expanded : ''}`}
            onClick={() => setBrideExpanded(!brideExpanded)}
          >
            신부측 계좌번호 확인하기 <span>{brideExpanded ? '▲' : '▼'}</span>
          </div>
          {brideExpanded && (
            <div className={styles.content}>
              <AccountInfo person={brideInfo} side={Side.Bride} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <p>다양한 방법으로 감사를 전해주세요.</p>
      </div>
    </div>
  );
}

enum Side {
  Groom = 1,
  Bride = 2,
}

type AccountInfoProps = {
  person: FamilyMemberInfo;
  side: Side;
};

const handleAccountCopy = (account: string) => {
  navigator.clipboard.writeText(account)
  .then(() => {
    toast.success("복사 완료: 계좌번호가 복사되었습니다.", {
      duration: 2000, // 2초 후 자동 사라짐
      position: "top-center",
    });
  })
  .catch(() => {
    toast.error("복사 실패. 다시 시도해주세요.");
  });
}

const handleSendKakaoPay = (kakaoPayLink: string) => {
  console.log('kakaoPayLink >>', kakaoPayLink );
  if (kakaoPayLink) {
    window.location.href = kakaoPayLink;
  }
};

export const AccountInfo = ({ person, side }: AccountInfoProps) => {
    return (
        <div>
            <div className={styles.personContainer}>
                <span>{side === Side.Groom ? "신랑" : "신부"} {person.name}</span>

                <div className={styles.accountContainer}>
                    <span>{person.bank.name} {person.bank.accountNumber}</span>

                    <button className={styles.copyButton}
                            onClick={() => handleAccountCopy(`${person.bank.name} ${person.bank.accountNumber}`)}
                    >
                        📄 계좌번호 복사
                    </button>

                    {person.bank.kakaoPayAvailable && (
                        <button className={styles.kakaoPay} 
                                onClick={() => handleSendKakaoPay(side === Side.Groom
                                                                  ? process.env.REACT_APP_GROOM_KAKAO_PAY_LINK as string
                                                                  : process.env.REACT_APP_BRIDE_KAKAO_PAY_LINK as string)}>
                            <img src={KakaoPay} alt="카카오페이" />
                        </button>
                    )}
                </div>
            </div>

            {person.father && (
                <div className={styles.parentContainer}>
                    <span>{side === Side.Groom ? "신랑" : "신부"} 아버지 {person.father.name}</span>

                    <div className={styles.accountContainer}>
                        <span>{person.father.bank.name} {person.father.bank.accountNumber}</span>
                        <button className={styles.copyButton}
                                onClick={() => handleAccountCopy(`${person.father?.bank.name} ${person.father?.bank.accountNumber}`)}
                        >
                            📄 계좌번호 복사
                        </button>

                        {person.father.bank.kakaoPayAvailable && (
                          <button className={styles.kakaoPay} 
                                  onClick={() => handleSendKakaoPay(side === Side.Groom
                                                                    ? process.env.REACT_APP_GROOM_FATHER_KAKAO_PAY_LINK as string
                                                                    : process.env.REACT_APP_BRIDE_FATHER_KAKAO_PAY_LINK as string)}>
                              <img src={KakaoPay} alt="카카오페이" />
                          </button>
                       )}                          
                    </div>
                </div>
            )}

            {person.mother && (
                <div className={styles.parentContainer}>
                    <span>{side === Side.Groom ? "신랑" : "신부"} 어머니 {person.mother.name}</span>

                    <div className={styles.accountContainer}>
                        <span>{person.mother.bank.name} {person.mother.bank.accountNumber}</span>
                        <button className={styles.copyButton}
                                onClick={() => handleAccountCopy(`${person.mother?.bank.name} ${person.mother?.bank.accountNumber}`)}
                        >
                            📄 계좌번호 복사
                        </button>

                        {person.mother.bank.kakaoPayAvailable && (
                          <button className={styles.kakaoPay} 
                                  onClick={() => handleSendKakaoPay(side === Side.Groom
                                                                    ? process.env.REACT_APP_GROOM_MOTHER_KAKAO_PAY_LINK as string
                                                                    : process.env.REACT_APP_BRIDE_MOTHER_KAKAO_PAY_LINK as string)}>
                              <img src={KakaoPay} alt="카카오페이" />
                          </button>
                       )}                        
                    </div>
                </div>
            )}
        </div>
    );
};

// export default AccountInfo;
