"use client"

import { Viewfinder } from '@/components/dashboard/ViewFinder'

export function DashboardContent() {
    // Since the parent page checks for models, we can assume user has at least one
    // The ViewFinder now fetches models and handles selection
    return (
        <div className="w-full">
            <Viewfinder />
        </div>
    )
}
