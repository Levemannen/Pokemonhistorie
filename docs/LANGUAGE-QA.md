# Norwegian learning support — quality review, 25 October 2026

## Delivered

- 66 locally authored English definitions with Norwegian Bokmål meanings. Common inflections resolve to the same saved word.
- Norwegian help for all 104 authored choices, including starter names. Help and audio are separate native buttons outside the navigation button; translations are initially hidden.
- Optional sentence-by-sentence playback. A spoken sentence is highlighted when the browser provides speech events. Full-page highlighting follows boundary events; it does not falsely leave the first sentence highlighted on devices without boundary support.
- Bilingual personal vocabulary notebook retains the English example from the child's own journey. Existing saves remain readable.
- A stop control is available for choice/word/sentence playback as well as whole-page narration. Sentence segmentation is computed once per utterance; a fallback supports browsers without Intl.Segmenter.
- Storybook styling, visible keyboard focus, large-text choices, bounded word popovers and language attributes on bilingual content.

## Checks performed

- All automated suites passed: story regressions, saved journeys, puzzles, art mappings, consistency and new language tests.
- Language tests cover every dictionary entry and every choice for all three starters, sentence text/offset preservation, highlighting markup, initially hidden translations, saved-word translations and disabled audio controls.
- Browser smoke test at localhost:4174 confirmed that opening Norwegian choice help leaves the scene unchanged, playback is separate from choosing, narration can stop, a clicked word shows Norwegian and English, and the saved word/example survive reload.
- Visually inspected the choice helpers and word popover with extra-large text in reading mode.
- Production build passed. All six endings remain reachable with every starter (46,314 future-relevant states checked).

## Scope and device limits

Norwegian support covers dictionary entries and choices; full story sentences have playback, not Norwegian sentence translations. Chapter vocabulary quizzes and word-mastery tracking are not part of this revision. These checks verify software behavior and coverage, not measured learning outcomes.

Audio uses browser speech synthesis and prefers a local English voice. Voice availability, pronunciation and boundary-event support vary by device. The software path and stop controls were exercised; pronunciation quality was not independently assessed. No microphone, external translation API, API keys or paid services were added. Mobile-sized visual testing remains to be performed on a phone.
