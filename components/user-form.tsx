"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { UserData } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Upload } from "lucide-react"
import { mbtiTypes } from "@/lib/mbti-colors"
import { SocialMediaInput } from "./social-media-input"
import { Switch } from "@/components/ui/switch"

interface UserFormProps {
  userData: UserData
  onChange: (data: Partial<UserData>) => void
}

export function UserForm({ userData, onChange }: UserFormProps) {
  const [dragActive, setDragActive] = useState(false)
  const [typologyOpen, setTypologyOpen] = useState(false)

  const handleGameChange = (index: number, field: "title" | "inGameId", value: string) => {
    const updatedGames = [...userData.games]
    updatedGames[index] = { ...updatedGames[index], [field]: value }
    onChange({ games: updatedGames })
  }

  const addGame = () => {
    if (userData.games.length >= 4) return
    onChange({ games: [...userData.games, { title: "", inGameId: "" }] })
  }

  const removeGame = (index: number) => {
    const updatedGames = userData.games.filter((_, i) => i !== index)
    onChange({ games: updatedGames })
  }

  const handleSocialMediaChange = (socialMedia: Array<{ platform: string; handle: string }>) => {
    onChange({ socialMedia })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onChange({ profilePicture: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        onChange({ profilePicture: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Facebook Name</Label>
          <Input
            id="name"
            value={userData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your Facebook name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mbti">MBTI Personality Type</Label>
          <Select value={userData.mbtiType} onValueChange={(value) => onChange({ mbtiType: value })}>
            <SelectTrigger id="mbti">
              <SelectValue placeholder="Select MBTI Type" />
            </SelectTrigger>
            <SelectContent>
              {mbtiTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Additional Personality Types (Optional)</h3>
        <p className="text-sm text-gray-500">Add up to 3 additional personality types to display on your cover.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Enneagram */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="enneagram-type">Enneagram</Label>
              <Switch
                id="display-enneagram"
                checked={userData.displayTypologies.enneagram}
                onCheckedChange={(checked) =>
                  onChange({
                    displayTypologies: {
                      ...userData.displayTypologies,
                      enneagram: checked,
                    },
                  })
                }
              />
            </div>
            <Input
              id="enneagram-type"
              value={userData.enneagramType}
              onChange={(e) => onChange({ enneagramType: e.target.value })}
              placeholder="e.g., 4w5, 9w1"
              disabled={!userData.displayTypologies.enneagram}
            />
          </div>

          {/* Socionics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="socionics-type">Socionics</Label>
              <Switch
                id="display-socionics"
                checked={userData.displayTypologies.socionics}
                onCheckedChange={(checked) =>
                  onChange({
                    displayTypologies: {
                      ...userData.displayTypologies,
                      socionics: checked,
                    },
                  })
                }
              />
            </div>
            <Input
              id="socionics-type"
              value={userData.socionicsType}
              onChange={(e) => onChange({ socionicsType: e.target.value })}
              placeholder="e.g., IEI, LSI"
              disabled={!userData.displayTypologies.socionics}
            />
          </div>

          {/* Temperament */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperament-type">Temperament</Label>
              <Switch
                id="display-temperament"
                checked={userData.displayTypologies.temperament}
                onCheckedChange={(checked) =>
                  onChange({
                    displayTypologies: {
                      ...userData.displayTypologies,
                      temperament: checked,
                    },
                  })
                }
              />
            </div>
            <Input
              id="temperament-type"
              value={userData.temperamentType}
              onChange={(e) => onChange({ temperamentType: e.target.value })}
              placeholder="e.g., Melancholic"
              disabled={!userData.displayTypologies.temperament}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Games You Play</Label>
        <AnimatePresence>
          {userData.games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 mb-2"
            >
              <Input
                value={game.title}
                onChange={(e) => handleGameChange(index, "title", e.target.value)}
                placeholder="Game title"
                className="flex-1"
              />
              <Input
                value={game.inGameId}
                onChange={(e) => handleGameChange(index, "inGameId", e.target.value)}
                placeholder="In-game ID"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeGame(index)}
                disabled={userData.games.length <= 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          size="sm"
          onClick={addGame}
          className="w-full mt-2"
          disabled={userData.games.length >= 4}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Game {userData.games.length}/4
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age (Optional)</Label>
          <Input
            id="age"
            value={userData.age}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="Your age"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hobbies">Hobbies</Label>
          <Input
            id="hobbies"
            value={userData.hobbies}
            onChange={(e) => onChange({ hobbies: e.target.value })}
            placeholder="Your hobbies (comma separated)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Social Media Accounts</Label>
        <SocialMediaInput socialMedia={userData.socialMedia} onChange={handleSocialMediaChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Personal Quote or Motto</Label>
        <Textarea
          id="quote"
          value={userData.quote}
          onChange={(e) => onChange({ quote: e.target.value })}
          placeholder="Your personal quote or motto"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {userData.profilePicture ? (
            <div className="flex flex-col items-center">
              <img
                src={userData.profilePicture || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
              <Button variant="outline" size="sm" onClick={() => onChange({ profilePicture: null })}>
                Remove
              </Button>
            </div>
          ) : (
            <div className="py-4">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Drag and drop your profile picture here</p>
              <p className="text-xs text-gray-400 mb-2">or</p>
              <Button variant="outline" size="sm" asChild>
                <label>
                  Browse Files
                  <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
