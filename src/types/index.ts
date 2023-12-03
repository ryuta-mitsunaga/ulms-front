type Week = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

type DateData = {
  year: number;
  month: string;
  day: string;
  dayOfWeek: number;
  jpWeek: string;
};

// Path: src/types/bootstrap.ts
type ColorInBootstrap =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'body'
  | 'muted'
  | 'white'
  | 'black-50'
  | 'white-50';
