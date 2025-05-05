"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { socialPlatforms } from "@/lib/types"
import * as LucideIcons from "lucide-react"

interface SocialMediaInputProps {
  socialMedia: Array<{
    platform: string
    handle: string
  }>
  onChange: (socialMedia: Array<{ platform: string; handle: string }>) => void
}

export function SocialMediaInput({ socialMedia, onChange }: SocialMediaInputProps) {
  const handleSocialMediaChange = (index: number, field: "platform" | "handle", value: string) => {
    const updatedSocialMedia = [...socialMedia]
    updatedSocialMedia[index] = { ...updatedSocialMedia[index], [field]: value }
    onChange(updatedSocialMedia)
  }

  const addSocialMedia = () => {
    if (socialMedia.length >= 2) return
    onChange([...socialMedia, { platform: "instagram", handle: "" }])
  }

  const removeSocialMedia = (index: number) => {
    const updatedSocialMedia = socialMedia.filter((_, i) => i !== index)
    onChange(updatedSocialMedia)
  }

  // Dynamically get the icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName]
    return IconComponent ? <IconComponent className="h-4 w-4" /> : <LucideIcons.Globe className="h-4 w-4" />
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {socialMedia.map((social, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 mb-2"
          >
            <Select
              value={social.platform}
              onValueChange={(value) => handleSocialMediaChange(index, "platform", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {socialPlatforms.map((platform) => {
                  const IconComponent = getIconComponent(platform.icon)
                  return (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center gap-2">
                        <span style={{ color: platform.color }}>{IconComponent}</span>
                        {platform.name}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Input
              value={social.handle}
              onChange={(e) => handleSocialMediaChange(index, "handle", e.target.value)}
              placeholder="Username or handle"
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={() => removeSocialMedia(index)}>
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        size="sm"
        onClick={addSocialMedia}
        className="w-full mt-2"
        disabled={socialMedia.length >= 2}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Social Media {socialMedia.length}/2
      </Button>
    </div>
  )
}
