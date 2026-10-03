import React, { useRef, useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Terminal, Cloud, Cpu } from "lucide-react";

/* --------------------------------------------------------------
   Color Palette & Theme Variables
   -------------------------------------------------------------- */
const colors = {
  primaryBlue: "#3B3BF4", // Bright Blue
  secondaryBlue: "#1A3A9A", // Deep Blue
  darkNavy: "#0A0A1A", // Very Dark Navy
  almostBlack: "#000000", // Pure black page background
  text: "#F5F5F5", // Light cream/off-white text
};

const GlobalStyle = createGlobalStyle`
  :root {
    --accent-color: #2F2FE4; /* Brighter accent blue for glows and nodes */
    --line-color: #162E93;   /* Dark navy blue for the energy line track */
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: "Georgia", serif;
    background: #000000;
    color: #F5F5F5;
    overflow-x: hidden;
    overflow-y: auto !important;
    scroll-behavior: smooth;
    min-height: 100vh;
  }
  
  h1, h2, h3 {
    margin: 0;
  }
`;

/* --------------------------------------------------------------
   Layout Containers
   -------------------------------------------------------------- */
const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${colors.almostBlack};
  overflow: visible;
`;

const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: visible;
  background: ${colors.almostBlack};
  position: relative;
  padding: 2rem 0 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 0;
  }
`;

const TextSection = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1.5rem 0;
  max-width: 100%;
  position: relative;
  z-index: 2;
  
  @media (min-width: 768px) {
    flex: 0 0 42%;
    max-width: 620px;
    padding: 4rem 2rem 4rem 4rem;
  }
`;

const TextBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: clamp(1rem, 3vw, 2rem);
  padding-top: 6px;
  max-width: 100%;

  @media (min-width: 768px) {
    padding-left: clamp(1.5rem, 4vw, 3rem);
    padding-top: 6px;
  }
`;

const Heading = styled.h1`
  font-family: "Playfair Display", serif; /* Sullivan NYC fallback */
  font-size: 2.5rem;
  color: ${colors.text};
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const SubHeading = styled.h2`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 1.5rem;
  margin-top: 1rem;
  font-weight: 400;
  color: ${colors.text};
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ModelWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  min-height: 450px;
  max-height: 550px;
  width: 100%;
  padding: 40px;
  background: transparent;
  pointer-events: none !important;
  
  @media (min-width: 768px) {
    flex: 0 0 58%;
    min-height: 100vh;
    justify-content: flex-start;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 12% 8% auto auto;
    width: 64%;
    height: 64%;
    border: 1px solid rgba(47, 47, 228, 0.1);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto auto 6% 6%;
    width: 48%;
    height: 30%;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    pointer-events: none;
    z-index: 0;
  }
`;

const SplineInner = styled.div`
  position: relative;
  z-index: 1;
  width: min(100vw, 600px);
  height: min(74vh, 600px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
  padding: 0;
  margin: 0;
  transform: scale(1.08);
  transform-origin: center center;
  opacity: 0.98;
  background: transparent;

  canvas,
  spline-viewer {
    background: transparent !important;
    overflow: visible !important;
    clip-path: none !important;
    clip: rect(auto, auto, auto, auto) !important;
  }

  spline-viewer {
    pointer-events: none !important;
    touch-action: none !important;
    width: 100% !important;
    height: 100% !important;
  }

  spline-viewer canvas {
    pointer-events: none !important;
    touch-action: none !important;
  }

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: none;
  }

  @media (min-width: 768px) {
    width: min(100%, 700px);
    height: min(78vh, 700px);
    transform: scale(1.06);
  }

  @media (max-width: 1024px) {
    transform: scale(1.0);
    padding: 0;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: min(100%, 400px);
    height: min(60vh, 400px);
    transform: scale(0.96);
    padding: 0;
    margin: 0;
  }
`;

const RotationOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
  user-select: none;
  background: transparent;

  &:active {
    cursor: grabbing;
  }
`;

/* --------------------------------------------------------------
   Combined Section: Introduction + Overview + Expertise (Page 2)
   -------------------------------------------------------------- */
const CombinedSection = styled.section`
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 5rem 25px 5rem 25px;
  box-sizing: border-box;
  position: relative;

  @media (min-width: 768px) {
    padding: 6rem 25px 6rem 25px;
  }
`;

const SectionContentContainer = styled.div`
  max-width: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding-left: calc(2.2rem + 20px);
  padding-right: 25px;

  @media (min-width: 768px) {
    padding-left: calc(4.8rem + 25px);
  }
`;

const ExperienceSectionContent = styled(SectionContentContainer)`
  padding-left: 0;
  padding-right: 0;
  align-items: center;
`;

const IntroLabel = styled.span`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  color: #2F2FE4;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: block;
`;

