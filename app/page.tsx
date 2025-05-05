import { CoverGenerator } from "@/components/cover-generator"
import { ToastProvider } from "@/components/toast-provider"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <ToastProvider>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Facebook Cover Generator</h1>
            <p className="text-gray-600">Create a personalized Facebook cover based on your MBTI personality type</p>
          </header>

          <CoverGenerator />
          <Footer />
        </div>
      </main>
    </ToastProvider>
  )
}
