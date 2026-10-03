import React from 'react';
import styled from 'styled-components';
import { ExternalLink, MapPin, Mail, Sparkles, GraduationCap } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import { theme } from '../styles/theme';

const PortfolioPreview = ({ data }) => {
  const {
    personal = {},
    skills = [],
    projects = [],
    experience = [],
    education = [],
    socials = {}
  } = data;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {});

  return (
    <PreviewWrapper>
      <PreviewContainer>
        <Header>
          {personal.image ? (
            <ProfileImg src={personal.image} alt={personal.name || 'Profile'} />
          ) : (
            <ProfileImgPlaceholder>
              <span>{personal.name ? personal.name.charAt(0) : '?'}</span>
            </ProfileImgPlaceholder>
          )}
          
          <InfoSection>
            <Name>{personal.name || 'Your Name'}</Name>
            <Title>{personal.title || 'Professional Title'}</Title>
            <Bio>{personal.bio || 'Your short biography and details will appear here as you fill in the builder form.'}</Bio>
            
            <MetaDetails>
              {personal.location && (
                <MetaItem>
                  <MapPin size={12} />
                  <span>{personal.location}</span>
                </MetaItem>
              )}
              {personal.email && (
                <MetaItem>
                  <Mail size={12} />
                  <span>{personal.email}</span>
                </MetaItem>
              )}
            </MetaDetails>

            <SocialsRow>
              {socials.github && (
                <SocialIcon href={socials.github} target="_blank" title="GitHub">
                  <Github size={16} />
                </SocialIcon>
              )}
              {socials.linkedin && (
                <SocialIcon href={socials.linkedin} target="_blank" title="LinkedIn">
                  <Linkedin size={16} />
                </SocialIcon>
              )}
              {socials.twitter && (
                <SocialIcon href={socials.twitter} target="_blank" title="Twitter / X">
                  <Twitter size={16} />
                </SocialIcon>
              )}
              {socials.customUrl && socials.customLabel && (
                <CustomSocialLink href={socials.customUrl} target="_blank">
                  {socials.customLabel}
                </CustomSocialLink>
              )}
            </SocialsRow>
          </InfoSection>
        </Header>

        {skills.length > 0 && (
          <Section>
            <SectionHeading>Skills</SectionHeading>
            <SkillsGrid>
              {Object.entries(skillsByCategory).map(([category, items]) => (
                <SkillCategoryCard key={category}>
                  <CategoryTitle>{category}</CategoryTitle>
                  <BadgeContainer>
                    {items.map((skill, idx) => (
                      <SkillBadge key={idx}>{skill}</SkillBadge>
                    ))}
                  </BadgeContainer>
                </SkillCategoryCard>
              ))}
            </SkillsGrid>
          </Section>
        )}

        {projects.length > 0 && (
          <Section>
            <SectionHeading>Featured Projects</SectionHeading>
            <ProjectsGrid>
              {projects.map(p => (
                <ProjectCard key={p.id}>
                  {p.image ? (
                    <ProjectImage src={p.image} alt={p.title} />
                  ) : (
                    <ProjectImagePlaceholder>Code Example</ProjectImagePlaceholder>
                  )}
                  <ProjectCardBody>
                    <ProjectTitle>{p.title}</ProjectTitle>
                    <ProjectDesc>{p.description}</ProjectDesc>
                    {p.tech && (
                      <TechRow>
                        {p.tech.split(',').map((t, idx) => (
                          <TechTag key={idx}>{t.trim()}</TechTag>
                        ))}
                      </TechRow>
                    )}
                    <ProjectLinks>
                      {p.demoUrl && (
                        <ProjectLink href={p.demoUrl} target="_blank">
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </ProjectLink>
                      )}
                      {p.githubUrl && (
                        <ProjectLink href={p.githubUrl} target="_blank">
                          <span>GitHub</span>
                          <Github size={12} />
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectCardBody>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </Section>
        )}

        {experience.length > 0 && (
          <Section>
            <SectionHeading>Experience</SectionHeading>
            <Timeline>
              {experience.map(exp => (
                <TimelineItem key={exp.id}>
                  <TimelineDot />
                  <TimelineHeader>
                    <RoleText>{exp.role}</RoleText>
                    <CompanyText>{exp.company}</CompanyText>
                  </TimelineHeader>
                  <TimelineDuration>{exp.duration}</TimelineDuration>
                  <TimelineAchievements>{exp.achievements}</TimelineAchievements>
                </TimelineItem>
              ))}
            </Timeline>
          </Section>
        )}

        {education.length > 0 && (
          <Section>
            <SectionHeading>Education</SectionHeading>
            <EducationGrid>
              {education.map(edu => (
                <EduCard key={edu.id}>
                  <GraduationCap size={18} color={theme.colors.accent} style={{ marginBottom: '0.5rem' }} />
                  <EduDegree>{edu.degree}</EduDegree>
                  <EduInst>{edu.institution}</EduInst>
                  <EduYear>Class of {edu.year}</EduYear>
                </EduCard>
              ))}
            </EducationGrid>
          </Section>
        )}
      </PreviewContainer>
    </PreviewWrapper>
  );
};

// Styled Components
const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0F172A;
  background-image: linear-gradient(135deg, #0F172A 0%, #1A2A3C 100%);
  color: ${theme.colors.textPrimary};
  overflow-y: auto;
  border-radius: 16px;
  border: 1px solid ${theme.colors.border};
`;

const PreviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.accent};
  box-shadow: 0 0 15px ${theme.colors.glow};
`;

const ProfileImgPlaceholder = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: rgba(105, 175, 220, 0.1);
  border: 2px dashed ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${theme.colors.accent};
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 600px) {
    align-items: center;
  }
`;

const Name = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 0.25rem;
`;

const Title = styled.h2`
  font-size: 1.15rem;
  color: ${theme.colors.accent};
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const MetaDetails = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
`;

const SocialsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const SocialIcon = styled.a`
  color: ${theme.colors.textSecondary};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    color: ${theme.colors.accent};
    border-color: ${theme.colors.accent};
    background: rgba(105, 175, 220, 0.05);
  }
`;

const CustomSocialLink = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  color: ${theme.colors.accent};
  border: 1px solid rgba(105, 175, 220, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: rgba(105, 175, 220, 0.05);
  transition: all 0.2s;

  &:hover {
    background: rgba(105, 175, 220, 0.1);
    color: ${theme.colors.textPrimary};
  }
`;

const Section = styled.section`
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeading = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${theme.colors.textPrimary};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 24px;
    height: 2px;
    background: ${theme.colors.accent};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

const SkillCategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
`;

const CategoryTitle = styled.h4`
  font-size: 0.85rem;
  color: ${theme.colors.accent};
  margin-bottom: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 0.25rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const SkillBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  color: ${theme.colors.textSecondary};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-bottom: 1px solid ${theme.colors.border};
`;

const ProjectImagePlaceholder = styled.div`
  width: 100%;
  height: 120px;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  border-bottom: 1px solid ${theme.colors.border};
`;

const ProjectCardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProjectDesc = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.4;
  margin-bottom: 0.75rem;
  flex-grow: 1;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  font-size: 0.65rem;
  padding: 0.15rem 0.35rem;
  background: rgba(105, 175, 220, 0.06);
  border: 1px solid rgba(105, 175, 220, 0.1);
  border-radius: 4px;
  color: ${theme.colors.accent};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  text-decoration: none;
  color: ${theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const Timeline = styled.div`
  border-left: 1.5px solid ${theme.colors.border};
  padding-left: 1.5rem;
  margin-left: 0.5rem;
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: calc(-1.5rem - 5px);
  top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.accent};
  border: 2px solid #0F172A;
  box-shadow: 0 0 5px ${theme.colors.accent};
`;

const TimelineHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
`;

const RoleText = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const CompanyText = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.accent};
  font-weight: 500;
`;

const TimelineDuration = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  margin-bottom: 0.5rem;
`;

const TimelineAchievements = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  white-space: pre-line;
  line-height: 1.4;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const EduCard = styled.div`
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const EduDegree = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.2rem;
`;

const EduInst = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

const EduYear = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.accent};
  font-weight: 500;
`;

export default PortfolioPreview;
