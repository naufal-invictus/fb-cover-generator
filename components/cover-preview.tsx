"use client"

import type React from "react"

import { forwardRef } from "react"
import type { UserData, SocialPlatform } from "@/lib/types"
import { socialPlatforms } from "@/lib/types"
import * as LucideIcons from "lucide-react"
import { motion } from "framer-motion"

interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  text: string
  accentText: string
  gradientAngle?: number
}

interface CoverPreviewProps {
  userData: UserData
  colorScheme: ColorScheme
  mode: "desktop" | "mobile"
  template: string
}

export const CoverPreview = forwardRef<HTMLDivElement, CoverPreviewProps>(function CoverPreview(
  { userData, colorScheme, mode, template },
  ref,
) {
  const width = mode === "desktop" ? 820 : 640
  const height = 360

  // Get platform details by ID
  const getPlatformById = (id: string): SocialPlatform => {
    return socialPlatforms.find((platform) => platform.id === id) || socialPlatforms[socialPlatforms.length - 1] // Default to "Other"
  }

  // Dynamically get the icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName]
    return IconComponent ? <IconComponent className="h-4 w-4" /> : <LucideIcons.Globe className="h-4 w-4" />
  }

  // Filter out social media entries with empty handles
  const validSocialMedia = userData.socialMedia.filter((social) => social.handle.trim() !== "")

  // Get active typologies
  const activeTypologies = Object.entries(userData.displayTypologies)
    .filter(([key, isActive]) => isActive)
    .map(([key]) => ({
      key,
      value: userData[`${key}Type` as keyof UserData] as string,
      name: key.charAt(0).toUpperCase() + key.slice(1),
    }))
    .filter((typology) => typology.value && typology.value.trim() !== "")

  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return renderMinimalTemplate()
      case "standard":
      default:
        return renderStandardTemplate()
    }
  }

  const renderMinimalTemplate = () => {
    return (
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top section - Name and MBTI only */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colorScheme.text }}>
              {userData.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-1 items-center">
              <div
                className="text-sm px-2 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: colorScheme.accent,
                  color: colorScheme.accentText,
                }}
              >
                {userData.mbtiType}
              </div>

              {/* Additional typologies */}
              {activeTypologies.map((typology) => (
                <motion.div
                  key={typology.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-2 py-0.5 rounded-full inline-block"
                  style={{
                    backgroundColor: `${colorScheme.accent}80`,
                    color: colorScheme.accentText,
                  }}
                >
                  {typology.value}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section - Quote only */}
        <div className="flex justify-between items-end">
          {/* Quote */}
          {userData.quote && (
            <div className="max-w-[80%] italic text-xl" style={{ color: colorScheme.text }}>
              "{userData.quote}"
            </div>
          )}

          {/* Social media - smaller and in corner */}
          {validSocialMedia.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-end max-w-[30%]">
              {validSocialMedia.map((social, index) => {
                const platform = getPlatformById(social.platform)
                const IconComponent = getIconComponent(platform.icon)

                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: platform.color,
                      color: "#ffffff",
                    }}
                  >
                    {IconComponent}
                    <span className="text-xs truncate max-w-[80px]">{social.handle}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderStandardTemplate = () => {
    return (
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top section */}
        <div className="flex justify-between items-start">
          {/* Profile picture and name */}
          <div className="flex items-center">
            {userData.profilePicture && (
              <div
                className="w-20 h-20 rounded-full overflow-hidden border-4 mr-4"
                style={{ borderColor: colorScheme.accent }}
              >
                <img
                  src={userData.profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: colorScheme.text }}>
                {userData.name || "Your Name"}
              </h1>
              <div className="flex flex-wrap gap-1 items-center">
                <div
                  className="text-sm px-2 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: colorScheme.accent,
                    color: colorScheme.accentText,
                  }}
                >
                  {userData.mbtiType}
                </div>

                {/* Additional typologies */}
                {activeTypologies.map((typology) => (
                  <motion.div
                    key={typology.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs px-2 py-0.5 rounded-full inline-block"
                    style={{
                      backgroundColor: `${colorScheme.accent}80`,
                      color: colorScheme.accentText,
                    }}
                  >
                    {typology.value}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Age and hobbies */}
          <div className="text-right" style={{ color: colorScheme.text }}>
            {userData.age && <div className="mb-1">{userData.age} years old</div>}
            {userData.hobbies && <div className="text-sm opacity-80">Hobbies: {userData.hobbies}</div>}
          </div>
        </div>

        {/* Middle section - Games */}
        {userData.games.some((game) => game.title || game.inGameId) && (
          <div
            className="my-4 p-4 rounded-lg"
            style={{
              backgroundColor: `${colorScheme.primary}80`,
              color: colorScheme.text,
            }}
          >
            <h2 className="text-lg font-semibold mb-2">Games I Play</h2>
            <div className="grid grid-cols-2 gap-2">
              {userData.games.map(
                (game, index) =>
                  (game.title || game.inGameId) && (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colorScheme.accent }} />
                      <div>
                        {game.title && <span className="font-medium">{game.title}</span>}
                        {game.title && game.inGameId && <span className="mx-1">•</span>}
                        {game.inGameId && <span className="opacity-80">{game.inGameId}</span>}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Bottom section */}
        <div className="flex justify-between items-end">
          {/* Quote */}
          {userData.quote && (
            <div className="max-w-[60%] italic" style={{ color: colorScheme.text }}>
              "{userData.quote}"
            </div>
          )}

          {/* Social media */}
          {validSocialMedia.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end max-w-[50%]">
              {validSocialMedia.map((social, index) => {
                const platform = getPlatformById(social.platform)
                const IconComponent = getIconComponent(platform.icon)

                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: platform.color,
                      color: "#ffffff",
                    }}
                  >
                    {IconComponent}
                    <span className="text-sm truncate max-w-[120px]">{social.handle}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Use a container with fixed dimensions for pixel-perfect rendering
  return (
    <div
      className="relative shadow-lg"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        ref={ref}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: `linear-gradient(${colorScheme.gradientAngle || 135}deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)`,
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0 ? colorScheme.accent : colorScheme.primary,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>

        {renderTemplate()}
      </div>
    </div>
  )
})
