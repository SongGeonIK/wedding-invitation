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
  const dateTime = '2025년 09월 20일 19시'; // yyyy년 MM월 dd일 HH시 mm분
  const address = "서울 서대문구 연세로 50 연세대학교 동문회관 예식장";
  const weddingVenue = '연세대학교 동문회관 예식장';
  const floor = '3층';
  const weddingHall = '그랜드볼룸';
  const greetingMessage = `서로의 소중함을 느끼며 함께한 시간 속에서\n저희 두 사람은 평생을 함께하고자 결혼을 약속하게 되었습니다.\n
                           저희의 새로운 시작을 축복으로 함께해 주신다면\n큰 기쁨과 감사로 기억하겠습니다.\n
                           소중한 날에 따뜻한 마음으로 함께해 주세요.`;
  const subwayText = `2호선 신촌역 3번 출구 → 연세로 따라 직진 (도보 약 15분)
                      경의중앙 신촌역 2번 출구 → 501m (도보 약 10분)`;
  const busText = `셔틀버스 :
                   2호선 이대역(3번출구 앞) → 동문회관 (18시20분, 18시40분 총 2회 운행)
                   동문회간 B1 현관 앞 → 2호선 이대역 (20시10분, 20시30분 총 2회 운행)

                   간선버스(파랑) :
                   272, 470, 601, 606, 672, 673, 700, 707, 708, 710, 742, 750(AB)번
                   (이대후문 또는 이대부중 하차)

                   지선버스(초록) :
                   6714, 7017, 7024, 7737번
                   (이대후문 또는 이대부중 하차)

                   광역 · 직행버스 :
                   G7111, M7106, M7111, M7119, M7154번
                   (이대후문 하차)`;
  const parkingText = `동문회관 주차장 이용 500여대 동시 2시간 무료
                       ("연세 동문회관"으로 출차 시 적용 가능)`;
  const infoMessages = [
    "👰 신부대기실은 3층에 위치해있습니다.",
    "🍽️ 식사는 뷔페식이며 2층, 3층 모두 이용가능합니다.",
    "👶 뷔페는 만 5세 이하의 어린이는 무료이며 만 6세 이상부터 식수 인원에 포함됩니다.",
    "🏧 ATM 기계는 1층 우리은행을 이용해주세요.",
    "☕ 커피 머신은 2층에 위치해 있습니다.",
  ];  
  const closingMessage = `사랑으로 길러주신 부모님께,\n  
                          소중한 인연으로 함께해 주신 모든 분들께 진심으로 감사드립니다.\n
                          저희 두 사람, 서로 아끼고 사랑하며 행복한 가정을 만들어가겠습니다.\n  
                          앞으로도 따뜻한 관심과 응원 부탁드립니다.`;
  
  function parseBoolean(envVar: string | undefined): boolean {
    return envVar?.toLowerCase() === 'true';
  }

  // 날짜 및 시간 파싱 함수
  function parseDateTime(dateTime: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute?: number;
  } {
    const dateTimeRegex = /(\d{4})년\s*(\d{2})월\s*(\d{2})일\s*(\d{2})시(?:\s*(\d{2})분)?/;
    const match = dateTime.match(dateTimeRegex);

    if (!match) {
      throw new Error(
        "Invalid dateTime format. Expected format is 'yyyy년 MM월 dd일 HH시 mm분'."
      );
    }

    const [, year, month, day, hour, minute] = match;
    const parsedMinute = parseInt(minute, 10);

    return {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      hour: parseInt(hour, 10),
      ...(parsedMinute !== 0 && { minute: parsedMinute }), // minute이 0이면 속성 생략
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
