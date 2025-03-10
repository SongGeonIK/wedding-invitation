import './WeddingInvitation.css'; // 글로벌 css
import { Greeting } from '../sections/Greeting';
import { MainImage } from '../sections/MainImage';
import { WeddingDateTime } from '../sections/WeddingDateTime';
import { Directions } from '../sections/Directions';
import { Gallery } from '../sections/Gallery';
import { GiftInfo } from '../sections/GiftInfo';
import { InfoBoard } from '../sections/InfoBoard';
import { ClosingMessage } from '../sections/ClosingMessage';

export function WeddingInvitation() {
  // 신랑측 정보
  const groom = {
    lastName: process.env.REACT_APP_GROOM_LAST_NAME as string,
    firstName: process.env.REACT_APP_GROOM_FIRST_NAME as string,
    brithOrder: process.env.REACT_APP_GROOM_BRITH_ORDER as string,
    bank: {
      name: process.env.REACT_APP_GROOM_BANK_NAME as string,
      accountNumber: process.env.REACT_APP_GROOM_BANK_ACCOUNT_NUMBER as string,
      kakaoPayAvailable: parseBoolean(process.env.REACT_APP_GROOM_KAKAO_PAY_AVAILABLE),
    },
    father: {
      name: process.env.REACT_APP_GROOM_FATHER_NAME as string,
      bank: {
        name: process.env.REACT_APP_GROOM_FATHER_BANK_NAME as string,
        accountNumber: process.env.REACT_APP_GROOM_FATHER_BANK_ACCOUNT_NUMBER as string,
        kakaoPayAvailable: parseBoolean(process.env.REACT_APP_GROOM_FATHER_KAKAO_PAY_AVAILABLE),
      },
    },
    mother: {
      name: process.env.REACT_APP_GROOM_MOTHER_NAME as string,
      bank: {
        name: process.env.REACT_APP_GROOM_MOTHER_BANK_NAME as string,
        accountNumber: process.env.REACT_APP_GROOM_MOTHER_BANK_ACCOUNT_NUMBER as string,
        kakaoPayAvailable: parseBoolean(process.env.REACT_APP_GROOM_MOTHER_KAKAO_PAY_AVAILABLE),
      },
    }
  };
  // 신부측 정보
  const bride = {
    lastName: process.env.REACT_APP_BRIDE_LAST_NAME as string,
    firstName: process.env.REACT_APP_BRIDE_FIRST_NAME as string,
    brithOrder: process.env.REACT_APP_BRIDE_BRITH_ORDER as string,
    bank: {
      name: process.env.REACT_APP_BRIDE_BANK_NAME as string,
      accountNumber: process.env.REACT_APP_BRIDE_BANK_ACCOUNT_NUMBER as string,
      kakaoPayAvailable: parseBoolean(process.env.REACT_APP_BRIDE_KAKAO_PAY_AVAILABLE),
    },
    father: {
      name: process.env.REACT_APP_BRIDE_FATHER_NAME as string,
      bank: {
        name: process.env.REACT_APP_BRIDE_FATHER_BANK_NAME as string,
        accountNumber: process.env.REACT_APP_BRIDE_FATHER_BANK_ACCOUNT_NUMBER as string,
        kakaoPayAvailable: parseBoolean(process.env.REACT_APP_BRIDE_FATHER_KAKAO_PAY_AVAILABLE),
      },
    },
    mother: {
      name: process.env.REACT_APP_BRIDE_MOTHER_NAME as string,
      bank: {
        name: process.env.REACT_APP_BRIDE_MOTHER_BANK_NAME as string,
        accountNumber: process.env.REACT_APP_BRIDE_MOTHER_BANK_ACCOUNT_NUMBER as string,
        kakaoPayAvailable: parseBoolean(process.env.REACT_APP_BRIDE_MOTHER_KAKAO_PAY_AVAILABLE),
      },
    }
  };
  const dateTime = '2025년 01월 16일 14시 30분'; // yyyy년 MM월 dd일 HH시 mm분
  const address = '서울 강서구 마곡중앙5로 6 보타닉푸르지오시티 L층(로비층)';
  const weddingVenue = '웨딩 장소';
  const floor = 'n층';
  const weddingHall = 'OOO홀';
  const greetingMessage = `서로의 소중함을 느끼며 함께한 시간 속에서\n저희 두 사람은 평생을 함께하고자 결혼을 약속하게 되었습니다.\n
                           저희의 새로운 시작을 축복으로 함께해 주신다면\n큰 기쁨과 감사로 기억하겠습니다.\n
                           소중한 날에 따뜻한 마음으로 함께해 주세요.`;
  const subwayText = `2호선 한양대역 1번 출구 → 한양대병원 방향 도보 5분
                      5호선 왕십리역 6번 출구 → 한양대병원 방향 도보 5분`;
  const busText = `지선  2012 2013 2014 2220 2222 2411 2016
                   간선  263 302 371`;
  const parkingText = `건물 주차장 또는 병원 주차장 이용 시 90분 무료
                       * 이후 추가요금 발생`;
  const infoMessages = [ // 메세지 list 로 표현
    "신부대기실은 O층 세인트룸에 위치해있습니다.",
    "식사는 뷔페식이 아닌 함께한상 브랜드의 한정식 한 상 차림입니다.",
    "5세 이하의 어린이는 어린이 식권을 받아주시기 바랍니다. 6세 이상의 어린이는 성인과 동일한 식권을 사용합니다.",
    "병원에 주차하신 분들은 예약실에서 주차권을 수령하시기 바랍니다.",
    "신부가 슈퍼갑",
  ];
  const closingMessage = `사랑으로 키워주신 부모님과\n
                          소중한 인연으로 함께해 주신 모든 분들께 깊이 감사드립니다.\n
                          서로 아끼고 사랑하며 행복하게 살아가겠습니다.\n
                          앞으로도 따뜻한 관심과 응원 부탁드립니다.\n
                          사랑해 지수야~♥`;

  function parseBoolean(envVar: string | undefined): boolean {
    return envVar?.toLowerCase() === 'true';
  }

  // 날짜 및 시간 파싱 함수
  function parseDateTime(dateTime: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  } {
    const dateTimeRegex = /(\d{4})년\s(\d{2})월\s(\d{2})일\s(\d{2})시\s(\d{2})분/;
    const match = dateTime.match(dateTimeRegex);

    if (!match) {
      throw new Error(
        "Invalid dateTime format. Expected format is 'yyyy년 MM월 dd일 HH시 mm분'."
      );
    }

    const [, year, month, day, hour, minute] = match;

    return {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      hour: parseInt(hour, 10),
      minute: parseInt(minute, 10),
    };
  }

  // 파싱 결과 사용
  const parsedDateTime = parseDateTime(dateTime);

  return (
    <div className="wedding-invitation-container">
      {/* 메인이미지 */}
      <MainImage
        altText="이미지를 표시할 수 없습니다."
        mainText=""
        coupleNames={`${groom.lastName}${groom.firstName} | ${bride.lastName}${bride.firstName}`}
        detailsText={`${dateTime}\n${weddingVenue} ${floor} ${weddingHall}`}
      />
      {/* 인사말 */}
      <Greeting
        groomFirstName={groom.firstName}
        brideFirstName={bride.firstName}
        groomBrithOrder={groom.brithOrder}
        brideBrithOrder={bride.brithOrder}
        parents={{
          groomParents: groom.father.name && groom.mother.name 
          ? `${groom.father.name} · ${groom.mother.name}`
          : groom.father.name 
            ? `${groom.father.name}`
            : groom.mother.name 
              ? `${groom.mother.name}`
              : '',        
          brideParents: bride.father.name && bride.mother.name 
          ? `${bride.father.name} · ${bride.mother.name}`
          : bride.father.name 
            ? `${bride.father.name}`
            : bride.mother.name 
              ? `${bride.mother.name}`
              : '',
        }}
        message={greetingMessage}
      />
      {/* 예식일시 */}
      <WeddingDateTime
        year={parsedDateTime.year}
        month={parsedDateTime.month}
        day={parsedDateTime.day}
        hour={parsedDateTime.hour}
        minute={parsedDateTime.minute}
      />
      {/* 오시는 길 */}
      <Directions
        weddingVenue={weddingVenue}
        floor={floor}
        weddingHall={weddingHall}
        address={address}
        kakaoMapjavaScriptKey={process.env.REACT_APP_KAKAO_API_KEY as string}
        subwayText={subwayText}
        busText={busText}
        parkingText={parkingText}
      />
      {/* 갤러리 */}
      <Gallery />
      {/* 마음 전하실 곳 */}
      <GiftInfo
        groomInfo={{
          name: `${groom.lastName}${groom.firstName}`,
          bank: groom.bank, 
          father: groom.father.name ? {
            name: groom.father.name,
            bank: groom.father.bank, 
          } : undefined,
          mother: groom.mother.name ? {
            name: groom.mother.name,
            bank: groom.mother.bank,
          } : undefined,
        }}
        brideInfo={{
          name: `${bride.lastName}${bride.firstName}`,
          bank: bride.bank,
          father: bride.father.name ? {
            name: bride.father.name,
            bank: bride.father.bank,
          } : undefined,
          mother: bride.mother.name ? {
            name: bride.mother.name,
            bank: bride.mother.bank,
          } : undefined,
        }}
      />
      {/* 안내사항 */}
      <InfoBoard infoMessages={infoMessages} />
      {/* 마무리 문구 */}
      <ClosingMessage 
        groom={`${groom.lastName}${groom.firstName}`}
        bride={`${bride.lastName}${bride.firstName}`}
        closingMessage={closingMessage} />
    </div>
  );
}