const IntroTitle = styled.h2`
  font-family: 'Sullivan NYC', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #F5F5F5;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.02em;

  @media (min-width: 768px) {
    font-size: 3.8rem;
  }
`;

const OverviewBioText = styled.p`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #94A3B8;
  font-weight: 400;
  margin: 0 0 2.5rem 0;
  max-width: 900px;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};

  @media (min-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.9;
  }

  strong {
    color: #F5F5F5;
    font-weight: 500;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const SkillCard = styled.div`
  background: rgba(10, 10, 26, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 20px;
  border: 1px solid rgba(47, 47, 228, 0.35);
  padding: 3rem 2rem;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(40px)'};
  transition: opacity 0.6s ease-out ${props => props.$delay || '0s'},
              transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${props => props.$delay || '0s'},
              border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-8px) !important;
    border-color: rgba(47, 47, 228, 0.85);
    box-shadow: 
      0 14px 40px rgba(0, 0, 0, 0.6),
      0 0 25px rgba(47, 47, 228, 0.4);
    background: rgba(16, 16, 42, 0.88);
  }
`;

const CardIconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  ${SkillCard}:hover & {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-family: 'Sullivan NYC', Georgia, serif;
  font-size: 1.4rem;
  color: #F5F5F5;
  margin: 0;
  letter-spacing: 0.01em;
`;

/* --------------------------------------------------------------
   Global Energy Line components
   -------------------------------------------------------------- */
const EnergyLineContainer = styled.div`
  position: absolute;
  left: 2.2rem;
  top: ${props => props.$top}px;
  height: ${props => props.$height}px;
  width: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  
  @media (min-width: 768px) {
    left: 4.8rem;
  }
`;

const StartPin = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-color);
  box-shadow: 
    0 0 8px var(--accent-color),
    0 0 16px var(--accent-color);
  z-index: 15;
  flex-shrink: 0;
  margin-bottom: 2px;
  
  animation: pinPulse 2s infinite ease-in-out;

  @keyframes pinPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 8px var(--accent-color), 0 0 16px var(--accent-color);
    }
    50% {
      transform: scale(1.25);
      box-shadow: 0 0 14px var(--accent-color), 0 0 28px var(--accent-color);
    }
  }
`;

const EnergyLineTrack = styled.div`
  position: relative;
  width: 3px;
  height: 100%;
  background: rgba(22, 46, 147, 0.25);
  border-radius: 1.5px;
`;

const ActiveEnergyLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$progress}%;
  background: linear-gradient(
    to bottom,
    var(--line-color) 0%,
    var(--accent-color) 80%,
    rgba(47, 79, 228, 0.3) 100%
  );
  border-radius: 1.5px;
  transition: height 0.1s ease-out;
  
  /* Glowing line effect */
  filter: drop-shadow(0 0 4px var(--accent-color));
`;

const GenerationTip = styled.div`
  position: absolute;
  left: 50%;
  top: ${props => props.$progress}%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-color);
  box-shadow: 
    0 0 10px var(--accent-color),
    0 0 20px var(--accent-color),
    0 0 30px var(--accent-color);
  z-index: 12;
  transition: top 0.1s ease-out;
  
  animation: glowPulse 1.5s infinite ease-in-out;
  
  @keyframes glowPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-color);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
      box-shadow: 0 0 15px var(--accent-color), 0 0 30px var(--accent-color), 0 0 40px var(--accent-color);
    }
  }
`;

const CheckpointPin = styled.div`
  position: absolute;
  left: 50%;
  top: ${props => props.$offsetTop}px;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: ${props => props.$active ? '#2F2FE4' : 'rgba(47, 47, 228, 0.3)'};
  border: 2px solid ${props => props.$active ? '#FFFFFF' : '#2F2FE4'};
  border-radius: 2px;
  box-shadow: ${props => props.$active 
    ? '0 0 12px #2F2FE4, 0 0 24px #2F2FE4, 0 0 36px rgba(47, 47, 228, 0.8)' 
    : '0 0 6px rgba(47, 47, 228, 0.3)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 15;
  cursor: pointer;
  pointer-events: auto;

  animation: ${props => props.$active ? 'checkpointGlow 2s infinite ease-in-out' : 'none'};

  @keyframes checkpointGlow {
    0%, 100% {
      transform: translate(-50%, -50%) rotate(45deg) scale(1);
      box-shadow: 0 0 12px #2F2FE4, 0 0 24px #2F2FE4;
    }
    50% {
      transform: translate(-50%, -50%) rotate(45deg) scale(1.3);
      box-shadow: 0 0 18px #2F2FE4, 0 0 36px #2F2FE4, 0 0 48px #2F2FE4;
    }
  }
`;

const DotLabel = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.$active ? '#F5F5F5' : 'rgba(255, 255, 255, 0.4)'};
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;

  ${CheckpointPin}:hover & {
    opacity: 1;
    transform: translateY(-50%) rotate(-45deg) translateX(4px);
  }
