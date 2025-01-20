import './WeddingDateTime.css';

type WeddingDateTimeProps = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
}

export function WeddingDateTime({
    year, month, day, hour, minute
}: WeddingDateTimeProps) {
    const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 해당 월의 첫째 날 요일
    const daysInMonth = new Date(year, month, 0).getDate(); // 해당 월의 날짜 수

    return (
        <div>
            {/* 예식일시 */}
            <div className="header">
                <h2 className="header-title">예식 일시</h2>
                <hr className="header-line" />
            </div>

            {/* 날짜 및 시간 표시 */}
            <div className="date-time-container">
                <p className="date-text">{year}년 {month}월 {day}일</p>
                <p className="time-text">
                    {dayOfWeekNames[new Date(year, month - 1, day).getDay()]}요일 {hour}시 {minute}분
                </p>
            </div>

            {/* 캘린더 헤더 */}
            <div className="calendar-container">
                <div className="calendar-header-title">
                    <p>{year}년 {month}월 {day}일</p>
                </div>

                {/* 캘린더 */}
                <table className="calendar">
                    <thead>
                        <tr>
                            {dayOfWeekNames.map((dayName) => (
                                <th key={dayName} className="calendar-header">{dayName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const currentDay =
                                        weekIndex * 7 + dayIndex - firstDayOfMonth + 1;

                                    return (
                                        <td
                                            key={dayIndex}
                                            className={`calendar-day ${
                                                currentDay === day
                                                    ? 'selected-day'
                                                    : currentDay > 0 && currentDay <= daysInMonth
                                                    ? 'normal-day'
                                                    : 'empty-day'
                                            }`}
                                        >
                                            {currentDay > 0 && currentDay <= daysInMonth
                                                ? currentDay
                                                : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
