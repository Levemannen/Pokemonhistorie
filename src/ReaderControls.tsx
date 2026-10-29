import { t } from './i18n';
import type { ReaderPreferences } from './collections';
export function ReaderControls({ preferences, onChange, openBag, openWords, onRestart }: {
    preferences: ReaderPreferences;
    onChange: (value: ReaderPreferences) => void;
    openBag: () => void;
    openWords: () => void;
    onRestart?: () => void;
}) {
    return <section className="reader-controls" aria-label={t("Reading and adventure tools")}><button className="reader-mode" aria-pressed={preferences.readingMode} onClick={() => onChange({ ...preferences, readingMode: !preferences.readingMode })}>{t(preferences.readingMode ? '☷ Exit reading mode' : '☷ Reading mode')}</button><label>{t("Text size ")}<select aria-label={t("Text size")} value={preferences.textSize} onChange={e => onChange({ ...preferences, textSize: e.target.value as ReaderPreferences['textSize'] })}><option value="normal">{t("Comfortable")}</option><option value="large">{t("Large")}</option><option value="extra">{t("Extra large")}</option></select></label><div className="reader-tool-links"><button onClick={openBag}>{t("\u2667 Adventure bag")}</button><button onClick={openWords}>{t("Aa My Words")}</button></div>{onRestart && <button className="reader-restart" onClick={onRestart}>{t("Start again")}</button>}</section>;
}
