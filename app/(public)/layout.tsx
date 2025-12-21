import type React from "react"
import { Cursor } from "@/components/pfplanding/ui/Cursor"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="theme-public relative min-h-screen cursor-none font-mono selection:bg-accent selection:text-foreground">
            <div className="grain"></div>
            <Cursor />
            {children}
        </div>
    )
}
