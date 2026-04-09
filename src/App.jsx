import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import { useMuted } from './useMuted'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  const [isMuted, toggleMute, videoRef] = useMuted()
  return (
    <div id="menu-screen">
      <video ref={videoRef} src={menuVideo} autoPlay loop muted playsInline />
      <button
        tabIndex="-1"
        onFocus={(e) => e.target.blur()}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 100,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "20px",
          letterSpacing: "2px",
          color: "#fff",
          background: "rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "6px 14px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
          e.currentTarget.blur();
        }}
      >
        {isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
      </button>
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route
          path="/sideproj"
          element={
            <PageTransition>
              <VideoPage src={main1} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
