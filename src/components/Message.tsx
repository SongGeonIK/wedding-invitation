type MessageProps = {
  message: string;
};

export function Message({ message }: MessageProps) {
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
}
