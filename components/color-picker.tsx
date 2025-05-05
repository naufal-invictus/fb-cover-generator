"use client"

import { useState, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"

interface ColorPickerProps {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  onChange: (colors: { primary: string; secondary: string; accent: string }) => void
}

export function ColorPicker({ primaryColor, secondaryColor, accentColor, onChange }: ColorPickerProps) {
  const [primary, setPrimary] = useState(primaryColor)
  const [secondary, setSecondary] = useState(secondaryColor)
  const [accent, setAccent] = useState(accentColor)
  const [gradientAngle, setGradientAngle] = useState(135)
  const [activeTab, setActiveTab] = useState("primary")

  useEffect(() => {
    setPrimary(primaryColor || "#4a148c")
    setSecondary(secondaryColor || "#006064")
    setAccent(accentColor || "#e91e63")
  }, [primaryColor, secondaryColor, accentColor])

  const handlePrimaryChange = (color: string) => {
    if (!color) return
    setPrimary(color)
    onChange({ primary: color, secondary, accent })
  }

  const handleSecondaryChange = (color: string) => {
    if (!color) return
    setSecondary(color)
    onChange({ primary, secondary: color, accent })
  }

  const handleAccentChange = (color: string) => {
    if (!color) return
    setAccent(color)
    onChange({ primary, secondary, accent: color })
  }

  const handleGradientAngleChange = (value: number[]) => {
    setGradientAngle(value[0])
  }

  const gradientPreviewStyle = {
    background: `linear-gradient(${gradientAngle}deg, ${primary || "#4a148c"} 0%, ${secondary || "#006064"} 100%)`,
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Label>Gradient Angle</Label>
          <span className="text-sm text-gray-500">{gradientAngle}°</span>
        </div>
        <Slider
          value={[gradientAngle]}
          min={0}
          max={360}
          step={1}
          onValueChange={handleGradientAngleChange}
          className="mb-4"
        />

        <motion.div
          className="h-24 rounded-lg shadow-md mb-4"
          style={gradientPreviewStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
            <TabsTrigger value="accent">Accent</TabsTrigger>
          </TabsList>

          <TabsContent value="primary" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: primary }} />
              <Input value={primary} onChange={(e) => handlePrimaryChange(e.target.value)} className="font-mono" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  Choose Primary Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <HexColorPicker color={primary} onChange={handlePrimaryChange} />
              </PopoverContent>
            </Popover>
          </TabsContent>

          <TabsContent value="secondary" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: secondary }} />
              <Input value={secondary} onChange={(e) => handleSecondaryChange(e.target.value)} className="font-mono" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  Choose Secondary Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <HexColorPicker color={secondary} onChange={handleSecondaryChange} />
              </PopoverContent>
            </Popover>
          </TabsContent>

          <TabsContent value="accent" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: accent }} />
              <Input value={accent} onChange={(e) => handleAccentChange(e.target.value)} className="font-mono" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  Choose Accent Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <HexColorPicker color={accent} onChange={handleAccentChange} />
              </PopoverContent>
            </Popover>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
