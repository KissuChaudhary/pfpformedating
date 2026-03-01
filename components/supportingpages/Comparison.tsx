"use client"

import type React from "react"
import { XCircle, CheckCircle, Sparkles, Check } from "lucide-react"

export default function TheVerdictFinal() {

  const traditionalPainPoints = [
    "Weeks of scheduling & waiting",
    "Expensive photographer fees",
    "Awkward, time-consuming poses",
    "Inconsistent lighting & results",
    "Limited shots to choose from",
  ];

  const pfpforMESolutions = [
    "Done-for-you, in minutes.",
    "A fraction of the cost.",
    "From the comfort of your couch.",
    "Perfect, studio-quality lighting.",
    "A portfolio of hundreds of options.",
  ];

  return (
    <section className="relative mx-auto py-16 sm:py-24 overflow-hidden bg-[#F7F5F3]">
      <div className="px-4 max-w-5xl mx-auto">
        {/* Header (Unchanged, as it works well) */}
        <div className="text-center mb-12">
          <h2 className="leading-none text-4xl sm:text-5xl md:text-6xl max-w-4xl mx-auto font-bold mb-4 font-[var(--font-inter-tight)] text-gray-900">
            The Traditional Photoshoot <span className="text-[#ff6f00]">is obsolete.</span>
          </h2>
        
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See how the PFPforME process delivers superior results with none of the friction.
          </p>
        </div>

        {/* --- The Definitive Comparison Card with Nested Dashed Borders --- */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-2xl shadow-gray-200/60 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
<div className="p-4 sm:p-6">
                <h3 className="text-xl text-center font-bold text-gray-500 mb-6">Traditional Photoshoot</h3>

            {/* --- Left Pane: The Pain (Traditional) --- */}
            <div className="p-4 sm:p-6 border border-dashed border-gray-300 rounded-2xl">
              <ul className="space-y-2">
                {traditionalPainPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-400 mb-1">TOTAL TIME</p>
                <p className="text-3xl font-bold text-gray-500">1-2 Weeks</p>
              </div>
            </div>
</div>
<div className="p-4 sm:p-6">

            {/* --- Right Pane: The Cure (PFPforME) --- */}
            <div className="flex-1 bg-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden rounded-2xl border border-gray-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Sparkles className="w-6 h-6 text-[#ff6f00]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    The PFPforME Way
                  </h3>
                </div>

                <ul className="space-y-4">
                  {pfpforMESolutions.map((solution) => (
                    <li key={solution} className="flex items-start gap-3 group">
                      <div className="mt-1 p-1 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-lg text-gray-700 font-medium">
                        {solution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}