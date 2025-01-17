type GrettingProps = {
    bride: string;
    groom: string;
  };
  
  export function Gretting({ bride, groom }: GrettingProps) {
    return (
      <div className="header">
        <h1>{bride} & {groom}</h1>
        <p className="subtitle">♡청첩장♡</p>
      </div>
    );
  }
  