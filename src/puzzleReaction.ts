import type {State} from './story';
import {getLanguage} from './i18n';
export function puzzleReaction(state:State):string{
 const pairs:Record<string,[string,string]>={
 mushrooms:['The mushrooms blink and settle. Your partner points back to the different sizes. “We can look again.”','Soppene blinker og faller til ro. Vennen din peker på de ulike størrelsene. «Vi kan se en gang til.»'],
 falls:['A little splash answers the bells. Your partner shakes off a drop and waits for the echo again.','Et lite plask svarer klokkene. Vennen din rister av en dråpe og venter på ekkoet igjen.'],
 Bulbasaur:['Bulbasaur gently unhooks the vine. “Nothing broken. Which part drinks first?”','Bulbasaur løsner slyngtråden varsomt. «Ingenting er ødelagt. Hvilken del drikker først?»'],
 Charmander:['Charmander pulls its tail back. “Still stuck. Let us check the little gear.”','Charmander trekker halen tilbake. «Fortsatt fast. La oss sjekke det lille tannhjulet.»'],
 Squirtle:['Squirtle lets the water drain away. “We can start again at the pipe.”','Squirtle lar vannet renne ut. «Vi kan begynne på nytt ved røret.»']};
 const pair=pairs[state.scene==='observatory'?state.starter:state.scene];
 return pair?pair[getLanguage()==='nb'?1:0]:getLanguage()==='nb'?'Ingen skade skjedd. Prøv igjen eller be om et hint.':'Nothing is lost. Try again or ask for a hint.';
}
