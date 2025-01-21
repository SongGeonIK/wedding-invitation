import './WeddingInvitation.css'; // 글로벌 css
import { Greeting } from '../sections/Greeting';
import { Details } from '../sections/Details';
import { Message } from '../sections/Message';
import { ClosingRemarks } from '../sections/ClosingRemarks';
import { MainImage } from '../sections/MainImage';
import { WeddingDateTime } from '../sections/WeddingDateTime';

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
  const location = '대한민국 어딘가겠지?';
  const greetingMessage = `서로의 소중함을 느끼며 함께한 시간 속에서\n저희 두 사람은 평생을 함께하고자 결혼을 약속하게 되었습니다.\n
                           저희의 새로운 시작을 축복으로 함께해 주신다면\n큰 기쁨과 감사로 기억하겠습니다.\n
                           소중한 날에 따뜻한 마음으로 함께해 주세요.`;

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
        detailsText={`${dateTime}\n${location}`}
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
    </div>
  );
}
