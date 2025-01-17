type HeaderProps = {
  bride: string;
  groom: string;
};

export function Header({ bride, groom }: HeaderProps) {
  return (
    <div className="header">
      <h1>{bride} & {groom}</h1>
      <p className="subtitle">♡청첩장♡</p>
    </div>
  );
}
