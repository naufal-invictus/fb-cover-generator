"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export interface Template {
  id: string
  name: string
  description: string
}

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

export function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Cover Template</h3>
      <RadioGroup
        value={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={`template-${template.id}`} className="peer sr-only" />
            <Label
              htmlFor={`template-${template.id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <Card className="w-full border-0 shadow-none">
                <CardContent className="p-4">
                  <div className="font-medium text-center mb-2">{template.name}</div>
                  <p className="text-sm text-gray-500 text-center">{template.description}</p>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
