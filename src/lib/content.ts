import { getCollection } from 'astro:content';
import type { Lang } from '@/i18n/ui';

const inLang =
  (lang: Lang) =>
  ({ id }: { id: string }) =>
    id.startsWith(`${lang}/`);

export async function getProjects(lang: Lang) {
  const projects = await getCollection('projects', inLang(lang));
  return projects.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export async function getExperience(lang: Lang) {
  const experience = await getCollection('experience', inLang(lang));
  return experience.sort((a, b) => b.data.start.getTime() - a.data.start.getTime());
}
