import React, { useState } from 'react';
import styled from 'styled-components';
import { Settings, Database, Paintbrush, Shield, CheckCircle2 } from 'lucide-react';
import { theme } from '../styles/theme';

const SettingsPage = () => {
  const [dbMode, setDbMode] = useState('local');
  const [selectedTheme, setSelectedTheme] = useState('dark-navy');
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Header>
          <Settings size={28} color={theme.colors.accent} />
          <div>
            <Title>Settings</Title>
            <Subtitle>Configure application preferences and data connections.</Subtitle>
          </div>
        </Header>

        {showSaved && (
          <SavedToast>
            <CheckCircle2 size={16} />
            <span>Preferences saved successfully!</span>
          </SavedToast>
        )}

        <SettingsCard>
          <Section>
            <SectionTitle><Paintbrush size={16} /> Visual Styling Theme</SectionTitle>
            <OptionGroup>
              <OptionCard 
                className={selectedTheme === 'dark-navy' ? 'active' : ''} 
                onClick={() => setSelectedTheme('dark-navy')}
              >
                <ThemePreview className="navy" />
                <OptionLabel>Sophisticated Navy (Default)</OptionLabel>
              </OptionCard>
              
              <OptionCard 
                className={selectedTheme === 'pure-dark' ? 'active' : ''} 
                onClick={() => setSelectedTheme('pure-dark')}
              >
                <ThemePreview className="pure" />
                <OptionLabel>Pure Dark (Midnight)</OptionLabel>
              </OptionCard>
            </OptionGroup>
          </Section>

          <Section>
            <SectionTitle><Database size={16} /> Data Connection Engine</SectionTitle>
            <DescText>Choose where your generated portfolios and draft inputs are stored.</DescText>
            <OptionGroup>
              <OptionCard 
                className={dbMode === 'local' ? 'active' : ''} 
                onClick={() => setDbMode('local')}
              >
                <OptionHeader>
                  <OptionLabel>LocalStorage Database</OptionLabel>
                  <Badge>Active</Badge>
                </OptionHeader>
                <OptionDesc>Store all data locally inside your web browser. Zero setup, fast and secure.</OptionDesc>
              </OptionCard>

              <OptionCard 
                className={dbMode === 'firebase' ? 'active' : ''} 
                onClick={() => setDbMode('firebase')}
              >
                <OptionHeader>
                  <OptionLabel>Firebase Cloud Database</OptionLabel>
                  <ComingSoonBadge>Optional Connector</ComingSoonBadge>
                </OptionHeader>
                <OptionDesc>Sync details across devices. Connect your custom Firebase config file.</OptionDesc>
              </OptionCard>
            </OptionGroup>
          </Section>

          <Section>
            <SectionTitle><Shield size={16} /> Developer Information & Storage</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <span>App Engine Version</span>
                <strong>v1.1.2-beta</strong>
              </InfoItem>
              <InfoItem>
                <span>Local Storage Used</span>
                <strong>~ 42 KB</strong>
              </InfoItem>
            </InfoGrid>
          </Section>

          <SaveButton onClick={handleSave}>Save Preferences</SaveButton>
        </SettingsCard>
      </ContentContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  padding: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  background: ${theme.gradients.bg};
  color: ${theme.colors.textPrimary};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.95rem;
  margin: 0;
`;

const SavedToast = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: ${theme.colors.success};
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,200,83,0.25);
`;

const SettingsCard = styled.div`
  background: ${theme.colors.cardBg};
  border: 1px solid ${theme.colors.border};
  border-radius: 24px;
  padding: 2.5rem;
  ${theme.effects.glass};
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.5rem;
`;

const DescText = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.textSecondary};
  margin-top: -0.5rem;
`;

const OptionGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled.div`
  background: rgba(255, 255, 255, 0.01);
  border: 1.5px solid ${theme.colors.border};
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: rgba(105, 175, 220, 0.25);
    background: rgba(255, 255, 255, 0.02);
  }

  &.active {
    border-color: ${theme.colors.accent};
    background: rgba(105, 175, 220, 0.04);
  }
`;

const ThemePreview = styled.div`
  height: 60px;
  border-radius: 8px;
  margin-bottom: 0.5rem;

  &.navy {
    background: linear-gradient(135deg, #0F172A 0%, #1A2A3C 100%);
    border: 1px solid rgba(105, 175, 220, 0.3);
  }

  &.pure {
    background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const OptionLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const OptionDesc = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.4;
`;

const Badge = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(0,200,83,0.15);
  color: #00c853;
  border: 1px solid rgba(0,200,83,0.25);
  border-radius: 6px;
  font-weight: bold;
`;

const ComingSoonBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(255,255,255,0.05);
  color: ${theme.colors.textMuted};
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  font-weight: 500;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  background: rgba(0,0,0,0.1);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${theme.colors.border};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  span {
    font-size: 0.75rem;
    color: ${theme.colors.textSecondary};
  }

  strong {
    font-size: 0.9rem;
    color: ${theme.colors.textPrimary};
  }
`;

const SaveButton = styled.button`
  background: ${theme.colors.accent};
  color: #0F172A;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(105, 175, 220, 0.25);

  &:hover {
    background: ${theme.colors.accentHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(105, 175, 220, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default SettingsPage;
