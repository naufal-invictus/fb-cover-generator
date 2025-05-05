export interface UserData {
  name: string
  mbtiType: string
  enneagramType: string
  attitudinalPsycheType: string
  socionicsType: string
  temperamentType: string
  games: Array<{
    title: string
    inGameId: string
  }>
  age: string
  hobbies: string
  socialMedia: Array<{
    platform: string
    handle: string
  }>
  quote: string
  profilePicture: string | null
  useCustomColors: boolean
  customColors: {
    primary: string
    secondary: string
    accent: string
    gradientAngle: number
  }
  displayTypologies: {
    enneagram: boolean
    socionics: boolean
    temperament: boolean
  }
}

export interface SocialPlatform {
  id: string
  name: string
  icon: string
  color: string
}

export const socialPlatforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", icon: "Instagram", color: "#E1306C" },
  { id: "tiktok", name: "TikTok", icon: "Music", color: "#000000" },
  { id: "twitter", name: "Twitter/X", icon: "Twitter", color: "#1DA1F2" },
  { id: "youtube", name: "YouTube", icon: "Youtube", color: "#FF0000" },
  { id: "twitch", name: "Twitch", icon: "Twitch", color: "#6441A4" },
  { id: "discord", name: "Discord", icon: "MessageSquare", color: "#5865F2" },
  { id: "kick", name: "Kick", icon: "Zap", color: "#53FC18" },
  { id: "facebook", name: "Facebook", icon: "Facebook", color: "#1877F2" },
  { id: "linkedin", name: "LinkedIn", icon: "Linkedin", color: "#0A66C2" },
  { id: "github", name: "GitHub", icon: "Github", color: "#333333" },
  { id: "reddit", name: "Reddit", icon: "SquareAsterisk", color: "#FF4500" },
  { id: "pinterest", name: "Pinterest", icon: "Pin", color: "#E60023" },
  { id: "snapchat", name: "Snapchat", icon: "Ghost", color: "#FFFC00" },
  { id: "other", name: "Other", icon: "Globe", color: "#718096" },
]

// Personality typology options
export const enneagramTypes = [
  "1w9",
  "1w2",
  "2w1",
  "2w3",
  "3w2",
  "3w4",
  "4w3",
  "4w5",
  "5w4",
  "5w6",
  "6w5",
  "6w7",
  "7w6",
  "7w8",
  "8w7",
  "8w9",
  "9w8",
  "9w1",
]

export const attitudinalPsycheTypes = [
  "VLFE",
  "VFEL",
  "VELF",
  "VEFL",
  "VFLE",
  "VFEL",
  "LVFE",
  "LVEF",
  "LFVE",
  "LFEV",
  "LEVF",
  "LEFV",
  "FLVE",
  "FLEV",
  "FVLE",
  "FVEL",
  "FELV",
  "FEVL",
  "ELFV",
  "ELVF",
  "EFLV",
  "EFVL",
  "EVLF",
  "EVFL",
]

export const socionicsTypes = [
  "ILE",
  "SEI",
  "ESE",
  "LII",
  "EIE",
  "LSI",
  "SLE",
  "IEI",
  "SEE",
  "ILI",
  "LIE",
  "ESI",
  "IEE",
  "SLI",
  "LSE",
  "EII",
]

export const temperamentTypes = [
  "Sanguine",
  "Choleric",
  "Melancholic",
  "Phlegmatic",
  "Sanguine-Choleric",
  "Sanguine-Melancholic",
  "Sanguine-Phlegmatic",
  "Choleric-Sanguine",
  "Choleric-Melancholic",
  "Choleric-Phlegmatic",
  "Melancholic-Sanguine",
  "Melancholic-Choleric",
  "Melancholic-Phlegmatic",
  "Phlegmatic-Sanguine",
  "Phlegmatic-Choleric",
  "Phlegmatic-Melancholic",
]

export interface TypologyInfo {
  name: string
  description: string
  options: string[]
}

export const typologies: Record<string, TypologyInfo> = {
  enneagram: {
    name: "Enneagram",
    description:
      "A system of personality typing that describes patterns in how people interpret the world and manage their emotions",
    options: enneagramTypes,
  },
  attitudinalPsyche: {
    name: "Attitudinal Psyche",
    description: "A personality system based on how people process and prioritize information",
    options: attitudinalPsycheTypes,
  },
  socionics: {
    name: "Socionics",
    description:
      "A theory of personality that incorporates Jung's psychological types with Antoni Kępiński's theory of information metabolism",
    options: socionicsTypes,
  },
  temperament: {
    name: "Temperament",
    description:
      "The Four Temperaments theory classifies personalities based on traits like sociability, emotionality, and impulsivity",
    options: temperamentTypes,
  },
}
