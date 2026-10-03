import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { theme } from '../styles/theme';

const EducationManager = ({ education, onChange }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');

  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!degree.trim() || !institution.trim()) {
      alert("Please fill in degree and institution.");
      return;
    }

    const newEdu = {
      id: Date.now().toString(),
      degree: degree.trim(),
      institution: institution.trim(),
      year: year.trim()
    };

    onChange([...education, newEdu]);

    // Reset Form
    setDegree('');
    setInstitution('');
    setYear('');
    setShowAddForm(false);
  };

  const handleRemoveEducation = (id) => {
    if (window.confirm("Are you sure you want to remove this education entry?")) {
      onChange(education.filter(edu => edu.id !== id));
    }
  };

  return (
    <Container>
      <HeaderRow>
        <SectionTitle>Education & Certifications ({education.length})</SectionTitle>
        {!showAddForm && (
          <ToggleFormButton type="button" onClick={() => setShowAddForm(true)}>
            <Plus size={16} />
            <span>Add Education</span>
          </ToggleFormButton>
        )}
      </HeaderRow>

      {showAddForm && (
        <FormCard onSubmit={handleAddEducation}>
          <FormTitle>Add Academic Detail</FormTitle>
          <FormGrid>
            <InputGroup>
              <Label>Degree / Certification*</Label>
              <Input 
                type="text" 
                placeholder="e.g. B.S. in Computer Science" 
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Institution Name*</Label>
              <Input 
                type="text" 
                placeholder="e.g. Stanford University" 
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup style={{ gridColumn: 'span 2' }}>
              <Label>Year of Graduation (e.g. 2024)*</Label>
              <Input 
                type="text" 
                placeholder="e.g. 2022" 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </InputGroup>
          </FormGrid>

          <FormActions>
            <CancelButton type="button" onClick={() => setShowAddForm(false)}>Cancel</CancelButton>
            <SubmitButton type="submit">Save Entry</SubmitButton>
          </FormActions>
        </FormCard>
      )}

      {education.length === 0 ? (
        <EmptyEducation>
          <GraduationCap size={36} color={theme.colors.textMuted} />
          <p>No education details added yet. Let others know where you studied!</p>
        </EmptyEducation>
      ) : (
        <EducationList>
          {education.map(edu => (
            <EducationItem key={edu.id}>
              <ItemContent>
                <CapIconWrapper>
                  <GraduationCap size={20} color={theme.colors.accent} />
                </CapIconWrapper>
                <ItemText>
                  <DegreeTitle>{edu.degree}</DegreeTitle>
                  <InstitutionText>{edu.institution} • <YearSpan>Graduated: {edu.year}</YearSpan></InstitutionText>
                </ItemText>
              </ItemContent>
              <DeleteButton type="button" onClick={() => handleRemoveEducation(edu.id)}>
                <Trash2 size={15} />
              </DeleteButton>
            </EducationItem>
          ))}
        </EducationList>
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

const EmptyEducation = styled.div`
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

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EducationItem = styled.div`
  background: rgba(255,255,255,0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(105, 175, 220, 0.15);
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CapIconWrapper = styled.div`
  background: rgba(105, 175, 220, 0.08);
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid rgba(105, 175, 220, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemText = styled.div``;

const DegreeTitle = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const InstitutionText = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const YearSpan = styled.span`
  color: ${theme.colors.accent};
  font-weight: 500;
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

export default EducationManager;
