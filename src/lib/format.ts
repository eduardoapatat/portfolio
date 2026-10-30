import type { Lang } from '@/i18n/ui';
import { useTranslations } from '@/i18n/utils';

// Las fechas del frontmatter son medianoche UTC: formatear en UTC evita que salgan un mes antes.
const monthYear = (lang: Lang) =>
  new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatMonth(lang: Lang, date: Date) {
  return monthYear(lang).format(date);
}

/** "ene 2024 – mar 2025", o "ene 2024 – Actualidad" sin fecha de término. */
export function formatPeriod(lang: Lang, start: Date, end?: Date) {
  const t = useTranslations(lang);
  return `${formatMonth(lang, start)} – ${end ? formatMonth(lang, end) : t('experience.present')}`;
}
