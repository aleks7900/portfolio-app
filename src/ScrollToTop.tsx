import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Скроллит страницу вверх при каждом изменении пути или query-строки.
 * Если есть hash (#anchor), даём браузеру прокрутиться к якорю и не вмешиваемся.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // уважаем поведение якорей типа /page#section
    // Немного откладываем, чтобы прокрутка произошла уже после монтирования целевой страницы
    // и не была перезаписана последующим рендером.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [pathname, search, hash]);

  return null;
}