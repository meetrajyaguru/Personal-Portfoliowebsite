import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, Briefcase, Calendar } from 'lucide-react';
import { theme } from '../styles/theme';

const ExperienceManager = ({ experience, onChange }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [achievements, setAchievements] = useState('');

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      alert("Please fill in company name and role.");
      return;
    }

    const newExp = {
      id: Date.now().toString(),
      company: company.trim(),
      role: role.trim(),
      duration: duration.trim(),
      achievements: achievements.trim()
    };

    onChange([...experience, newExp]);

    // Reset Form
    setCompany('');
    setRole('');
    setDuration('');
    setAchievements('');
    setShowAddForm(false);
  };

  const handleRemoveExperience = (id) => {
    if (window.confirm("Are you sure you want to remove this experience?")) {
      onChange(experience.filter(e => e.id !== id));
    }
  };

  return (
    <Container>
      <HeaderRow>
        <SectionTitle>Work Experience ({experience.length})</SectionTitle>
        {!showAddForm && (
          <ToggleFormButton type="button" onClick={() => setShowAddForm(true)}>
            <Plus size={16} />
            <span>Add Experience</span>
          </ToggleFormButton>
        )}
      </HeaderRow>

      {showAddForm && (
        <FormCard onSubmit={handleAddExperience}>
          <FormTitle>Add Professional Position</FormTitle>
          <FormGrid>
            <InputGroup>
              <Label>Company Name*</Label>
              <Input 
                type="text" 
                placeholder="e.g. Google" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Role / Position*</Label>
              <Input 
                type="text" 
                placeholder="e.g. Senior Frontend Developer" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup style={{ gridColumn: 'span 2' }}>
              <Label>Duration (e.g. June 2023 - Present)*</Label>
              <Input 
                type="text" 
                placeholder="e.g. Jan 2021 - Present" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </InputGroup>
          </FormGrid>

          <InputGroup style={{ marginTop: '1.25rem' }}>
            <Label>Key Achievements & Responsibilities</Label>
            <Textarea 
              placeholder="- Built dynamic landing pages improving signup rates by 25%
- Led a team of 4 engineers to rebuild the app core engine..." 
              value={achievements}
              rows="4"
              onChange={(e) => setAchievements(e.target.value)}
            />
          </InputGroup>

          <FormActions>
            <CancelButton type="button" onClick={() => setShowAddForm(false)}>Cancel</CancelButton>
            <SubmitButton type="submit">Save Experience</SubmitButton>
          </FormActions>
        </FormCard>
      )}

      {experience.length === 0 ? (
        <EmptyExperience>
          <Briefcase size={36} color={theme.colors.textMuted} />
          <p>No work experience added yet. Show off your career milestone accomplishments!</p>
        </EmptyExperience>
      ) : (
        <ExperienceList>
          {experience.map(exp => (
            <ExperienceItem key={exp.id}>
              <ItemHeader>
                <div>
                  <RoleTitle>{exp.role}</RoleTitle>
                  <CompanyText>{exp.company}</CompanyText>
                </div>
                <DeleteButton type="button" onClick={() => handleRemoveExperience(exp.id)}>
                  <Trash2 size={15} />
                </DeleteButton>
              </ItemHeader>
              
              <DurationFlex>
                <Calendar size={13} />
                <span>{exp.duration}</span>
              </DurationFlex>

              {exp.achievements && (
                <AchievementsText>{exp.achievements}</AchievementsText>
              )}
            </ExperienceItem>
          ))}
        </ExperienceList>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const ToggleFormButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(105, 175, 220, 0.1);
  border: 1px solid rgba(105, 175, 220, 0.2);
  color: ${theme.colors.accent};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(105, 175, 220, 0.15);
    color: ${theme.colors.textPrimary};
  }
`;

const FormCard = styled.form`
  background: rgba(255,255,255,0.02);
  border: 1px solid ${theme.colors.border};
  padding: 1.75rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  margin-bottom: 1.25rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    
    & > div {
      grid-column: span 1 !important;
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  color: ${theme.colors.textPrimary};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 3px ${theme.colors.glow};
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  color: ${theme.colors.textPrimary};
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 3px ${theme.colors.glow};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 1.25rem;
`;

const CancelButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.03);
    color: ${theme.colors.textPrimary};
  }
`;

const SubmitButton = styled.button`
  background: ${theme.colors.accent};
  color: #0F172A;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.accentHover};
    transform: translateY(-1px);
  }
`;

const EmptyExperience = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1.5rem;
  border: 1.5px dashed ${theme.colors.border};
  border-radius: 12px;
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExperienceItem = styled.div`
  background: rgba(255,255,255,0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(105, 175, 220, 0.15);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const RoleTitle = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const CompanyText = styled.span`
  color: ${theme.colors.accent};
  font-size: 0.9rem;
  font-weight: 500;
  display: block;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: ${theme.colors.danger};
    background: rgba(255,107,107,0.1);
  }
`;

const DurationFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${theme.colors.textSecondary};
  font-size: 0.75rem;
  margin: 0.5rem 0 0.75rem 0;
`;

const AchievementsText = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  white-space: pre-line;
  line-height: 1.4;
`;

export default ExperienceManager;
