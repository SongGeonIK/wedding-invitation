import { WeddingInvitation } from './components/WeddingInvitation';

function App() {
  return (
    <WeddingInvitation
      bride="Emily" // 신부
      groom="John"  // 신랑
      date="202X.XX.XX"
      time="XX시"
      location="대한민국 어딘가겠지?"
      message="초대장에 적을 환영 메세지를 적으면 됨."
    />
  );
}

export default App;