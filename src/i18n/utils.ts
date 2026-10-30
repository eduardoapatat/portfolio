import { defaultLang, languages, ui, type Lang, type UiKey } from './ui';
import { routes, type RouteKey } from './routes';

const withTrailingSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export function getLang(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return segment in languages ? (segment as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}

export function pathFor(key: RouteKey, lang: Lang) {
  return routes[key][lang];
}

/** Clave de ruta de la página actual, o `undefined` si no está en el mapa. */
export function getRouteKey(url: URL): RouteKey | undefined {
  const path = withTrailingSlash(url.pathname);
  return (Object.keys(routes) as RouteKey[]).find((key) =>
    Object.values(routes[key]).includes(path as never),
  );
}

/** La misma sección en otro idioma; si la ruta no se conoce, el inicio de ese idioma. */
export function alternatePath(url: URL, targetLang: Lang) {
  return pathFor(getRouteKey(url) ?? 'home', targetLang);
}
