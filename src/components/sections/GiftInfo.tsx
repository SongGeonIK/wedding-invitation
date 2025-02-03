import React, { useState } from 'react';
import styles from './GiftInfo.module.css';
import KakaoPay from '../../assets/images/logos/kakaopay.png';

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
  father: ParentsInfo;
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
            신랑측 확인하기 <span>{groomExpanded ? '▲' : '▼'}</span>
          </div>
          {groomExpanded && (
            <div className={styles.content}>
              <AccountInfo person={groomInfo} />
            </div>
          )}
        </div>

        {/* 신부 */}
        <div className={styles.section}>
          <div
            className={`${styles.header} ${brideExpanded ? styles.expanded : ''}`}
            onClick={() => setBrideExpanded(!brideExpanded)}
          >
            신부측 확인하기 <span>{brideExpanded ? '▲' : '▼'}</span>
          </div>
          {brideExpanded && (
            <div className={styles.content}>
              <AccountInfo person={brideInfo} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <p>다양한 방법으로 감사를 전해주세요</p>
      </div>
    </div>
  );
}

type AccountInfoProps = {
  person: FamilyMemberInfo;
};

const AccountInfo = ({ person }: AccountInfoProps) => (
  <div>
    <div className={styles.person}>
      <span>{person.name}</span>
      <span>{person.bank.name} {person.bank.accountNumber}</span>
      {person.bank.kakaoPayAvailable && (
        <button className={styles.kakaoPay}>
          <img src={KakaoPay} alt="카카오페이" />
        </button>
      )}
      <button className={styles.copyButton}>📄 계좌번호 복사</button>
    </div>

    <div className={styles.parent}>
      <span>아버지 {person.father.name}</span>
      <span>{person.father.bank.name} {person.father.bank.accountNumber}</span>
      {person.father.bank.kakaoPayAvailable && (
        <button className={styles.kakaoPay}>
          <img src={KakaoPay} alt="카카오페이" />
        </button>
      )}
      <button className={styles.copyButton}>📄 계좌번호 복사</button>
    </div>

    {person.mother && (
      <div className={styles.parent}>
        <span>어머니 {person.mother.name}</span>
        <span>{person.mother.bank.name} {person.mother.bank.accountNumber}</span>
        {person.mother.bank.kakaoPayAvailable && (
          <button className={styles.kakaoPay}>
            <img src={KakaoPay} alt="카카오페이" />
          </button>
        )}
        <button className={styles.copyButton}>📄 계좌번호 복사</button>
      </div>
    )}
  </div>
);
