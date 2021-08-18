import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export const dateLang = (date, format) => {
    return dayjs(date).locale('fr').format(format)
}