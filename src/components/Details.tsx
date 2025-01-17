type DetailsProps = {
  date: string;
  time: string;
  location: string;
};

export function Details({ date, time, location }: DetailsProps) {
  return (
    <div className="details">
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Location:</strong> {location}</p>
    </div>
  );
}