`;

const ExperienceSection = styled.section`
  background: #000000;
  display: flex;
  justify-content: center;
  padding: 8rem 25px 8rem 25px;
  margin-top: 100px;
  min-height: 160vh;
  position: relative;
  box-sizing: border-box;
`;

const ExperienceLabel = styled.span`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: #2F2FE4;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
`;

const ExperienceTitle = styled.h2`
  font-family: 'Sullivan NYC', Georgia, serif;
  font-size: 3rem;
  font-weight: 700;
  color: #F5F5F5;
  margin: 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const ExperienceHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0 1.5rem;
`;

const ExperienceContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0;
  box-sizing: border-box;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ExperienceLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  min-height: 1200px;
  position: relative;
  padding-top: 1rem;
`;

const ExperienceLineColumn = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 3px;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 1023px) {
    left: 32px;
    transform: none;
  }
`;

const ExperienceLineTrack = styled.div`
  position: relative;
  width: 3px;
  height: 100%;
  background: rgba(22, 46, 147, 0.25);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(22, 46, 147, 0.18);
`;

const ExperienceLineFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$progress}%;
  background: linear-gradient(
    to bottom,
    var(--line-color) 0%,
    var(--accent-color) 80%,
    rgba(47, 79, 228, 0.3) 100%
  );
  border-radius: 2px;
  filter: drop-shadow(0 0 6px var(--accent-color));
  transition: height 0.15s ease-out;
`;

const ExperienceCheckpointPin = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2F2FE4;
  box-shadow: 0 0 18px rgba(47, 47, 228, 0.5);
  z-index: 2;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateX(-50%) scale(1.25);
      opacity: 0.85;
    }
  }
`;

const ExperienceCard = styled.div`
  background: rgba(10, 10, 26, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 20px;
  border: 1px solid rgba(47, 47, 228, 0.35);
  padding: 35px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  width: min(46vw, 420px);
  height: 300px;
  max-width: 420px;
  min-height: 300px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 1023px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 280px;
  }
`;

const LeftCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-left: 5%;
  padding-right: calc(50% + 20px);
  margin-bottom: 5rem;

  @media (max-width: 1023px) {
    padding-left: 48px;
    padding-right: 0;
  }
`;

const RightCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: calc(50% + 20px);
  padding-right: 5%;
  margin-bottom: 5rem;

  @media (max-width: 1023px) {
    padding-left: 48px;
    padding-right: 0;
  }
`;

const ExperienceCompany = styled.h3`
  font-family: 'Sullivan NYC', Georgia, serif;
  font-size: 1.5rem;
  margin: 0;
  color: #F5F5F5;
`;

const ExperienceRole = styled.p`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 1rem;
  color: #94A3B8;
  margin: 0;
`;

const ExperienceDuration = styled.p`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.85rem;
  color: #94A3B8;
  margin: 0;
`;

const ExperienceBody = styled.p`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #F5F5F5;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

/* --------------------------------------------------------------
   Custom Official SVG Brand Icons
   -------------------------------------------------------------- */
