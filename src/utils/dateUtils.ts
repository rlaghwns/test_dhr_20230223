import moment from "moment";
/**
 * 날짜를 format 맞추어 리턴 한다
 * @param dayCount
 * @param dateFormat - 원하는 date 포멧 정의
 * @returns {string} "YYYY-MM-DD" 형식으로 리턴
 */
export const getToday = (
  dayCount: number = 0,
  dateFormat: string = "YYYY-MM-DD"
) => {
  // 일자 계산하기
  const today = new Date();
  const calcDate = new Date(today);
  calcDate.setDate(today.getDate() + dayCount);

  return moment(calcDate).format(dateFormat);
};
