import { Gretting } from '../sections/Greeting';
import { Details } from '../sections/Details';
import { Message } from '../sections/Message';
import { ClosingRemarks } from '../sections/ClosingRemarks';
import { MainImage } from '../sections/MainImage';
import './WeddingInvitation.css'

type WeddingInvitationProps = {
  groom: string;
  bride: string;
  date: string;
  time: string;
  location: string;
  message: string;
};

export function WeddingInvitation({ groom, bride, date, time, location, message }: WeddingInvitationProps) {
  return (
    <div className='wedding-invitation-container'>
      <MainImage 
        altText='이미지를 표시할 수 없습니다.'
        mainText ='~간단한 결혼 문구 적자~'
        coupleNames={`${groom} | ${bride}`}
        detailsText={`${date} ${time}\n${location}`}
      />
      <Gretting
        groom="건익"
        bride="지수"
        groomTitle="장남"
        brideTitle="차녀"
        parents={{
          groomParents: "송인성 · 김복자",
          brideParents: "○○○ · ○○○",
        }}
        message={`서로의 소중함을 느끼며 함께한 시간 속에서\n저희 두 사람은 평생을 함께하고자 결혼을 약속하게 되었습니다.\n
          저희의 새로운 시작을 축복으로 함께해 주신다면\n큰 기쁨과 감사로 기억하겠습니다.\n
          소중한 날에 따뜻한 마음으로 함께해 주세요.`}          
      />
    </div>
  );
}