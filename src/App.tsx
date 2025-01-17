import { WeddingInvitation } from './components/WeddingInvitation';

function App() {
  return (
    <WeddingInvitation
      bride="Emily"
      groom="John"
      date="June 15, 2025"
      time="3:00 PM"
      location="Sunset Gardens, California"
      message="Please join us for an evening of love, laughter, and celebration."
    />
  );
}

export default App;