export interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  text: string
  accentText: string
}

export interface MbtiGroup {
  name: string
  types: string[]
  description: string
  gradients: {
    primary: string
    secondary: string
    accent: string
  }[]
}

export const mbtiTypes = [
  "INFJ",
  "INFP",
  "INTJ",
  "INTP",
  "ISFJ",
  "ISFP",
  "ISTJ",
  "ISTP",
  "ENFJ",
  "ENFP",
  "ENTJ",
  "ENTP",
  "ESFJ",
  "ESFP",
  "ESTJ",
  "ESTP",
]

// MBTI Groups with psychological principles
export const mbtiGroups: MbtiGroup[] = [
  {
    name: "Sentinel",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
    description: "Clean, trustworthy blue gradients",
    gradients: [
      {
        primary: "#0d47a1", // Deep blue
        secondary: "#1976d2", // Blue
        accent: "#42a5f5", // Light blue
      },
      {
        primary: "#01579b", // Light blue
        secondary: "#0288d1", // Blue
        accent: "#29b6f6", // Light blue
      },
      {
        primary: "#0277bd", // Light blue
        secondary: "#039be5", // Blue
        accent: "#4fc3f7", // Light blue
      },
    ],
  },
  {
    name: "Explorer",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
    description: "Energetic orange-yellow gradients",
    gradients: [
      {
        primary: "#e65100", // Deep orange
        secondary: "#ff9800", // Orange
        accent: "#ffb74d", // Light orange
      },
      {
        primary: "#ff6f00", // Amber
        secondary: "#ffc107", // Amber
        accent: "#ffca28", // Light amber
      },
      {
        primary: "#f57c00", // Orange
        secondary: "#ff9800", // Orange
        accent: "#ffb74d", // Light orange
      },
    ],
  },
  {
    name: "Diplomat",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
    description: "Harmonious green to teal gradients",
    gradients: [
      {
        primary: "#00695c", // Teal
        secondary: "#00897b", // Teal
        accent: "#4db6ac", // Light teal
      },
      {
        primary: "#2e7d32", // Green
        secondary: "#43a047", // Green
        accent: "#66bb6a", // Light green
      },
      {
        primary: "#00796b", // Teal
        secondary: "#009688", // Teal
        accent: "#4db6ac", // Light teal
      },
    ],
  },
  {
    name: "Analyst",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
    description: "Deep-thinking purple to indigo gradients",
    gradients: [
      {
        primary: "#4a148c", // Deep purple
        secondary: "#7b1fa2", // Purple
        accent: "#ab47bc", // Light purple
      },
      {
        primary: "#1a237e", // Indigo
        secondary: "#303f9f", // Indigo
        accent: "#5c6bc0", // Light indigo
      },
      {
        primary: "#311b92", // Deep purple
        secondary: "#512da8", // Deep purple
        accent: "#7e57c2", // Light purple
      },
    ],
  },
]

// Get MBTI group by type
export function getMbtiGroup(mbtiType: string): MbtiGroup | undefined {
  return mbtiGroups.find((group) => group.types.includes(mbtiType))
}

// Get random gradient from MBTI group
export function getRandomGradientFromGroup(mbtiType: string): {
  primary: string
  secondary: string
  accent: string
} {
  const group = getMbtiGroup(mbtiType)
  if (!group) return mbtiColorSchemes[mbtiType] || mbtiColorSchemes.INFJ

  const randomIndex = Math.floor(Math.random() * group.gradients.length)
  return group.gradients[randomIndex]
}

export const mbtiColorSchemes: Record<string, ColorScheme> = {
  // Analysts (NT)
  INTJ: {
    primary: "#1a237e", // Deep blue
    secondary: "#311b92", // Deep purple
    accent: "#00bcd4", // Cyan
    text: "#ffffff",
    accentText: "#000000",
  },
  INTP: {
    primary: "#263238", // Blue grey
    secondary: "#004d40", // Teal
    accent: "#4dd0e1", // Light cyan
    text: "#ffffff",
    accentText: "#000000",
  },
  ENTJ: {
    primary: "#b71c1c", // Deep red
    secondary: "#880e4f", // Deep pink
    accent: "#ffc107", // Amber
    text: "#ffffff",
    accentText: "#000000",
  },
  ENTP: {
    primary: "#4a148c", // Purple
    secondary: "#1a237e", // Deep blue
    accent: "#ffeb3b", // Yellow
    text: "#ffffff",
    accentText: "#000000",
  },

  // Diplomats (NF)
  INFJ: {
    primary: "#4a148c", // Purple
    secondary: "#006064", // Cyan
    accent: "#e91e63", // Pink
    text: "#ffffff",
    accentText: "#ffffff",
  },
  INFP: {
    primary: "#6a1b9a", // Purple
    secondary: "#ad1457", // Pink
    accent: "#64ffda", // Teal accent
    text: "#ffffff",
    accentText: "#000000",
  },
  ENFJ: {
    primary: "#ad1457", // Pink
    secondary: "#4a148c", // Purple
    accent: "#00bcd4", // Cyan
    text: "#ffffff",
    accentText: "#000000",
  },
  ENFP: {
    primary: "#ff9800", // Orange
    secondary: "#ff5722", // Deep orange
    accent: "#e91e63", // Pink
    text: "#ffffff",
    accentText: "#ffffff",
  },

  // Sentinels (SJ)
  ISTJ: {
    primary: "#212121", // Grey
    secondary: "#263238", // Blue grey
    accent: "#0d47a1", // Blue
    text: "#ffffff",
    accentText: "#ffffff",
  },
  ISFJ: {
    primary: "#5d4037", // Brown
    secondary: "#3e2723", // Deep brown
    accent: "#8bc34a", // Light green
    text: "#ffffff",
    accentText: "#000000",
  },
  ESTJ: {
    primary: "#0d47a1", // Blue
    secondary: "#01579b", // Light blue
    accent: "#ffc107", // Amber
    text: "#ffffff",
    accentText: "#000000",
  },
  ESFJ: {
    primary: "#689f38", // Light green
    secondary: "#33691e", // Green
    accent: "#ff9800", // Orange
    text: "#ffffff",
    accentText: "#000000",
  },

  // Explorers (SP)
  ISTP: {
    primary: "#37474f", // Blue grey
    secondary: "#263238", // Dark blue grey
    accent: "#ff5722", // Deep orange
    text: "#ffffff",
    accentText: "#ffffff",
  },
  ISFP: {
    primary: "#ad1457", // Pink
    secondary: "#880e4f", // Deep pink
    accent: "#ffc107", // Amber
    text: "#ffffff",
    accentText: "#000000",
  },
  ESTP: {
    primary: "#bf360c", // Deep orange
    secondary: "#b71c1c", // Red
    accent: "#ffeb3b", // Yellow
    text: "#ffffff",
    accentText: "#000000",
  },
  ESFP: {
    primary: "#ff5722", // Deep orange
    secondary: "#ff9800", // Orange
    accent: "#e91e63", // Pink
    text: "#ffffff",
    accentText: "#ffffff",
  },
}
