"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toPng } from "html-to-image"
import { UserForm } from "./user-form"
import { CoverPreview } from "./cover-preview"
import { mbtiColorSchemes, getRandomGradientFromGroup } from "@/lib/mbti-colors"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "./color-picker"
import { MbtiGroupInfo } from "./mbti-group-info"
import { TemplateSelector } from "./template-selector"
import { useToast } from "./toast-provider"
import type { UserData } from "@/lib/types"

export function CoverGenerator() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    mbtiType: "INFJ",
    enneagramType: "4w5",
    attitudinalPsycheType: "VLFE",
    socionicsType: "IEI",
    temperamentType: "Melancholic-Phlegmatic",
    games: [{ title: "", inGameId: "" }],
    age: "",
    hobbies: "",
    socialMedia: [{ platform: "instagram", handle: "" }],
    quote: "",
    profilePicture: null,
    useCustomColors: false,
    customColors: {
      primary: "#4a148c",
      secondary: "#006064",
      accent: "#e91e63",
      gradientAngle: 135,
    },
    displayTypologies: {
      enneagram: false,
      socionics: false,
      temperament: false,
    },
  })

  const [coverMode, setCoverMode] = useState<"desktop" | "mobile">("desktop")
  const coverRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [previewScale, setPreviewScale] = useState(1)
  const previewContainerRef = useRef<HTMLDivElement>(null)

  const { addToast } = useToast()

  const templates = [
    {
      id: "standard",
      name: "Standard",
      description: "Classic layout with profile info and games",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean layout with minimal elements",
    },
  ]

  const [selectedTemplate, setSelectedTemplate] = useState("standard")

  // Calculate and update preview scale based on container width
  useEffect(() => {
    const updatePreviewScale = () => {
      if (!previewContainerRef.current) return

      const containerWidth = previewContainerRef.current.clientWidth
      const originalWidth = coverMode === "desktop" ? 820 : 640

      // Calculate scale but don't go above 1 (original size)
      const newScale = Math.min(containerWidth / originalWidth, 1)
      setPreviewScale(newScale)
    }

    // Initial calculation
    updatePreviewScale()

    // Update on window resize
    window.addEventListener("resize", updatePreviewScale)
    return () => window.removeEventListener("resize", updatePreviewScale)
  }, [coverMode, previewContainerRef])

  // Get color scheme based on MBTI or custom colors
  const getColorScheme = () => {
    if (userData.useCustomColors) {
      return {
        primary: userData.customColors.primary,
        secondary: userData.customColors.secondary,
        accent: userData.customColors.accent,
        text: "#ffffff",
        accentText: "#ffffff",
        gradientAngle: userData.customColors.gradientAngle,
      }
    } else {
      const mbtiGradient = getRandomGradientFromGroup(userData.mbtiType)
      const baseScheme = mbtiColorSchemes[userData.mbtiType] || mbtiColorSchemes.INFJ

      return {
        primary: mbtiGradient.primary,
        secondary: mbtiGradient.secondary,
        accent: mbtiGradient.accent,
        text: baseScheme.text,
        accentText: baseScheme.accentText,
        gradientAngle: 135,
      }
    }
  }

  const colorScheme = getColorScheme()

  const handleUserDataChange = (newData: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...newData }))
  }

  const handleCustomColorsChange = (colors: { primary: string; secondary: string; accent: string }) => {
    setUserData((prev) => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        ...colors,
      },
    }))
  }

  const exportCover = async () => {
    if (!coverRef.current) return

    try {
      setIsExporting(true)
      addToast("Preparing high-resolution export...", "info")

      // Always export at full resolution regardless of preview scale
      const dataUrl = await toPng(coverRef.current, {
        quality: 1.0, // Maximum quality
        width: coverMode === "desktop" ? 820 : 640,
        height: 360,
        pixelRatio: 2, // Higher pixel ratio for better quality
        skipAutoScale: true, // Don't let the library auto-scale
      })

      const link = document.createElement("a")
      link.download = `facebook-cover-${userData.name || "untitled"}.png`
      link.href = dataUrl
      link.click()

      addToast("Export complete! If download doesn't start, try taking a screenshot.", "success")
    } catch (error) {
      console.error("Error exporting cover:", error)
      addToast("There was an error exporting your cover. Please try taking a screenshot instead.", "error")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
        <UserForm userData={userData} onChange={handleUserDataChange} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Cover Preview</h2>
          <Tabs value={coverMode} onValueChange={(value) => setCoverMode(value as "desktop" | "mobile")}>
            <TabsList>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-6">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="custom-colors"
                checked={userData.useCustomColors}
                onCheckedChange={(checked) => handleUserDataChange({ useCustomColors: checked })}
              />
              <Label htmlFor="custom-colors">Use Custom Colors</Label>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {userData.useCustomColors ? (
              <motion.div
                key="color-picker"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ColorPicker
                  primaryColor={userData.customColors.primary}
                  secondaryColor={userData.customColors.secondary}
                  accentColor={userData.customColors.accent}
                  onChange={handleCustomColorsChange}
                />
              </motion.div>
            ) : (
              <motion.div
                key="mbti-info"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MbtiGroupInfo mbtiType={userData.mbtiType} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-6 overflow-hidden">
          <div ref={previewContainerRef} className="w-full">
            <div className="preview-container">
              <div
                className="preview-scaling-wrapper"
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                  width: coverMode === "desktop" ? "820px" : "640px",
                  height: "360px",
                }}
              >
                <CoverPreview
                  ref={coverRef}
                  userData={userData}
                  colorScheme={colorScheme}
                  mode={coverMode}
                  template={selectedTemplate}
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Preview scaled to {Math.round(previewScale * 100)}% - Export will be full resolution
            </div>
          </div>
        </div>

        <Button onClick={exportCover} disabled={isExporting} className="w-full">
          {isExporting ? "Exporting High Resolution..." : "Export as PNG"}
        </Button>
      </motion.div>
    </div>
  )
}
