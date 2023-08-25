const LOCALE = "en-GB";

const OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const dateLong = (date: Date) => {
  return new Intl.DateTimeFormat(LOCALE, OPTIONS).format(date);
};
