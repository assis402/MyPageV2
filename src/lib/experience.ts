const BEGIN_OF_CAREER = new Date(2020, 10, 1);

export function monthDifference(firstDate: Date, secondDate: Date) {
  return secondDate.getMonth() - firstDate.getMonth() + 12 * (secondDate.getFullYear() - firstDate.getFullYear());
}

export function getWorkExperience(now = new Date()) {
  const careerPeriodInMonths = monthDifference(BEGIN_OF_CAREER, now);

  return {
    years: Math.floor(careerPeriodInMonths / 12),
    months: careerPeriodInMonths % 12,
  };
}

export function getAge(now = new Date()) {
  return now.getFullYear() - 1997;
}
