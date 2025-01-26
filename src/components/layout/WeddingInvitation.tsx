import './WeddingInvitation.css'; // 글로벌 css
import { Greeting } from '../sections/Greeting';
import { MainImage } from '../sections/MainImage';
import { WeddingDateTime } from '../sections/WeddingDateTime';
import { Directions } from '../sections/Directions';
import { Gallery } from '../sections/Gallery';

export function WeddingInvitation() {
  // 커스텀 입력
  const groom = {
    lastName: '송',
    firstName: '건익',
    title: '장남',
    fatherName: '송인성',
    motherName: '김복자',
  };
  const bride = {
    lastName: '이',
    firstName: '지수',
    title: '차녀',
    fatherName: '이민창',
    motherName: '최영란',
  };
  const dateTime = '2025년 01월 16일 14시 30분'; // yyyy년 MM월 dd일 HH시 mm분
  const address = '서울 강서구 마곡중앙5로 6 보타닉푸르지오시티 L층(로비층)';
  const weddingVenue = '웨딩 장소';
  const floor = 'n층';
  const weddingHall = 'OOO홀';
  const greetingMessage = `서로의 소중함을 느끼며 함께한 시간 속에서\n저희 두 사람은 평생을 함께하고자 결혼을 약속하게 되었습니다.\n
                           저희의 새로운 시작을 축복으로 함께해 주신다면\n큰 기쁨과 감사로 기억하겠습니다.\n
                           소중한 날에 따뜻한 마음으로 함께해 주세요.`;
  const kakaoMapjavaScriptKey = process.env.REACT_APP_KAKAO_API_KEY as string;  // 참고) root에서 .env 파일만들어 생성 필요. value: 카카오 디벨로퍼에서 어플리케이션 생성 후 JavaScript 키 발급
  const subwayText = `2호선 한양대역 1번 출구 → 한양대병원 방향 도보 5분
                      5호선 왕십리역 6번 출구 → 한양대병원 방향 도보 5분`;
  const busText = `지선  2012 2013 2014 2220 2222 2411 2016
                   간선  263 302 371`;
  const parkingText = `건물 주차장 또는 병원 주차장 이용 시 90분 무료
                       * 이후 추가요금 발생`;

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
        mainText="결혼 간단한 문구 작성하기"
        coupleNames={`${groom.lastName}${groom.firstName} | ${bride.lastName}${bride.firstName}`}
        detailsText={`${dateTime}\n${weddingVenue} ${floor} ${weddingHall}`}
      />
      {/* 인사말 */}
      <Greeting
        groom={groom.firstName}
        bride={bride.firstName}
        groomTitle={groom.title}
        brideTitle={bride.title}
        parents={{
          groomParents: `${groom.fatherName} · ${groom.motherName}`,
          brideParents: `${bride.fatherName} · ${bride.motherName}`,
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
        kakaoMapjavaScriptKey={kakaoMapjavaScriptKey}
        subwayText={subwayText}
        busText={busText}
        parkingText={parkingText}
      />
      {/* 갤러리 */}
      <Gallery />
    </div>
  );
}
