import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  User, Award, Code, Briefcase, GraduationCap, Share2, 
  Eye, EyeOff, Save, Download, ArrowLeft, CheckCircle2 
} from 'lucide-react';

import { theme } from '../styles/theme';
import PersonalInfo from '../components/PersonalInfo';
import SkillsManager from '../components/SkillsManager';
import ProjectsManager from '../components/ProjectsManager';
import ExperienceManager from '../components/ExperienceManager';
import EducationManager from '../components/EducationManager';
import SocialLinks from '../components/SocialLinks';
import PortfolioPreview from '../components/PortfolioPreview';
import { exportPortfolioToHtml } from '../services/exporter';

const BuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [portfolio, setPortfolio] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Load portfolio data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfoliopro_portfolios');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        const item = list.find(p => p.id === id);
        if (item) {
          setPortfolio(item);
        } else if (id === 'new') {
          // Handle automatic creation for 'new'
          const newId = Date.now().toString();
          const newPortfolio = {
            id: newId,
            name: "My Awesome Portfolio",
            lastUpdated: new Date().toLocaleDateString(),
            personal: { name: "", title: "", bio: "", location: "", email: "", image: "" },
            skills: [],
            projects: [],
            experience: [],
            education: [],
            socials: { github: "", linkedin: "", twitter: "", customLabel: "", customUrl: "" }
          };
          const updatedList = [...list, newPortfolio];
          localStorage.setItem('portfoliopro_portfolios', JSON.stringify(updatedList));
          navigate(`/builder/${newId}`, { replace: true });
        } else {
          // Redirect if not found
          navigate('/');
        }
      } catch (e) {
        console.error("Failed to load portfolio details:", e);
      }
    } else if (id === 'new') {
      // First portfolio initial structure
      const newId = Date.now().toString();
      const newPortfolio = {
        id: newId,
        name: "My Awesome Portfolio",
        lastUpdated: new Date().toLocaleDateString(),
        personal: { name: "", title: "", bio: "", location: "", email: "", image: "" },
        skills: [],
        projects: [],
        experience: [],
        education: [],
        socials: { github: "", linkedin: "", twitter: "", customLabel: "", customUrl: "" }
      };
      localStorage.setItem('portfoliopro_portfolios', JSON.stringify([newPortfolio]));
      navigate(`/builder/${newId}`, { replace: true });
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!portfolio) {
    return <LoadingWrapper>Loading Workspace...</LoadingWrapper>;
  }

  const handleDataChange = (section, value) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const triggerToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
    const saved = localStorage.getItem('portfoliopro_portfolios');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        const updated = list.map(p => {
          if (p.id === portfolio.id) {
            return {
              ...portfolio,
              lastUpdated: new Date().toLocaleDateString()
            };
          }
          return p;
        });
        localStorage.setItem('portfoliopro_portfolios', JSON.stringify(updated));
        triggerToast("Portfolio saved successfully!", "success");
      } catch (e) {
        triggerToast("Failed to save portfolio.", "error");
      }
    }
  };

  const handleGenerate = () => {
    // Force a save state first
    handleSave();
    exportPortfolioToHtml(portfolio);
  };

  // Calculate completeness progress
  const calculateProgress = () => {
    let score = 0;
    
    // Personal Info name, title, bio (30 points)
    if (portfolio.personal?.name) score += 10;
    if (portfolio.personal?.title) score += 10;
    if (portfolio.personal?.bio) score += 10;
    
    // Skills (15 points)
    if (portfolio.skills && portfolio.skills.length > 0) score += 15;
    
    // Projects (25 points)
    if (portfolio.projects && portfolio.projects.length > 0) score += 25;
    
    // Experience (15 points)
    if (portfolio.experience && portfolio.experience.length > 0) score += 15;
    
    // Education (10 points)
    if (portfolio.education && portfolio.education.length > 0) score += 10;
    
    // Social Links (5 points)
    if (portfolio.socials?.github || portfolio.socials?.linkedin) score += 5;

    return score;
  };

  const progress = calculateProgress();

  const tabs = [
    { id: 'personal', label: 'Info', icon: <User size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Award size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'socials', label: 'Socials', icon: <Share2 size={16} /> }
  ];

  return (
    <PageContainer>
      {/* Toast Notice */}
      {showToast && (
        <Toast className={toastType}>
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </Toast>
      )}

      {/* Editor Content Layout */}
      <WorkspaceGrid className={showPreview ? 'split' : 'full'}>
        <EditorPanel>
          <EditorHeader>
            <BackButton onClick={() => navigate('/')}>
              <ArrowLeft size={16} />
              <span>Dashboard</span>
            </BackButton>

            <ActionsFlex>
              <IconButton 
                type="button" 
                onClick={() => setShowPreview(!showPreview)}
                title={showPreview ? "Hide Real-time Preview" : "Show Real-time Preview"}
              >
                {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>

              <SaveButton onClick={handleSave}>
                <Save size={16} />
                <span>Save</span>
              </SaveButton>

              <GenerateButton onClick={handleGenerate}>
                <Download size={16} />
                <span>Export HTML</span>
              </GenerateButton>
            </ActionsFlex>
          </EditorHeader>

          {/* Progress Indicator */}
          <ProgressSection>
            <ProgressHeader>
              <span>Portfolio Completeness</span>
              <span>{progress}%</span>
            </ProgressHeader>
            <ProgressBarWrapper>
              <ProgressBarFill style={{ width: `${progress}%` }} />
            </ProgressBarWrapper>
          </ProgressSection>

          {/* Tab Selection */}
          <TabNav>
            {tabs.map(t => (
              <TabButton 
                key={t.id}
                className={activeTab === t.id ? 'active' : ''}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon}
                <span>{t.label}</span>
              </TabButton>
            ))}
          </TabNav>

          {/* Form Content Managers */}
          <FormWrapper>
            {activeTab === 'personal' && (
              <PersonalInfo 
                data={portfolio.personal} 
                onChange={(val) => handleDataChange('personal', val)} 
              />
            )}
            {activeTab === 'skills' && (
              <SkillsManager 
                skills={portfolio.skills} 
                onChange={(val) => handleDataChange('skills', val)} 
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsManager 
                projects={portfolio.projects} 
                onChange={(val) => handleDataChange('projects', val)} 
              />
            )}
            {activeTab === 'experience' && (
              <ExperienceManager 
                experience={portfolio.experience} 
                onChange={(val) => handleDataChange('experience', val)} 
              />
            )}
            {activeTab === 'education' && (
              <EducationManager 
                education={portfolio.education} 
                onChange={(val) => handleDataChange('education', val)} 
              />
            )}
            {activeTab === 'socials' && (
              <SocialLinks 
                data={portfolio.socials} 
                onChange={(val) => handleDataChange('socials', val)} 
              />
            )}
          </FormWrapper>
        </EditorPanel>

        {/* Real-time preview panel */}
        {showPreview && (
          <PreviewPanel>
            <PreviewTitleFlex>
              <span>Real-Time Preview</span>
              <LiveIndicator />
            </PreviewTitleFlex>
            <PreviewContentWrapper>
              <PortfolioPreview data={portfolio} />
            </PreviewContentWrapper>
          </PreviewPanel>
        )}
      </WorkspaceGrid>
    </PageContainer>
  );
};

