import { Gretting } from '../sections/Greeting';
import { Details } from '../sections/Details';
import { Message } from '../sections/Message';
import { ClosingRemarks } from '../sections/ClosingRemarks';
import { MainImage } from '../sections/MainImage';
import './WeddingInvitation.css'
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
  const date="202X.XX.XX"
  const time="XX시"
  const location="대한민국 어딘가겠지?"

  return (
    <div className='wedding-invitation-container'>
      {/* 메인이미지 */}
      <MainImage 
        altText='이미지를 표시할 수 없습니다.'
        mainText ='~간단한 결혼 문구 적자~'
        coupleNames={`${groom.lastName}${groom.firstName} | ${bride.lastName}${bride.firstName}`}
        detailsText={`${date} ${time}\n${location}`}
      />
      {/* 인사말 */}
      <Gretting
        groom={groom.firstName}
        bride={bride.firstName}
        groomTitle={groom.title}
        brideTitle={bride.title}
        parents={{
          groomParents: `${groom.fatherName} · ${groom.motherName}`,
          brideParents: `${bride.fatherName} · ${bride.motherName}`,
        }}
        message={`서로의 소중함을 느끼며 함께한 시간 속에서\n저희 두 사람은 평생을 함께하고자 결혼을 약속하게 되었습니다.\n
          저희의 새로운 시작을 축복으로 함께해 주신다면\n큰 기쁨과 감사로 기억하겠습니다.\n
          소중한 날에 따뜻한 마음으로 함께해 주세요.`}          
      />
      {/* 예식일시 */}
      <WeddingDateTime
        date= {date}
        time= {time}
        location= {location}
      />
    </div>
  );
}