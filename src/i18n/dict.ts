// src/i18n/dict.ts

export const SUPPORTED_LOCALES = ["en", "fr", "pl", "ro", "bd"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && SUPPORTED_LOCALES.includes(v as Locale);
}

export const LABELS: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  fr: { name: "Français", flag: "🇫🇷" },
  pl: { name: "Polski", flag: "🇵🇱" },
  ro: { name: "Română", flag: "🇷🇴" },
  bd: { name: "বাংলা", flag: "🇧🇩" },
};

export type Dict = {
  nav: {
    adventures: string;
    arcade: string;
    strategy: string;
    braintraining: string;
    sports: string;
  };
  myAccount: string;
  footer: {
    adventures: string;
    arcade: string;
    strategy: string;
    braintraining: string;
    sports: string;
    copyright: string;
    terms: string;
  };
  page: {
    adventures: string;
    arcade: string;
    strategy: string;
    braintraining: string;
    sports: string;
    ranking: string;
  };
  login: {
    title: string;
    username: string;
    phoneNumber: string;
    submit: string;
    forgot: string;
    noAccount: string;
    register: string;
  };
  register: {
    title: string;
    username: string;
    phoneNumber: string;
    countryName: string;
    countryCode: string;
    submit: string;
  }
};

export const dict: Record<Locale, Dict> = {
  en: {
    nav: {
      adventures: "ADVENTURES",
      arcade: "ARCADE",
      strategy: "STRATEGY",
      braintraining: "BRAINTRAINING",
      sports: "SPORTS",
    },
    myAccount: "My account",
    footer: {
      adventures: "ADVENTURES",
      arcade: "ARCADE",
      strategy: "STRATEGY",
      braintraining: "BRAINTRAINING",
      sports: "SPORTS",
      copyright: "© Copyright 2025 - All Rights Reserved",
      terms: "Terms & Conditions",
    },
    page: {
      adventures: "ADVENTURES",
      arcade: "ARCADE",
      strategy: "STRATEGY",
      braintraining: "BRAINTRAINING",
      sports: "SPORTS",
      ranking: "RANKING",
    },
    login: {
      title: "SIGN IN",
      username: "username",
      phoneNumber: "Enter phone number",
      submit: "LOGIN",
      forgot: "Forgot password?",
      noAccount: "Don't have an account?",
      register: "Register here",
    },
    register:{
      title: "SIGN UP AND PLAY",
      username: "Your Name",
      phoneNumber: "Your phone number",
      countryName: "Country",
      countryCode: "Country Code",
      submit: "START NOW"
    }

  },

  fr: {
    nav: {
      adventures: "AVENTURES",
      arcade: "ARCADE",
      strategy: "STRATÉGIE",
      braintraining: "ENTRAÎNEMENT CÉRÉBRAL",
      sports: "SPORTS",
    },
    myAccount: "Mon compte",
    footer: {
      adventures: "AVENTURES",
      arcade: "ARCADE",
      strategy: "STRATÉGIE",
      braintraining: "ENTRAÎNEMENT CÉRÉBRAL",
      sports: "SPORTS",
      copyright: "© Copyright 2025 - Tous droits réservés",
      terms: "Conditions générales",
    },
    page: {
      adventures: "AVENTURES",
      arcade: "ARCADE",
      strategy: "STRATÉGIE",
      braintraining: "ENTRAÎNEMENT CÉRÉBRAL",
      sports: "SPORTS",
      ranking: "CLASSEMENT",
    },
    login: {
      title: "CONNEXION",
      username: "nom d'utilisateur",
      phoneNumber: "Entrez le numero de telephone",
      submit: "SE CONNECTER",
      forgot: "Mot de passe oublié ?",
      noAccount: "Vous n'avez pas de compte ?",
      register: "Inscrivez-vous ici",
    },
    register: {
      title: "INSCRIVEZ-VOUS ET JOUEZ",
      username: "Votre nom",
      phoneNumber: "Votre numéro de téléphone",
      countryName: "Pays",
      countryCode: "Indicatif du pays",
      submit: "COMMENCER MAINTENANT"
}

  },

  pl: {
    nav: {
      adventures: "PRZYGODY",
      arcade: "ARKADA",
      strategy: "STRATEGIA",
      braintraining: "TRENING MÓZGU",
      sports: "SPORT",
    },
    myAccount: "Moje konto",
    footer: {
      adventures: "PRZYGODY",
      arcade: "ARKADA",
      strategy: "STRATEGIA",
      braintraining: "TRENING MÓZGU",
      sports: "SPORT",
      copyright: "© Copyright 2025 - Wszelkie prawa zastrzeżone",
      terms: "Regulamin",
    },
    page: {
      adventures: "PRZYGODY",
      arcade: "ARKADA",
      strategy: "STRATEGIA",
      braintraining: "TRENING MÓZGU",
      sports: "SPORT",
      ranking: "RANKING",
    },
    login: {
      title: "ZALOGUJ SIĘ",
      username: "nazwa użytkownika",
       phoneNumber: "Wpisz numer telefonu",
      submit: "ZALOGUJ",
      forgot: "Nie pamiętasz hasła?",
      noAccount: "Nie masz konta?",
      register: "Zarejestruj się tutaj",
    },
    register: {
      title: "ZAREJESTRUJ SIĘ I GRAJ",
      username: "Twoje imię",
      phoneNumber: "Twój numer telefonu",
      countryName: "Kraj",
      countryCode: "Kod kraju",
      submit: "ROZPOCZNIJ TERAZ"
}

  },

  ro: {
    nav: {
      adventures: "AVENTURI",
      arcade: "ARCADE",
      strategy: "STRATEGIE",
      braintraining: "ANTRENAMENT CEREBRAL",
      sports: "SPORT",
    },
    myAccount: "Contul meu",
    footer: {
      adventures: "AVENTURI",
      arcade: "ARCADE",
      strategy: "STRATEGIE",
      braintraining: "ANTRENAMENT CEREBRAL",
      sports: "SPORT",
      copyright: "© Copyright 2025 - Toate drepturile rezervate",
      terms: "Termeni și condiții",
    },
    page: {
      adventures: "AVENTURI",
      arcade: "ARCADE",
      strategy: "STRATEGIE",
      braintraining: "ANTRENAMENT CEREBRAL",
      sports: "SPORT",
      ranking: "CLASAMENT",
    },
    login: {
      title: "AUTENTIFICARE",
      username: "nume utilizator",
      phoneNumber: "Wpisz numer telefonu",
      submit: "INTRĂ",
      forgot: "Ai uitat parola?",
      noAccount: "Nu ai un cont?",
      register: "Înregistrează-te aici",
    },
    register: {
      title: "ÎNSCRIE-TE ȘI JOACĂ",
      username: "Numele tău",
      phoneNumber: "Numărul tău de telefon",
      countryName: "Țara",
      countryCode: "Cod țară",
      submit: "ÎNCEPE ACUM"
    }

  },

  bd: {
    nav: {
      adventures: "অ্যাডভেঞ্চার",
      arcade: "আর্কেড",
      strategy: "কৌশল",
      braintraining: "ব্রেইন ট্রেনিং",
      sports: "খেলাধুলা",
    },
    myAccount: "আমার অ্যাকাউন্ট",
    footer: {
      adventures: "অ্যাডভেঞ্চার",
      arcade: "আর্কেড",
      strategy: "কৌশল",
      braintraining: "ব্রেইন ট্রেনিং",
      sports: "খেলাধুলা",
      copyright: "© কপিরাইট ২০২৫ - সর্বস্বত্ব সংরক্ষিত",
      terms: "শর্তাবলী",
    },
    page: {
      adventures: "অ্যাডভেঞ্চার",
      arcade: "আর্কেড",
      strategy: "কৌশল",
      braintraining: "ব্রেইন ট্রেনিং",
      sports: "খেলাধুলা",
      ranking: "র‍্যাংকিং",
    },
    login: {
      title: "সাইন ইন",
      username: "ইউজারনেম",
      phoneNumber: "ফোন নম্বর লিখুন", 
      submit: "লগইন",
      forgot: "পাসওয়ার্ড ভুলে গেছেন?",
      noAccount: "অ্যাকাউন্ট নেই?",
      register: "এখানে রেজিস্টার করুন",
    },
    register: {
      title: "সাইন আপ করুন এবং খেলুন",
      username: "আপনার নাম",
      phoneNumber: "আপনার ফোন নম্বর",
      countryName: "দেশ",
      countryCode: "দেশের কোড",
      submit: "এখন শুরু করুন"
}

  },
};

// ✅ Safe helper: accepts anything, always returns a Dict
export function getDict(locale: unknown): Dict {
  return isLocale(locale) ? dict[locale] : dict.en;
}
