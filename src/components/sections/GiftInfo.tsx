import React, { useState } from 'react';
import styles from './GiftInfo.module.css';

type bankInfo = {
  name: string,
  accountNumber: string,
  kakaoPayAvailable: boolean,
}

type ParentsInfo = {
  name: string,
  bank: bankInfo,
}

type FamilyMemberInfo = {
  name: string,
  bank: bankInfo,
  father: ParentsInfo,
  mother: ParentsInfo,
}

type GiftInfoProps = {
  groomInfo: FamilyMemberInfo;
  brideInfo: FamilyMemberInfo;
}

export function GiftInfo({
  groomInfo,
  brideInfo
}: GiftInfoProps) {
  const [groomExpanded, setGroomExpanded] = useState(false);
  const [brideExpanded, setBrideExpanded] = useState(false);

  return (
    <div>
      <div className="header">
        <h2 className="header-title">마음 전하실 곳</h2>
        <hr className="header-line" />
      </div>

      <div className={styles.giftInfo}>
        {/* 신랑 측 계좌 정보 */}
        <div>
            <h3 className={styles.sectionTitle}>
            {`신랑측 계좌번호 확인하기`}
            <button
                className={styles.toggleButton}
                onClick={() => setGroomExpanded(!groomExpanded)}
            >
              {groomExpanded ? '▲' : '▼'}
            </button>
            </h3>
            <div
            className={`${styles.collapsibleContent} ${
                groomExpanded ? styles.expanded : styles.collapsed
            }`}
            >
            <div>
              신랑 계좌
            </div>
            <div>
              부모님 계좌
            </div>

            </div>
        </div>

        {/* 신부 측 계좌 정보 */}
        <div>
            <h3 className={styles.sectionTitle}>
            {`신부측 계좌번호 확인하기`}
            <button
                className={styles.toggleButton}
                onClick={() => setBrideExpanded(!brideExpanded)}
            >
              {brideExpanded ? '▲' : '▼'}
            </button>
            </h3>
            <div
            className={`${styles.collapsibleContent} ${
                brideExpanded ? styles.expanded : styles.collapsed
            }`}
            >
            <div>ㅋㅋㅋ</div>
            <div>ㅋㅋㅋ2</div>
            {/* {parents.brideParents.map((account, index) => (
                <div key={index} className={styles.accountInfo}>
                <div className={styles.accountDetails}>
                    <span className={styles.accountName}>{account.name}</span>
                    <span className={styles.accountBank}>{account.bank}</span>
                    <span className={styles.accountNumber}>{account.accountNumber}</span>
                </div>
                <div className={styles.accountActions}>
                    <button className={styles.copyButton}>계좌번호 복사</button>
                    {account.kakaoPayAvailable && (
                    <button className={styles.kakaoPayButton}>💳 pay 송금</button>
                    )}
                </div>
                </div>
            ))} */}
            </div>
        </div>

        <p className={styles.footerText}>지수에게 큰 마음을 전해주세요.</p>
      </div>
    </div>
  );
}
