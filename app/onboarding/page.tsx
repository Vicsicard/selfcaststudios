'use client'

import React, { useEffect } from 'react'

export default function OnboardingPage() {
  useEffect(() => {
    // Redirect to the standalone HTML form
    window.location.href = '/onboarding-form.html';
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Redirecting to Onboarding Form...</h1>
      <p>If you are not redirected automatically, <a href="/onboarding-form.html" className="text-blue-500 underline">click here</a>.</p>
    </div>
  )
}
