
type WeddingDateTimeProps = {
    date: string;
    time: string;
    location: string;
}

export function WeddingDateTime({
    date,
    time,
    location
}: WeddingDateTimeProps) {
    return (
        <div>
            {/* 예식일시 고정 부분 */}
            <div className="header">
                <h2 className="header-title">예식일시</h2>
                <hr className="header-line" />
            </div>

        </div>
    );
}