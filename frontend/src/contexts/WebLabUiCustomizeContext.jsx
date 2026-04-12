/* eslint-disable react-refresh/only-export-components -- hooks + provider in one module */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { scopeCssToSelector } from '../utils/scopeCssToSelector';

const STORAGE_HTML = 'coderv-web-lab-sidebar-html';
const STORAGE_CSS = 'coderv-web-lab-sidebar-css';
const STORAGE_LEARNING = 'coderv-web-lab-sidebar-learning';
const STORAGE_SIGNOUT = 'coderv-web-lab-sidebar-signout';

const STYLE_EL_ID = 'coderv-web-lab-sidebar-css';

const DEFAULT_LEARNING = 'Learning';
const DEFAULT_SIGNOUT = 'Sign out';

export const DEFAULT_SIDEBAR_HTML = `<!-- You are editing HTML. The sidebar reads this fragment and applies the text you put inside the tags. -->

<!-- Opens All Lessons — keep href="/lessons" exactly -->
<a href="/lessons">Learning</a>

<!-- Sign-out label — keep data-coderv="signout" so we match the right control -->
<button type="button" data-coderv="signout">Sign out</button>`;

export const DEFAULT_SIDEBAR_CSS = `/* You are editing CSS. Rules apply only to the real left sidebar. */

/* !important helps beat Tailwind utility classes on the same elements */
[data-coderv-sidebar-learning] {
  color: #4f46e5 !important;
  font-weight: 600 !important;
}

[data-coderv-sidebar-signout] {
  color: #dc2626 !important;
}

/* Whole column — try font-family, background, padding */
[data-coderv-sidebar-shell] {
  /* font-family: Georgia, serif !important; */
}`;

function clearLegacySidebarStorage() {
  try {
    localStorage.removeItem(STORAGE_HTML);
    localStorage.removeItem(STORAGE_CSS);
    localStorage.removeItem(STORAGE_LEARNING);
    localStorage.removeItem(STORAGE_SIGNOUT);
  } catch {
    /* ignore */
  }
}

function normalizePathHref(href) {
  if (!href) return '';
  const t = href.trim();
  if (t.startsWith('/')) return t.replace(/\/$/, '') || '/';
  try {
    const u = new URL(t, 'https://placeholder.local');
    return (u.pathname || '').replace(/\/$/, '') || '/';
  } catch {
    return t.replace(/\/$/, '');
  }
}

/**
 * Parse a small HTML fragment: lessons link + sign-out label.
 * Returns defaults if tags are missing (sidebar still works).
 */
export function parseSidebarLabHtml(html) {
  const hints = [];
  const defaults = { learningNavLabel: DEFAULT_LEARNING, signOutLabel: DEFAULT_SIGNOUT };
  const raw = String(html ?? '');
  const doc = new DOMParser().parseFromString(
    `<div id="coderv-sidebar-lab-root">${raw}</div>`,
    'text/html'
  );
  const root = doc.getElementById('coderv-sidebar-lab-root');
  if (!root) {
    return { ...defaults, hints: ['Could not parse this fragment.'] };
  }

  const link = [...root.querySelectorAll('a')].find(
    (a) => normalizePathHref(a.getAttribute('href')) === '/lessons'
  );
  if (!link) {
    hints.push('Include <a href="/lessons">…</a> so the Learning row can update.');
  }
  const learningNavLabel =
    link?.textContent?.replace(/\s+/g, ' ').trim() || defaults.learningNavLabel;

  let btn = root.querySelector('button[data-coderv="signout"]');
  if (!btn) btn = root.querySelector('button');
  if (!btn) {
    hints.push('Include <button type="button" data-coderv="signout">…</button> (or a single <button>) for sign out.');
  }
  const signOutLabel = btn?.textContent?.replace(/\s+/g, ' ').trim() || defaults.signOutLabel;

  return { learningNavLabel, signOutLabel, hints };
}

const WebLabUiCustomizeContext = createContext(null);

export function WebLabUiCustomizeProvider({ children }) {
  const [sidebarHtmlSource, setSidebarHtmlSourceState] = useState(DEFAULT_SIDEBAR_HTML);
  const [sidebarCssSource, setSidebarCssSourceState] = useState(DEFAULT_SIDEBAR_CSS);

  const parsed = useMemo(() => parseSidebarLabHtml(sidebarHtmlSource), [sidebarHtmlSource]);

  const setSidebarHtmlSource = useCallback((value) => {
    setSidebarHtmlSourceState(String(value ?? ''));
  }, []);

  const setSidebarCssSource = useCallback((value) => {
    setSidebarCssSourceState(String(value ?? ''));
  }, []);

  const resetSidebarLabels = useCallback(() => {
    setSidebarHtmlSourceState(DEFAULT_SIDEBAR_HTML);
    clearLegacySidebarStorage();
  }, []);

  const resetSidebarCss = useCallback(() => {
    setSidebarCssSourceState(DEFAULT_SIDEBAR_CSS);
    clearLegacySidebarStorage();
  }, []);

  useLayoutEffect(() => {
    clearLegacySidebarStorage();
  }, []);

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;
    const scoped = scopeCssToSelector(sidebarCssSource, '[data-coderv-sidebar-shell]');
    let el = document.getElementById(STYLE_EL_ID);
    if (!scoped.trim()) {
      el?.remove();
      return;
    }
    if (!el) {
      el = document.createElement('style');
      el.id = STYLE_EL_ID;
      document.head.appendChild(el);
    }
    el.textContent = scoped;
  }, [sidebarCssSource]);

  const value = useMemo(
    () => ({
      sidebarHtmlSource,
      setSidebarHtmlSource,
      sidebarCssSource,
      setSidebarCssSource,
      learningNavLabel: parsed.learningNavLabel,
      signOutLabel: parsed.signOutLabel,
      parseHints: parsed.hints,
      resetSidebarLabels,
      resetSidebarCss,
    }),
    [
      sidebarHtmlSource,
      setSidebarHtmlSource,
      sidebarCssSource,
      setSidebarCssSource,
      parsed.learningNavLabel,
      parsed.signOutLabel,
      parsed.hints,
      resetSidebarLabels,
      resetSidebarCss,
    ]
  );

  return <WebLabUiCustomizeContext.Provider value={value}>{children}</WebLabUiCustomizeContext.Provider>;
}

export function useWebLabUiCustomize() {
  const ctx = useContext(WebLabUiCustomizeContext);
  if (!ctx) throw new Error('useWebLabUiCustomize must be used inside WebLabUiCustomizeProvider');
  return ctx;
}

export function useWebLabUiCustomizeOptional() {
  return useContext(WebLabUiCustomizeContext);
}
