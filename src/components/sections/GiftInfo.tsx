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
            신부측 계좌번호 확인하기 <span>{brideExpanded ? '▲' : '▼'}</span>
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
    <div className={styles.personContainer}>
      <span>{person.name}</span>

      <div className={styles.accountContainer}>
          <span>{person.bank.name} {person.bank.accountNumber}</span>
          <button className={styles.copyButton}>📄 계좌번호 복사</button>
          {person.bank.kakaoPayAvailable && (
            <button className={styles.kakaoPay}>
              <img src={KakaoPay} alt="카카오페이" />
            </button>
          )}
      </div>
    </div>

    {person.father && (
      <div className={styles.parentContainer}>
        <span>아버지 {person.father.name}</span>

        <div className={styles.accountContainer}>
          <span>{person.father.bank.name} {person.father.bank.accountNumber}</span>
          <button className={styles.copyButton}>📄 계좌번호 복사</button>
          {person.father.bank.kakaoPayAvailable && (
            <button className={styles.kakaoPay}>
              <img src={KakaoPay} alt="카카오페이" />
            </button>
          )}
        </div>
      </div>
    )}

    {person.mother && (
      <div className={styles.parentContainer}>
        <span>어머니 {person.mother.name}</span>

        <div className={styles.accountContainer}>
          <span>{person.mother.bank.name} {person.mother.bank.accountNumber}</span>
          <button className={styles.copyButton}>📄 계좌번호 복사</button>
          {person.mother.bank.kakaoPayAvailable && (
            <button className={styles.kakaoPay}>
              <img src={KakaoPay} alt="카카오페이" />
            </button>
          )}
        </div>
      </div>
    )}
  </div>
);