// Animations
const slideDown = keyframes`
  from {
    transform: translateY(-50px) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

const loadingPulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

// Styled Components
const PageContainer = styled.div`
  height: calc(100vh - 70px);
  background: ${theme.colors.background};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  color: ${theme.colors.textSecondary};
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  animation: ${loadingPulse} 1.5s infinite ease-in-out;
  background: ${theme.colors.background};
`;

const Toast = styled.div`
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  color: white;
  animation: ${slideDown} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);

  &.success {
    background: rgba(0, 200, 83, 0.95);
    border: 1px solid rgba(0, 200, 83, 0.3);
  }

  &.error {
    background: rgba(255, 107, 107, 0.95);
    border: 1px solid rgba(255, 107, 107, 0.3);
  }
`;

const WorkspaceGrid = styled.div`
  display: grid;
  height: 100%;
  
  &.split {
    grid-template-columns: 1fr 1fr;
  }
  &.full {
    grid-template-columns: 1fr;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr !important;
  }
`;

const EditorPanel = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid ${theme.colors.border};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const ActionsFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  width: 38px;
  height: 38px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${theme.colors.textPrimary};
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textPrimary};
  padding: 0 1.2rem;
  height: 38px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: ${theme.colors.accent};
  color: #0F172A;
  border: none;
  padding: 0 1.2rem;
  height: 38px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 10px ${theme.colors.glow};

  &:hover {
    background: ${theme.colors.accentHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProgressSection = styled.div`
  background: rgba(255,255,255,0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.accent}, #00c853);
  border-radius: 3px;
  transition: width 0.5s ease-out;
`;

const TabNav = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid ${theme.colors.border};
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
  }
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.6rem 1rem;
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.textPrimary};
  }

  &.active {
    color: ${theme.colors.accent};
    border-bottom-color: ${theme.colors.accent};
  }
`;

const FormWrapper = styled.div`
  flex: 1;
`;

const PreviewPanel = styled.div`
  background: #090e1a;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  @media (max-width: 1024px) {
    display: none; /* Hide preview panel on screens where it collapses */
  }
`;

const PreviewTitleFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const LiveIndicator = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00c853;
  box-shadow: 0 0 8px #00c853;
`;

const PreviewContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export default BuilderPage;
