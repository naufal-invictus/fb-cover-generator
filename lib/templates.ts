export interface CoverTemplate {
  id: string
  name: string
  description: string
  preview: string
}

export const coverTemplates: CoverTemplate[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Classic layout with profile info and games",
    preview: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, minimalist design focusing on your name and personality type",
    preview: "/placeholder.svg?height=100&width=200",
  },
]
