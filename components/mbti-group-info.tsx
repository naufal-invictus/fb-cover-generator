import { getMbtiGroup } from "@/lib/mbti-colors"

interface MbtiGroupInfoProps {
  mbtiType: string
}

export function MbtiGroupInfo({ mbtiType }: MbtiGroupInfoProps) {
  const group = getMbtiGroup(mbtiType)

  if (!group) {
    return null
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h3 className="font-medium text-gray-900 mb-1">
        {group.name} Group ({group.types.join(", ")})
      </h3>
      <p className="text-sm text-gray-600">{group.description}</p>
    </div>
  )
}
