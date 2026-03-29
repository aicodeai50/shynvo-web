export type LanguageCode =
  | "en"
  | "fr"
  | "es"
  | "de"
  | "ar"
  | "sw"
  | "no"
  | "pl"
  | "ru"
  | "fil"
  | "ti"
  | "so"
  | "hi"
  | "th"
  | "zh";

export const LANGUAGES: Array<{ code: LanguageCode; label: string }> = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "sw", label: "Kiswahili" },
  { code: "no", label: "Norsk" },
  { code: "pl", label: "Polski" },
  { code: "ru", label: "Русский" },
  { code: "fil", label: "Filipino" },
  { code: "ti", label: "ትግርኛ" },
  { code: "so", label: "Soomaali" },
  { code: "hi", label: "हिन्दी" },
  { code: "th", label: "ไทย" },
  { code: "zh", label: "中文" },
];

type Dict = Record<string, string>;
export const defaultLanguage: LanguageCode = "en";

export const translations: Partial<Record<LanguageCode, Dict>> = {
  en: {
    "nav.pricing": "Pricing",
    "nav.docs": "Docs",
    "nav.contact": "Contact",
    "nav.createAccount": "Create account",
    "nav.signIn": "Sign in",
    "nav.menu": "Menu",

    "lang.label": "Language",

    "common.loading": "Loading...",

    "search.label": "Search",
    "search.title": "Search",
    "search.prompt": "Search for environments, departments, or topics across Shynvo.",
    "search.button": "Search",
    "search.searching": "Searching Shynvo...",
    "search.placeholder": "Environment",
    "search.noResult": "No result returned.",
    "search.failed": "Search could not respond right now.",

    "auth.signIn.title": "Sign in",
    "auth.signUp.title": "Create account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.nameOptional": "Name (optional)",
    "auth.alreadyHave": "Already have an account?",

    "contact.title": "Contact",
    "contact.support": "For support or business inquiries:",
    "contact.email": "Email",

    "account.eyebrow": "Account",
    "account.title": "Your account",
    "account.subtitle": "Trial, plan, and AI access details for your Shynvo account.",
    "account.loading": "Loading account...",
    "account.notSignedIn": "You are not signed in.",
    "account.noProfile": "No profile found.",
    "account.email": "Email",
    "account.name": "Name",
    "account.language": "Language",
    "account.plan": "Plan",
    "account.trialEnds": "Trial ends",
    "account.aiUsedToday": "AI used today",
    "account.aiRemainingToday": "AI remaining today",
    "account.trial": "trial",
    "account.free": "free",
    "account.unlimitedTrial": "Unlimited during trial",
  },

  no: {
    "nav.pricing": "Priser",
    "nav.docs": "Dokumentasjon",
    "nav.contact": "Kontakt",
    "nav.createAccount": "Opprett konto",
    "nav.signIn": "Logg inn",
    "nav.menu": "Meny",

    "lang.label": "Språk",

    "common.loading": "Laster...",

    "search.label": "Søk",
    "search.title": "Søk",
    "search.prompt": "Søk etter miljøer, avdelinger eller temaer i Shynvo.",
    "search.button": "Søk",
    "search.searching": "Søker i Shynvo...",
    "search.placeholder": "Miljø",
    "search.noResult": "Ingen resultater ble returnert.",
    "search.failed": "Søket kunne ikke svare akkurat nå.",

    "auth.signIn.title": "Logg inn",
    "auth.signUp.title": "Opprett konto",
    "auth.email": "E-post",
    "auth.password": "Passord",
    "auth.nameOptional": "Navn (valgfritt)",
    "auth.alreadyHave": "Har du allerede en konto?",

    "contact.title": "Kontakt",
    "contact.support": "For støtte eller forretningshenvendelser:",
    "contact.email": "E-post",

    "account.eyebrow": "Konto",
    "account.title": "Din konto",
    "account.subtitle": "Prøveperiode, plan og AI-tilgang for Shynvo-kontoen din.",
    "account.loading": "Laster konto...",
    "account.notSignedIn": "Du er ikke logget inn.",
    "account.noProfile": "Ingen profil funnet.",
    "account.email": "E-post",
    "account.name": "Navn",
    "account.language": "Språk",
    "account.plan": "Plan",
    "account.trialEnds": "Prøveperioden slutter",
    "account.aiUsedToday": "AI brukt i dag",
    "account.aiRemainingToday": "AI igjen i dag",
    "account.trial": "prøveperiode",
    "account.free": "gratis",
    "account.unlimitedTrial": "Ubegrenset i prøveperioden",
  },

  es: {
    "nav.pricing": "Precios",
    "nav.docs": "Documentos",
    "nav.contact": "Contacto",
    "nav.createAccount": "Crear cuenta",
    "nav.signIn": "Iniciar sesión",
    "nav.menu": "Menú",

    "lang.label": "Idioma",

    "common.loading": "Cargando...",

    "search.label": "Buscar",
    "search.title": "Buscar",
    "search.prompt": "Busca entornos, departamentos o temas en Shynvo.",
    "search.button": "Buscar",
    "search.searching": "Buscando en Shynvo...",
    "search.placeholder": "Entorno",
    "search.noResult": "No se devolvió ningún resultado.",
    "search.failed": "La búsqueda no pudo responder en este momento.",

    "auth.signIn.title": "Iniciar sesión",
    "auth.signUp.title": "Crear cuenta",
    "auth.email": "Correo electrónico",
    "auth.password": "Contraseña",
    "auth.nameOptional": "Nombre (opcional)",
    "auth.alreadyHave": "¿Ya tienes una cuenta?",

    "contact.title": "Contacto",
    "contact.support": "Para soporte o consultas comerciales:",
    "contact.email": "Correo electrónico",

    "account.eyebrow": "Cuenta",
    "account.title": "Tu cuenta",
    "account.subtitle": "Detalles de prueba, plan y acceso de IA para tu cuenta de Shynvo.",
    "account.loading": "Cargando cuenta...",
    "account.notSignedIn": "No has iniciado sesión.",
    "account.noProfile": "No se encontró ningún perfil.",
    "account.email": "Correo electrónico",
    "account.name": "Nombre",
    "account.language": "Idioma",
    "account.plan": "Plan",
    "account.trialEnds": "La prueba termina",
    "account.aiUsedToday": "IA usada hoy",
    "account.aiRemainingToday": "IA restante hoy",
    "account.trial": "prueba",
    "account.free": "gratis",
    "account.unlimitedTrial": "Ilimitado durante la prueba",
  },

  fr: {
    "nav.pricing": "Tarifs",
    "nav.docs": "Docs",
    "nav.contact": "Contact",
    "nav.createAccount": "Créer un compte",
    "nav.signIn": "Se connecter",
    "nav.menu": "Menu",

    "lang.label": "Langue",

    "common.loading": "Chargement...",

    "search.label": "Recherche",
    "search.title": "Recherche",
    "search.prompt": "Recherchez des environnements, des départements ou des sujets dans Shynvo.",
    "search.button": "Rechercher",
    "search.searching": "Recherche dans Shynvo...",
    "search.placeholder": "Environnement",
    "search.noResult": "Aucun résultat renvoyé.",
    "search.failed": "La recherche ne peut pas répondre pour le moment.",

    "auth.signIn.title": "Se connecter",
    "auth.signUp.title": "Créer un compte",
    "auth.email": "E-mail",
    "auth.password": "Mot de passe",
    "auth.nameOptional": "Nom (optionnel)",
    "auth.alreadyHave": "Vous avez déjà un compte ?",

    "contact.title": "Contact",
    "contact.support": "Pour le support ou les demandes commerciales :",
    "contact.email": "E-mail",

    "account.eyebrow": "Compte",
    "account.title": "Votre compte",
    "account.subtitle": "Informations d’essai, d’abonnement et d’accès IA pour votre compte Shynvo.",
    "account.loading": "Chargement du compte...",
    "account.notSignedIn": "Vous n’êtes pas connecté.",
    "account.noProfile": "Aucun profil trouvé.",
    "account.email": "E-mail",
    "account.name": "Nom",
    "account.language": "Langue",
    "account.plan": "Abonnement",
    "account.trialEnds": "Fin de l’essai",
    "account.aiUsedToday": "IA utilisée aujourd’hui",
    "account.aiRemainingToday": "IA restante aujourd’hui",
    "account.trial": "essai",
    "account.free": "gratuit",
    "account.unlimitedTrial": "Illimité pendant l’essai",
  },

  ar: {
    "nav.pricing": "الأسعار",
    "nav.docs": "الوثائق",
    "nav.contact": "اتصال",
    "nav.createAccount": "إنشاء حساب",
    "nav.signIn": "تسجيل الدخول",
    "nav.menu": "القائمة",

    "lang.label": "اللغة",

    "common.loading": "جارٍ التحميل...",

    "search.label": "بحث",
    "search.title": "بحث",
    "search.prompt": "ابحث عن البيئات أو الأقسام أو المواضيع داخل Shynvo.",
    "search.button": "بحث",
    "search.searching": "جارٍ البحث في Shynvo...",
    "search.placeholder": "البيئة",
    "search.noResult": "لم يتم العثور على نتيجة.",
    "search.failed": "تعذر على البحث الاستجابة الآن.",

    "auth.signIn.title": "تسجيل الدخول",
    "auth.signUp.title": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.nameOptional": "الاسم (اختياري)",
    "auth.alreadyHave": "هل لديك حساب بالفعل؟",

    "contact.title": "اتصال",
    "contact.support": "للدعم أو الاستفسارات التجارية:",
    "contact.email": "البريد الإلكتروني",

    "account.eyebrow": "الحساب",
    "account.title": "حسابك",
    "account.subtitle": "تفاصيل التجربة والخطة والوصول إلى الذكاء الاصطناعي لحسابك في Shynvo.",
    "account.loading": "جارٍ تحميل الحساب...",
    "account.notSignedIn": "أنت غير مسجل الدخول.",
    "account.noProfile": "لم يتم العثور على ملف شخصي.",
    "account.email": "البريد الإلكتروني",
    "account.name": "الاسم",
    "account.language": "اللغة",
    "account.plan": "الخطة",
    "account.trialEnds": "تنتهي التجربة",
    "account.aiUsedToday": "استخدام الذكاء الاصطناعي اليوم",
    "account.aiRemainingToday": "الذكاء الاصطناعي المتبقي اليوم",
    "account.trial": "تجربة",
    "account.free": "مجاني",
    "account.unlimitedTrial": "غير محدود أثناء التجربة",
  },

  sw: {
    "nav.pricing": "Bei",
    "nav.docs": "Nyaraka",
    "nav.contact": "Mawasiliano",
    "nav.createAccount": "Fungua akaunti",
    "nav.signIn": "Ingia",
    "nav.menu": "Menyu",

    "lang.label": "Lugha",

    "common.loading": "Inapakia...",

    "search.label": "Tafuta",
    "search.title": "Tafuta",
    "search.prompt": "Tafuta mazingira, idara, au mada ndani ya Shynvo.",
    "search.button": "Tafuta",
    "search.searching": "Inatafuta Shynvo...",
    "search.placeholder": "Mazingira",
    "search.noResult": "Hakuna matokeo yaliyorejeshwa.",
    "search.failed": "Utafutaji haukuweza kujibu sasa hivi.",

    "auth.signIn.title": "Ingia",
    "auth.signUp.title": "Fungua akaunti",
    "auth.email": "Barua pepe",
    "auth.password": "Nenosiri",
    "auth.nameOptional": "Jina (si lazima)",
    "auth.alreadyHave": "Tayari una akaunti?",

    "contact.title": "Mawasiliano",
    "contact.support": "Kwa msaada au maswali ya biashara:",
    "contact.email": "Barua pepe",

    "account.eyebrow": "Akaunti",
    "account.title": "Akaunti yako",
    "account.subtitle": "Maelezo ya majaribio, mpango, na upatikanaji wa AI kwa akaunti yako ya Shynvo.",
    "account.loading": "Inapakia akaunti...",
    "account.notSignedIn": "Hujaingia.",
    "account.noProfile": "Hakuna wasifu uliopatikana.",
    "account.email": "Barua pepe",
    "account.name": "Jina",
    "account.language": "Lugha",
    "account.plan": "Mpango",
    "account.trialEnds": "Jaribio linaisha",
    "account.aiUsedToday": "AI iliyotumika leo",
    "account.aiRemainingToday": "AI iliyobaki leo",
    "account.trial": "jaribio",
    "account.free": "bure",
    "account.unlimitedTrial": "Bila kikomo wakati wa jaribio",
  },

  de: {
    "nav.pricing": "Preise",
    "nav.docs": "Dokumente",
    "nav.contact": "Kontakt",
    "nav.createAccount": "Konto erstellen",
    "nav.signIn": "Anmelden",
    "nav.menu": "Menü",
    "lang.label": "Sprache",
    "search.label": "Suche",
  },

  pl: {
    "nav.pricing": "Cennik",
    "nav.docs": "Dokumenty",
    "nav.contact": "Kontakt",
    "nav.createAccount": "Utwórz konto",
    "nav.signIn": "Zaloguj się",
    "nav.menu": "Menu",
    "lang.label": "Język",
    "search.label": "Szukaj",
  },

  ru: {
    "nav.pricing": "Цены",
    "nav.docs": "Документы",
    "nav.contact": "Контакт",
    "nav.createAccount": "Создать аккаунт",
    "nav.signIn": "Войти",
    "nav.menu": "Меню",
    "lang.label": "Язык",
    "search.label": "Поиск",
  },

  fil: {
    "nav.pricing": "Presyo",
    "nav.docs": "Docs",
    "nav.contact": "Contact",
    "nav.createAccount": "Gumawa ng account",
    "nav.signIn": "Mag-sign in",
    "nav.menu": "Menu",
    "lang.label": "Wika",
    "search.label": "Search",
  },

  ti: {
    "nav.pricing": "ዋጋ",
    "nav.docs": "ሰነዳት",
    "nav.contact": "ርክብ",
    "nav.createAccount": "ኣካውንት ፍጠር",
    "nav.signIn": "እቶ",
    "nav.menu": "ሜኑ",
    "lang.label": "ቋንቋ",
    "search.label": "ፈልግ",
  },

  so: {
    "nav.pricing": "Qiimeyn",
    "nav.docs": "Dukumentiyo",
    "nav.contact": "La xiriir",
    "nav.createAccount": "Samee akoon",
    "nav.signIn": "Soo gal",
    "nav.menu": "Menu",
    "lang.label": "Luqad",
    "search.label": "Raadi",
  },

  hi: {
    "nav.pricing": "मूल्य",
    "nav.docs": "दस्तावेज़",
    "nav.contact": "संपर्क",
    "nav.createAccount": "खाता बनाएं",
    "nav.signIn": "साइन इन",
    "nav.menu": "मेनू",
    "lang.label": "भाषा",
    "search.label": "खोजें",
  },

  th: {
    "nav.pricing": "ราคา",
    "nav.docs": "เอกสาร",
    "nav.contact": "ติดต่อ",
    "nav.createAccount": "สร้างบัญชี",
    "nav.signIn": "เข้าสู่ระบบ",
    "nav.menu": "เมนู",
    "lang.label": "ภาษา",
    "search.label": "ค้นหา",
  },

  zh: {
    "nav.pricing": "价格",
    "nav.docs": "文档",
    "nav.contact": "联系",
    "nav.createAccount": "创建账户",
    "nav.signIn": "登录",
    "nav.menu": "菜单",
    "lang.label": "语言",
    "search.label": "搜索",
  },
};

export function t(lang: LanguageCode, key: string): string {
  return translations[lang]?.[key] || translations.en?.[key] || key;
}
