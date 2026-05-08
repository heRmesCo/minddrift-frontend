import type { Translations } from "./en";

// German translations.
// Keep texts SHORT — they must fit MINDDRIFT's letter-spaced uppercase layout.
export const de: Translations = {
  home: {
    feeling: "WIE FÜHLST\nDU DICH?",
    choose: "WÄHLE EINEN PASSENDEN RESET.",
    notSure: "UNSICHER? ZUFÄLLIGEN RESET WÄHLEN",
  },
  categories: {
    stress: "STRESS",
    focus: "FOKUS",
    overthinking: "GRÜBELN",
    anxiety: "ANGST",
    burnout: "BURNOUT",
    quickCalm: "RUHE",
  },
  exercise: {
    title: "ÜBUNG",
    helped: "HAT GEHOLFEN",
    notToday: "NICHT HEUTE",
    done: "FERTIG",
    takeYourTime: "LASS DIR ZEIT",
  },
  loading: {
    preparing: "MACH DICH FÜR DEINE ÜBUNG BEREIT",
  },
  completed: {
    title: "ERLEDIGT",
    resetSaved: "HAT DIR\nDAS HEUTE\nGEHOLFEN?",
    thankYou: "DANKE.",
    learn: "MINDDRIFT LERNT,\nWAS DIR HILFT.",
    another: "NOCH EIN RESET",
    backHome: "ZURÜCK",
  },
  error: {
    title: "ETWAS LIEF\nSCHIEF",
    message1: "DER SERVER IST NICHT ERREICHBAR.",
    message2: "PRÜFE DEINE VERBINDUNG\nUND VERSUCHE ES ERNEUT.",
    backHome: "ZURÜCK",
  },
};
