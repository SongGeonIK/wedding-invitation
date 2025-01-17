import { Header } from './Header';
import { Details } from './Details';
import { Message } from './Message';
import { Footer } from './Footer';
import '../styles/WeddingInvitation.css';

type WeddingInvitationProps = {
  bride: string;
  groom: string;
  date: string;
  time: string;
  location: string;
  message: string;
};

export function WeddingInvitation({ bride, groom, date, time, location, message }: WeddingInvitationProps) {
  return (
    <div className="invitation-container">
      <Header bride={bride} groom={groom} />
      <Details date={date} time={time} location={location} />
      <Message message={message} />
      <Footer />
    </div>
  );
}