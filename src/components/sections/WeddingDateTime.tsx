import styles from './WeddingDateTime.module.css';

type WeddingDateTimeProps = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute?: number,
}

function formatMonth(month: number) {
    return String(month).padStart(2, "0");
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
            <div className={styles.dateTimeContainer}>
                <p className={styles.dateText}>{year}년 {formatMonth(month)}월 {day}일</p>
                <p className={styles.timeText}>
                {`${dayOfWeekNames[new Date(year, month - 1, day).getDay()]}요일 ${hour}시
                    ${typeof minute === "number" && !isNaN(minute) ? ` ${minute}분` : ""}`
                }
                </p>
            </div>

            {/* 캘린더 헤더 */}
            <div className={styles.calendarContainer}>
                <div className={styles.calendarHeaderTitle}>
                    <p>{year}년 {formatMonth(month)}월</p>
                </div>

                {/* 캘린더 */}
                <table className={styles.calendar}>
                    <thead>
                        <tr>
                            {dayOfWeekNames.map((dayName) => (
                                <th key={dayName} className={styles.calendarHeader}>{dayName}</th>
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
                                            className={`${styles.calendarDay} ${
                                                currentDay === day
                                                    ? styles.selectedDay
                                                    : currentDay > 0 && currentDay <= daysInMonth
                                                    ? styles.normalDay
                                                    : styles.emptyDay
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