const ReactLogo = ({ size = 38, color = "#61DAFB" }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill={color}/>
    <g stroke={color} strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const NodeLogo = ({ size = 36, color = "#339933" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const LightningLogo = ({ size = 36, color = "#61DAFB" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} fillOpacity="0.25" />
  </svg>
);

const TechIcon = ({ type }) => {
  switch (type) {
    case "html5":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
        </svg>
      );
    case "css3":
      return (
        <svg viewBox="0 0 128 128" width="100" height="100" aria-hidden="true">
          <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z" />
          <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z" />
          <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z" />
          <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z" />
          <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z" />
          <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#5FA04E" d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" />
          <path fill="#181717" d="M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#000000" d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#06B6D4" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#F03C2E" d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "mongoose":
      return (
        <svg viewBox="0 0 24 24" width="100" height="100" aria-hidden="true">
          <path fill="#880000" d="M12 2c-2.2 0-4 1.8-4 4 0 1.1.5 2.1 1.2 2.8C8.4 9.7 8 10.8 8 12c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.2-.4-2.3-1.2-3.2C15.5 8.1 16 7.1 16 6c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      );
    default:
      return null;
  }
};

const rowOneTechs = [
  { name: "MongoDB", type: "mongodb" },
  { name: "React", type: "react" },
  { name: "JavaScript", type: "javascript" },
  { name: "CSS3", type: "css3" },
  { name: "Tailwind CSS", type: "tailwind" },
];

const rowTwoTechs = [
  { name: "HTML5", type: "html5" },
  { name: "Git", type: "git" },
  { name: "GitHub", type: "github" },
  { name: "Node.js", type: "node" },
  { name: "Express.js", type: "express" },
];

const TechSection = styled.section`
  background: radial-gradient(ellipse at top, rgba(47, 47, 228, 0.16), transparent 50%), #000000;
  display: flex;
  justify-content: center;
  padding: 5.25rem 20px 6rem 20px;
  margin-top: 80px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const TechSectionContent = styled(SectionContentContainer)`
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
  z-index: 2;
  gap: 32px;
`;

const TechHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const TechTitle = styled.h2`
  font-family: 'Sullivan NYC', Georgia, serif;
  font-size: 2.15rem;
  font-weight: 700;
  color: #F5F5F5;
  margin: 0;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

const TechMarqueeRow = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  overflow: hidden;
  padding: 22px 0;
  margin: 0;
  mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,0.95) 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,0.95) 92%, transparent 100%);

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  &:hover > div {
    animation-play-state: paused;
  }
`;

const TechMarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  gap: 80px;
  padding: 0;
  transform: ${props => props.$direction === "left" ? "translateX(0)" : "translateX(-33.3333%)"};
  animation: ${props => props.$direction === "left" ? "marqueeLeft" : "marqueeRight"} 60s linear infinite;
  will-change: transform;

  @keyframes marqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.3333%); }
  }

  @keyframes marqueeRight {
    0% { transform: translateX(-33.3333%); }
    100% { transform: translateX(0); }
  }
`;

const TechToken = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:hover > div {
    transform: scale(1.08);
  }
`;

const TechTokenIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
  }

  svg {
    display: block;
    width: 98px;
    height: 98px;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;

    svg {
      width: 88px;
      height: 88px;
    }
  }
`;

const WorkSection = styled.section`
  position: relative;
  margin-top: 80px;
  padding: 100px 20px;
  background: linear-gradient(
    to bottom,
    #0D0D1A 0%,
    #0D0D1A 40%,
    rgba(13, 13, 26, 0.8) 60%,
    #000000 80%,
    #000000 100%
  );
  box-sizing: border-box;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;

  @media (max-width: 1023px) {
    padding: 80px 20px;
    min-height: auto;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const WorkSectionContent = styled(SectionContentContainer)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const WorkHeader = styled.div`
  margin-bottom: 50px;
  text-align: left;
  padding-left: calc(1.6rem + 12px);

  @media (min-width: 768px) {
    padding-left: calc(3.4rem + 18px);
  }

  @media (max-width: 1023px) {
    padding-left: 16px;
  }
`;

const WorkLabel = styled.span`
  font-family: 'The New Yorker', serif;
  color: #2F2FE4;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
`;

const WorkTitle = styled.h2`
  font-family: 'Sullivan NYC', Georgia, serif;
  color: #F5F5F5;
  font-size: 2.2rem;
  margin-top: 6px;
  margin-bottom: 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const WorkCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
  align-items: stretch;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1023px) {
    gap: 30px;
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    max-width: 500px;
  }
`;

const WorkCard = styled.article`
  background: rgba(10, 10, 26, 0.74);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(47, 47, 228, 0.22);
  border-radius: 22px;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 38px rgba(47, 47, 228, 0.12);
    border-color: rgba(47, 47, 228, 0.38);
  }
`;

const WorkCardImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(10, 10, 26, 0.42), rgba(10, 10, 26, 0.18));
  border-radius: 22px 22px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 12px;
    transition: transform 0.4s ease;
  }

  ${WorkCard}:hover & img {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 180px;
    padding: 12px;
  }
`;

const WorkCardContent = styled.div`
  padding: 24px 28px 30px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 20px 22px 24px;
  }
`;

const WorkCardTitle = styled.h3`
  font-family: 'Sullivan NYC', Georgia, serif;
  color: #F5F5F5;
  font-size: 1.35rem;
  margin: 0 0 10px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const WorkCardDescription = styled.p`
  font-family: 'The New Yorker', serif;
  color: #94A3B8;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
  opacity: 0.95;
`;

const ContactSection = styled.section`
  position: relative;
  margin-top: 80px;
  padding: 80px 20px 100px;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #000000 10%,
    rgba(13, 13, 26, 0.95) 30%,
    rgba(13, 13, 26, 1) 60%,
    #0D0D1A 100%
  );
  box-sizing: border-box;
  overflow: hidden;
`;

const ContactSectionContent = styled(SectionContentContainer)`
  max-width: 1400px;
  margin: 0 auto;
  padding-left: calc(2.2rem + 20px);
  padding-right: 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding-left: calc(4.8rem + 25px);
    padding-right: 20px;
  }
`;

const ContactLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }
`;

