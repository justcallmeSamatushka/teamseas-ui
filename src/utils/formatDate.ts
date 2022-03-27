import { format } from 'date-fns'


export const formatDate = (time?: string | number | Date) => {
  if (!time) return;

  return format(new Date(time), 'Pp');
};