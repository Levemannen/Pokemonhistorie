import { t } from './i18n';
import { useEffect, useRef, useState } from 'react';
import { getPuzzle, hintPuzzle, progressFor, resetPuzzle, tryPuzzle } from './puzzles';
import type { State } from './story';
export function PuzzleCard({ game, onChange }: {
    game: State;
    onChange: (state: State) => void;
}) {
    const puzzle = getPuzzle(game);
    const [audioError, setAudioError] = useState(false);
    const sound = useRef<AudioContext | null>(null);
    const stop = useRef<() => void>(() => { });
    useEffect(() => () => { stop.current(); void sound.current?.close(); }, []);
    if (!puzzle)
        return null;
    const progress = progressFor(game, puzzle.id);
    async function play(notes: number[]) {
        try {
            stop.current();
            const ctx = sound.current && sound.current.state !== 'closed' ? sound.current : new AudioContext();
            sound.current = ctx;
            await ctx.resume();
            const nodes: OscillatorNode[] = [];
            notes.forEach((n, i) => { const osc = ctx.createOscillator(), gain = ctx.createGain(), t = ctx.currentTime + i * .65; osc.type = 'sine'; osc.frequency.value = n === 0 ? 330 : 523.25; gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(.12, t + .03); gain.gain.exponentialRampToValueAtTime(.001, t + .45); osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t + .5); osc.onended = () => { osc.disconnect(); gain.disconnect(); }; nodes.push(osc); });
            stop.current = () => nodes.forEach(n => { try {
                n.stop();
            }
            catch { /* Already finished. */ } });
            setAudioError(false);
        }
        catch {
            setAudioError(true);
        }
    }
    const wrong = progress.attempts > 0 && !progress.solved && progress.input.length === 0;
    return <section className={`puzzle-card ${progress.solved ? 'solved' : ''}`} aria-label={t(puzzle.title)}><div className="page-label">{t(progress.solved ? '✦ SOLVED TOGETHER' : '✧ TRY A LITTLE PUZZLE')}</div><h3>{t(puzzle.title)}</h3><p>{t(puzzle.instruction)}</p><details className="puzzle-inspect"><summary>{t("Look a little closer")}</summary><p>{t(puzzle.observation)}</p></details>{t(puzzle.kind === 'melody' && <><button className="small-action" onClick={() => void play(puzzle.answer)}>{t("\u266B Listen to the echo")}</button><details className="written-echo"><summary>{t("Read the echo instead of listening")}</summary><p>{t("The echo: low \u2192 high \u2192 low. This is the same clue as the sound.")}</p></details>{t(audioError && <p role="status">{t("Sound is unavailable here. Choose \u201CRead the echo\u201D for the same clue without audio.")}</p>)}</>)}
 <div className={`puzzle-controls ${puzzle.kind === 'stars' ? 'star-grid' : ''}`}>{t(puzzle.buttons.map((label, i) => <button key={i} aria-label={t(label === 'Empty sky' ? `Empty sky, square ${i + 1}` : label === 'Decoy star' ? `Faint spark, square ${i + 1}` : label)} aria-pressed={progress.input.includes(i)} disabled={progress.solved} className={puzzle.kind === 'stars' ? `star-cell star-${i}` : ''} onClick={() => { if (puzzle.kind === 'melody')
        void play([i]); onChange(tryPuzzle(game, i)); }}>{t(puzzle.kind === 'stars' ? <><span aria-hidden="true">{t(label === 'Empty sky' ? '·' : '✦')}</span><small>{t(label === 'Small star' ? 'small' : label === 'Medium star' ? 'medium' : label === 'Large star' ? 'large' : label === 'Decoy star' ? 'faint' : '')}</small></> : label)}</button>))}</div>
 <div className="puzzle-status" role="status" aria-live="polite">{t(progress.solved ? puzzle.success : progress.input.length ? `Your sequence: ${progress.input.map(i => puzzle.buttons[i]).join(' → ')}. ${puzzle.answer.length - progress.input.length} more to choose.` : wrong ? puzzle.id==='roots'?'The tree shakes its leaves: “That would not grow by sharing — try something someone else can pass on.”':'Not quite yet — nothing is lost! Try again, ask for a hint, or choose another story path.' : `Choose ${puzzle.answer.length === 1 ? 'one answer' : puzzle.answer.length + ' steps in order'}. You can try as often as you like.`)}</div>
 {t(!progress.solved && <div className="puzzle-actions"><button className="small-action" disabled={progress.hints === puzzle.hints.length} onClick={() => onChange(hintPuzzle(game))}>{t(progress.hints === puzzle.hints.length ? 'All hints shown' : progress.hints ? 'Show a clearer hint' : `Ask ${game.starter} for a hint`)}</button><button className="small-action" disabled={!progress.input.length} onClick={() => onChange(resetPuzzle(game))}>{t("Clear my sequence")}</button></div>)}{t(progress.hints > 0 && <p className="puzzle-hint">{t(puzzle.hints[progress.hints - 1])}</p>)}</section>;
}