const ContactFormPanel = styled.div`
  flex: 0 0 55%;
  max-width: 650px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 0;

  @media (max-width: 1023px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const ContactFormCard = styled.div`
  width: 100%;
  background: #111122;
  border: 1px solid rgba(47, 47, 228, 0.08);
  border-radius: 16px;
  padding: 40px 45px;
  box-sizing: border-box;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);

  @media (max-width: 1023px) {
    padding: 30px 25px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

const ContactSmallLabel = styled.span`
  display: block;
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2F2FE4;
  margin-bottom: 0.35rem;
`;

const ContactHeading = styled.h2`
  font-family: 'Sullivan NYC', Georgia, serif;
  font-size: 2.9rem;
  font-weight: 700;
  line-height: 1.1;
  color: #F5F5F5;
  margin: 0 0 2.5rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const FieldLabel = styled.label`
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 0.9rem;
  color: #94A3B8;
`;

const FieldInput = styled.input`
  width: 100%;
  padding: 16px 18px;
  background: #1A1A2E;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: #F5F5F5;
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  &:hover {
    background: #22223A;
    border-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    border-color: #2F2FE4;
    box-shadow: 0 0 0 4px rgba(47, 47, 228, 0.15);
    background: #22223A;
    outline: none;
  }
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  height: 140px;
  resize: vertical;
  padding: 16px 18px;
  background: #1A1A2E;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: #F5F5F5;
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  &:hover {
    background: #22223A;
    border-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    border-color: #2F2FE4;
    box-shadow: 0 0 0 4px rgba(47, 47, 228, 0.15);
    background: #22223A;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 14px 40px;
  background: #2F2FE4;
  color: #F5F5F5;
  border: none;
  border-radius: 10px;
  font-family: 'The New Yorker', 'Times New Roman', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3B3BF4;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(47, 47, 228, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const GitHubSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const XSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialData = [
  { name: "GitHub", url: "https://github.com/meetrajyaguru", color: "#181717", icon: GitHubSVG },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/meetrajyaguru/", color: "#0A66C2", icon: LinkedInSVG },
  { name: "Instagram", url: "https://instagram.com/meetrajyaguru.webm", color: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)", icon: InstagramSVG },
  { name: "X", url: "https://x.com/MeetRajyaguru17", color: "#000000", icon: XSVG },
  { name: "WhatsApp", url: "https://wa.me/919106592858?text=Hi%20Meet%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!", color: "#25D366", icon: WhatsAppSVG },
];

const CircleContainer = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  @media (max-width: 1024px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const SocialIconLink = styled.a`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #F5F5F3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  white-space: nowrap;
  top: ${({ $x, $y }) => `calc(50% + ${$y}px - 30px)`};
  left: ${({ $x, $y }) => `calc(50% + ${$x}px - 30px)`};
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${({ $index }) => `${$index * 0.5}s`};

  &:hover {
    animation-play-state: paused;
    width: 150px;
    border-radius: 30px;
    background: ${({ $brandColor }) => $brandColor};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 28px;
    height: 28px;
    fill: #000;
    transition: fill 0.3s ease;
    flex-shrink: 0;
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &:hover svg {
    fill: #FFFFFF;
  }

  &::after {
    content: "${({ $label }) => $label}";
    color: #FFFFFF;
    font-family: 'The New Yorker', 'Times New Roman', serif;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.5s ease 0.2s;
    white-space: nowrap;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ContactSocialPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  @media (max-width: 1023px) {
    min-height: 320px;
    width: 100%;
  }
`;

const getPositions = (total, radius) => {
  const positions = [];

  for (let i = 0; i < total; i += 1) {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    positions.push({ x, y });
  }

  return positions;
};

const CAMERA_ZOOM = 0.11;
const POSITION_Z = 5;
const OBJECT_SCALE = 0.055;

/* --------------------------------------------------------------
   Component Logic
   -------------------------------------------------------------- */
export default function SinglePortfolio() {
  const heroSplineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lineStyles, setLineStyles] = useState({ top: 0, height: 0 });
  const [sectionDotOffset, setSectionDotOffset] = useState(0);
  const [expScrollProgress, setExpScrollProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";
    document.body.appendChild(script);

    const disableCanvasForScroll = () => {
      const viewer = heroSplineRef.current;
      if (!viewer) return;

      const canvas = viewer.querySelector("canvas");
      if (!canvas) {
        setTimeout(disableCanvasForScroll, 250);
        return;
      }

      canvas.style.pointerEvents = "none";
      canvas.style.touchAction = "none";
      canvas.style.userSelect = "none";
    };

    const timers = [300, 600, 900, 1200];
    timers.forEach((delay) => setTimeout(disableCanvasForScroll, delay));

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Track dynamic line sizing and positioning based on text locations
  useEffect(() => {
    const updateDimensions = () => {
      const headingEl = document.getElementById("hero-heading");
      const sectionEl = document.getElementById("combined-section");
      const introLabelEl = document.getElementById("intro-label");
      const expSectionEl = document.getElementById("experience-section");
      
      if (headingEl && sectionEl && introLabelEl) {
        const headingTop = headingEl.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionEl.getBoundingClientRect().bottom + window.scrollY;
        const introLabelTop = introLabelEl.getBoundingClientRect().top + window.scrollY;
        
        const top = headingTop + 6;
        const height = (sectionBottom - 100) - top;
        
        setLineStyles({ top, height });
        setSectionDotOffset(introLabelTop - top);
      }

      
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const timers = [
      setTimeout(updateDimensions, 500),
      setTimeout(updateDimensions, 1500),
      setTimeout(updateDimensions, 3000)
    ];

    return () => {
      window.removeEventListener("resize", updateDimensions);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Intersection Observer for Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const combinedEl = document.getElementById("combined-section");
    if (combinedEl) observer.observe(combinedEl);

    const expObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsExperienceVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const expEl = document.getElementById("experience-section");
    if (expEl) expObserver.observe(expEl);

    return () => {
      if (combinedEl) observer.unobserve(combinedEl);
      if (expEl) expObserver.unobserve(expEl);
    };
  }, []);

  // Track page scroll progress for smooth Energy Line generation
  useEffect(() => {
    const handleScroll = () => {
      const headingEl = document.getElementById("hero-heading");
      const sectionEl = document.getElementById("combined-section");
      const expSectionEl = document.getElementById("experience-section");
      
      if (headingEl && sectionEl) {
        const headingTop = headingEl.getBoundingClientRect().top + window.scrollY + 6;
        const sectionBottom = sectionEl.getBoundingClientRect().bottom + window.scrollY;
        const totalLineHeight = sectionBottom - headingTop;
        
        const currentViewportTip = (window.scrollY + window.innerHeight * 0.55) - headingTop;
        
        if (totalLineHeight > 0) {
          const progress = (currentViewportTip / totalLineHeight) * 100;
          setScrollProgress(Math.min(100, Math.max(0, progress)));
        }
      }

      if (expSectionEl) {
        const expTop = expSectionEl.getBoundingClientRect().top + window.scrollY;
        const expBottom = expSectionEl.getBoundingClientRect().bottom + window.scrollY;
        const expTotalLineHeight = Math.max(0, expBottom - expTop);
        const expCurrentViewportTip = (window.scrollY + window.innerHeight * 0.55) - expTop;

        if (expTotalLineHeight > 0) {
          const progress = (expCurrentViewportTip / expTotalLineHeight) * 100;
          setExpScrollProgress(Math.min(100, Math.max(0, progress)));
        }
      }

    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const enforce = () => {
      const viewer = heroSplineRef.current;
      const app = viewer?.app || viewer?.spline || null;

      if (app?.camera?.controls) {
        app.camera.controls.enableZoom = false;
        app.camera.controls.enableRotate = true;
        app.camera.controls.enablePan = false;
      } else if (viewer?.camera) {
        viewer.camera.position?.set?.(0, 0, POSITION_Z);
        viewer.camera.zoom = CAMERA_ZOOM;
        viewer.camera.enableRotate = true;
        viewer.camera.enableZoom = false;
        viewer.camera.enablePan = false;
      } else {
        requestAnimationFrame(enforce);
      }
    };
    enforce();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const viewer = heroSplineRef.current;
      const app = viewer?.app || viewer?.spline || null;

      if (app?.camera?.controls) {
        app.camera.controls.enableZoom = false;
        app.camera.controls.enableRotate = true;
        app.camera.controls.enablePan = false;
      } else if (viewer?.camera) {
        viewer.camera.position?.set?.(0, 0, POSITION_Z);
        viewer.camera.zoom = CAMERA_ZOOM;
      }
    };

    window.addEventListener("resize", handleResize);
    setTimeout(handleResize, 300);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleSplineLoad = (splineApp) => {
    try {
      const camera = splineApp.getCamera?.();
      if (camera) {
        camera.zoom = CAMERA_ZOOM;
        camera.position?.set?.(0, 0, POSITION_Z);
        camera.enableRotate = true;
        camera.enableZoom = false;
        camera.enablePan = false;
      }

      const mainObject =
        splineApp.getObjectByName?.("Group") ||
        splineApp.getObjectByName?.("Scene") ||
        splineApp.getObjectByName?.("Root");

      if (mainObject && mainObject.scale) {
        mainObject.scale.set(OBJECT_SCALE, OBJECT_SCALE, OBJECT_SCALE);
      }
    } catch (error) {
      // Ignore Spline init issues to keep the page responsive.
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSectionActive = scrollProgress >= (lineStyles.height > 0 ? (sectionDotOffset / lineStyles.height) * 100 : 50);
  const expIsSectionActive = expScrollProgress > 5;
  const radius = 140;
  const positions = getPositions(socialData.length, radius);

  const getBrandColor = (social) => {
    if (social.name === "Instagram") {
      return "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)";
    }
    return social.color;
  };

  return (
    <PageWrapper>
      <GlobalStyle />
      
      {/* Unified Global Energy Line */}
      {lineStyles.height > 0 && (
        <EnergyLineContainer $top={lineStyles.top} $height={lineStyles.height}>
          <StartPin onClick={() => scrollToSection("hero-heading-block")} style={{ cursor: "pointer" }} />
          <EnergyLineTrack>
            <ActiveEnergyLine $progress={scrollProgress} />
            <GenerationTip $progress={scrollProgress} />
            <CheckpointPin 
              $offsetTop={sectionDotOffset} 
              $active={isSectionActive}
              onClick={() => scrollToSection("combined-section")}
            >
              <DotLabel $active={isSectionActive}>Introduction</DotLabel>
            </CheckpointPin>
          </EnergyLineTrack>
        </EnergyLineContainer>
      )}

      {/* Experience Page Energy Line */}
      {/* Hero Section */}
      <HeroSection>
        <TextSection>
          <TextBlock id="hero-heading-block">
            <Heading id="hero-heading">Hi, I am Meet Rajyaguru</Heading>
            <SubHeading>I develop 3D visuals, user interfaces and web application</SubHeading>
          </TextBlock>
        </TextSection>
        <ModelWrapper>
          <SplineInner>
            <spline-viewer
              ref={heroSplineRef}
              url="https://prod.spline.design/foAZUzfdESGjGTuj/scene.splinecode"
              zoom={CAMERA_ZOOM.toString()}
              background="transparent"
              events-target="global"
              style={{ width: "100%", height: "100%", background: "transparent", display: "block" }}
              onLoad={handleSplineLoad}
            />
          </SplineInner>
        </ModelWrapper>
      </HeroSection>

      {/* Combined Introduction + Overview + Expertise Section (Page 2) */}
      <CombinedSection id="combined-section">
        <SectionContentContainer>
          {/* Part 1: Introduction */}
          <IntroLabel id="intro-label">INTRODUCTION</IntroLabel>
          <IntroTitle>OVERVIEW</IntroTitle>

          {/* Part 2: Overview Text */}
          <OverviewBioText $isVisible={isSectionVisible}>
            Hi, I'm <strong>Meet Rajyaguru</strong> — a MERN Stack architect. I turn complex problems into elegant digital solutions with expertise in full-stack development, backend engineering, and modern web technologies.
          </OverviewBioText>

          {/* Part 3: Three Expertise Cards */}
          <CardsGrid>
            <SkillCard $isVisible={isSectionVisible} $delay="0.1s">
              <CardIconContainer>
                <ReactLogo color="#61DAFB" />
              </CardIconContainer>
              <CardTitle>Full Stack Development</CardTitle>
            </SkillCard>

            <SkillCard $isVisible={isSectionVisible} $delay="0.25s">
              <CardIconContainer>
                <NodeLogo color="#339933" />
              </CardIconContainer>
              <CardTitle>Backend Development</CardTitle>
            </SkillCard>

            <SkillCard $isVisible={isSectionVisible} $delay="0.4s">
              <CardIconContainer>
                <LightningLogo color="#61DAFB" />
              </CardIconContainer>
              <CardTitle>React Development</CardTitle>
            </SkillCard>
          </CardsGrid>
        </SectionContentContainer>
      </CombinedSection>

      {/* Experience Section (Page 3) */}
      <ExperienceSection id="experience-section">
        <ExperienceSectionContent>
          <ExperienceHeader>
            <ExperienceLabel>PROFESSIONAL JOURNEY</ExperienceLabel>
            <ExperienceTitle id="experience-title">EXPERIENCE</ExperienceTitle>
          </ExperienceHeader>
          <ExperienceLayout>
            <ExperienceLineColumn>
              <ExperienceLineTrack>
                <ExperienceLineFill $progress={expScrollProgress} />
                <ExperienceCheckpointPin style={{ top: 150 }} />
                <ExperienceCheckpointPin style={{ top: 420 }} />
                <ExperienceCheckpointPin style={{ top: 780 }} />
              </ExperienceLineTrack>
            </ExperienceLineColumn>
            <RightCardWrapper>
              <ExperienceCard>
                <ExperienceCompany>CADD Centre</ExperienceCompany>
                <ExperienceRole>Python Programming and GUI Development</ExperienceRole>
                <ExperienceDuration>Sep 2022 - Oct 2022</ExperienceDuration>
                <ExperienceBody>
                  Enhanced user experience by designing responsive and interactive interface components.
                </ExperienceBody>
              </ExperienceCard>
            </RightCardWrapper>
            <LeftCardWrapper>
              <ExperienceCard id="brainy-beam">
                <ExperienceCompany>Brainy Beam</ExperienceCompany>
                <ExperienceRole>AI/ML Intern</ExperienceRole>
                <ExperienceDuration>Sep 2023 - Oct 2023</ExperienceDuration>
                <ExperienceBody>
                  Completed a one-month internship in AI/ML, developing a house price prediction model using machine learning techniques. Utilized Python libraries including Pandas, NumPy, Scikit-learn, and Matplotlib for data preprocessing, model building, and visualization.
                </ExperienceBody>
              </ExperienceCard>
            </LeftCardWrapper>
            <RightCardWrapper>
              <ExperienceCard>
                <ExperienceCompany>Spark to Idea</ExperienceCompany>
                <ExperienceRole>MERN Stack Developer</ExperienceRole>
                <ExperienceDuration>07 July - 22 July</ExperienceDuration>
                <ExperienceBody>
                  Worked on a full stack project, in which I built Web applications, did Web scraping and also integrated external APIs for Web automation.
                </ExperienceBody>
              </ExperienceCard>
            </RightCardWrapper>
          </ExperienceLayout>
        </ExperienceSectionContent>
      </ExperienceSection>

      <TechSection id="tech-stack-section">
        <TechSectionContent>
          <TechHeader>
            <TechTitle>Technologies I work with</TechTitle>
          </TechHeader>

          <TechMarqueeRow>
            <TechMarqueeTrack $direction="left">
              {[...rowOneTechs, ...rowOneTechs, ...rowOneTechs].map((tech, index) => (
                <TechToken key={`left-${tech.name}-${index}`}>
                  <TechTokenIcon>
                    <TechIcon type={tech.type} />
                  </TechTokenIcon>
                </TechToken>
              ))}
            </TechMarqueeTrack>
          </TechMarqueeRow>

          <TechMarqueeRow>
            <TechMarqueeTrack $direction="right">
              {[...rowTwoTechs, ...rowTwoTechs, ...rowTwoTechs].map((tech, index) => (
                <TechToken key={`right-${tech.name}-${index}`}>
                  <TechTokenIcon>
                    <TechIcon type={tech.type} />
                  </TechTokenIcon>
                </TechToken>
              ))}
            </TechMarqueeTrack>
          </TechMarqueeRow>
        </TechSectionContent>
      </TechSection>

      <WorkSection>
        <WorkSectionContent>
          <WorkHeader>
            <WorkLabel>MY WORK</WorkLabel>
            <WorkTitle>Projects</WorkTitle>
          </WorkHeader>

          <WorkCards>
            <WorkCard>
              <WorkCardImage>
                <img src="/wanderAI.png" alt="Wander AI" />
              </WorkCardImage>
              <WorkCardContent>
                <WorkCardTitle>Wander AI</WorkCardTitle>
                <WorkCardDescription>
                  AI-powered travel planning platform that generates personalized itineraries based on destination, budget, and preferences.
                </WorkCardDescription>
              </WorkCardContent>
            </WorkCard>
            <WorkCard>
              <WorkCardImage>
                <img src="/omniFoods.png" alt="Omni Food Platform" />
              </WorkCardImage>
              <WorkCardContent>
                <WorkCardTitle>Omni Food Platform</WorkCardTitle>
                <WorkCardDescription>
                  A food delivery, clean and intuitive food delivery interface focused on speed, simplicity, and user experience.
                </WorkCardDescription>
              </WorkCardContent>
            </WorkCard>
          </WorkCards>
        </WorkSectionContent>
      </WorkSection>

      <ContactSection id="contact-section">
        <ContactSectionContent>
          <ContactLayout>
            <ContactFormPanel>
              <ContactFormCard>
                <ContactSmallLabel>GET IN TOUCH</ContactSmallLabel>
                <ContactHeading>Contact.</ContactHeading>
                <ContactForm onSubmit={(e) => e.preventDefault()}>
                  <FormField>
                    <FieldLabel htmlFor="contact-name">Your Name</FieldLabel>
                    <FieldInput id="contact-name" name="name" placeholder="What's your good name?" />
                  </FormField>

                  <FormField>
                    <FieldLabel htmlFor="contact-email">Your Email</FieldLabel>
                    <FieldInput id="contact-email" name="email" type="email" placeholder="What's your web address?" />
                  </FormField>

                  <FormField>
                    <FieldLabel htmlFor="contact-message">Your Message</FieldLabel>
                    <FieldTextarea id="contact-message" name="message" placeholder="What you want to say?" />
                  </FormField>

                  <SubmitButton type="submit">Send</SubmitButton>
                </ContactForm>
              </ContactFormCard>
            </ContactFormPanel>

            <ContactSocialPanel>
              <CircleContainer>
                {socialData.map((social, index) => (
                  <SocialIconLink
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    $x={positions[index].x}
                    $y={positions[index].y}
                    $index={index}
                    $label={social.name}
                    $brandColor={getBrandColor(social)}
                  >
                    <social.icon />
                  </SocialIconLink>
                ))}
              </CircleContainer>
            </ContactSocialPanel>
          </ContactLayout>
        </ContactSectionContent>
      </ContactSection>
    </PageWrapper>
  );
}
