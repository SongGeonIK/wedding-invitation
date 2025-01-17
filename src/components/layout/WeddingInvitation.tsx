import { Gretting } from '../sections/Greeting';
import { Details } from '../sections/Details';
import { Message } from '../sections/Message';
import { ClosingRemarks } from '../sections/ClosingRemarks';

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
    <div>
      <Gretting bride={bride} groom={groom} />
      <Details date={date} time={time} location={location} />
      <Message message={message} />
      <ClosingRemarks />
    </div>
  );
}