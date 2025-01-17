import { WeddingInvitation } from './components/layout/WeddingInvitation';

function App() {
  return (
    <WeddingInvitation
      bride="[신랑이름]" // 신부
      groom="[신부이름]"  // 신랑
      date="202X.XX.XX"
      time="XX시"
      location="대한민국 어딘가겠지?"
      message="초대장에 적을 환영 메세지를 적으면 됨."
    />
  );
}

export default App;