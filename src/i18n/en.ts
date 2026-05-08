// English translations.
// Keep texts SHORT — they must fit MINDDRIFT's letter-spaced uppercase layout.
export const en = {
  home: {
    feeling: "HOW ARE YOU\nFEELING?",
    choose: "CHOOSE A RESET THAT FITS YOU.",
    notSure: "NOT SURE? GET A RANDOM RESET",
  },
  categories: {
    stress: "STRESS",
    focus: "FOCUS",
    overthinking: "OVERTHINKING",
    anxiety: "ANXIETY",
    burnout: "BURNOUT",
    quickCalm: "QUICK CALM",
  },
  exercise: {
    title: "EXERCISE",
    helped: "HELPED",
    notToday: "NOT TODAY",
    done: "DONE",
    takeYourTime: "TAKE YOUR TIME",
  },
  loading: {
    preparing: "GET READY FOR YOUR EXERCISE",
  },
  completed: {
    title: "COMPLETED",
    resetSaved: "DID THIS\nHELP YOU\nTODAY?",
    thankYou: "THANK YOU.",
    learn: "MINDDRIFT WILL LEARN\nWHAT WORKS FOR YOU.",
    another: "DO ANOTHER RESET",
    backHome: "BACK HOME",
  },
  error: {
    title: "SOMETHING\nWENT WRONG",
    message1: "WE COULDN'T REACH THE SERVER.",
    message2: "PLEASE CHECK YOUR CONNECTION\nAND TRY AGAIN.",
    backHome: "BACK HOME",
  },
};

export type Translations = typeof en;
