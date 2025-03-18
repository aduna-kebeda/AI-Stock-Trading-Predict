'use client'
import type React from "react"
import { useState } from "react"
import { SidebarProvider } from "@/app/components/ui/sidebar"
import { DashboardSidebar } from "@/app/components/dashboard/sidebar"
import { UserNav } from "@/app/components/dashboard/user-nav"
import { Chatbot } from "@/app/components/chatbot/page"
import { MessageCircle, X } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-black">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="border-b border-[#00FF00]/30 bg-black h-16 flex items-center px-6 justify-between">
            <h1 className="text-xl font-bold text-[#00FF00]">Dashboard</h1>
            <div className="flex items-center mr-6 space-x-4">
              <button
                className="text-white hover:text-[#00FF00] flex items-center"
                onClick={() => setIsChatbotOpen((prev) => !prev)}
              >
                {isChatbotOpen ? (
                  <>
                    <X className="inline-block mr-2" />
                    Close Chatbot
                  </>
                ) : (
                  <>
                    <MessageCircle className="inline-block mr-2" />
                    Open Chatbot
                  </>
                )}
              </button>
              <UserNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 relative">
            {children}

            {/* Chatbot - Conditionally Rendered */}
            {isChatbotOpen && (
              <div className="fixed bottom-4 right-4 animate-fade-in">
                <Chatbot />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}