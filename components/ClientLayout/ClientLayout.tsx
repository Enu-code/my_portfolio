'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Menu from '@/components/Menu/Menu'
import Sidebar from '@/components/Sidebar/Sidebar'
import Preloader from '@/components/Preloader/Preloader'
import Cursor from '@/components/Cursor/Cursor'

/**
 * ClientLayout — holds all interactive global state.
 * This is a Client Component so it can manage:
 *   - Menu open/close state
 *   - Body scroll lock when menu is open
 *
 * Phase 3 additions: Preloader, Cursor
 */
export default function ClientLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <>
      <Preloader />
      <Cursor />

      <Navbar
        onMenuOpen={() => setMenuOpen(true)}
        menuOpen={menuOpen}
      />

      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <Sidebar />
    </>
  )
}
