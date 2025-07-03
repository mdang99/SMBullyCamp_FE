'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useTabSync(defaultTab = 'users') {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabFromUrl = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabFromUrl || defaultTab)

  useEffect(() => {
    if (activeTab !== tabFromUrl) {
      const params = new URLSearchParams(window.location.search)
      params.set('tab', activeTab)
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false })
    }
  }, [activeTab, tabFromUrl, router])

  return { activeTab, setActiveTab }
}
