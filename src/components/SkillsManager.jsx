import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, X, Award } from 'lucide-react';
import { theme } from '../styles/theme';

const SkillsManager = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState('Frontend');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    // Check if skill already exists in this category
    const exists = skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase() && s.category === category);
    if (exists) {
      alert("This skill is already listed in this category.");
      return;
    }

    const updated = [...skills, { name: newSkill.trim(), category }];
    onChange(updated);
    setNewSkill('');
  };

  const handleRemove = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated);
  };

  // Group current skills for rendering
  const categories = ['Frontend', 'Backend', 'Database', 'Tools'];
  
  return (
    <Container>
      <Form onSubmit={handleAdd}>
        <InputGroup>
          <Label><Award size={14} /> Skill Name</Label>
          <Input 
            type="text" 
            placeholder="e.g. React, Node.js, PostgreSQL" 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Category</Label>
          <Select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </InputGroup>

        <AddButton type="submit">
          <Plus size={16} />
          <span>Add</span>
        </AddButton>
      </Form>

      <SkillsDisplay>
        {categories.map(cat => {
          const categorySkills = skills.map((s, i) => ({ ...s, originalIndex: i })).filter(s => s.category === cat);
          
          return (
            <CategorySection key={cat}>
              <CategoryTitle>{cat}</CategoryTitle>
              <BadgeGrid>
                {categorySkills.length === 0 ? (
                  <EmptyCategoryText>No {cat.toLowerCase()} skills added</EmptyCategoryText>
                ) : (
                  categorySkills.map(s => (
                    <SkillBadge key={s.originalIndex}>
                      <span>{s.name}</span>
                      <DeleteBadgeButton 
                        type="button" 
                        onClick={() => handleRemove(s.originalIndex)}
                      >
                        <X size={12} />
                      </DeleteBadgeButton>
                    </SkillBadge>
                  ))
                )}
              </BadgeGrid>
            </CategorySection>
          );
        })}
      </SkillsDisplay>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  background: rgba(255,255,255,0.01);
  border: 1px solid ${theme.colors.border};
  padding: 1.25rem;
  border-radius: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
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

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: #17202B;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  color: ${theme.colors.textPrimary};
  font-size: 0.9rem;
  height: 42px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.glow};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: ${theme.colors.accent};
  color: #0F172A;
  border: none;
  border-radius: 10px;
  height: 42px;
  padding: 0 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.accentHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SkillsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CategoryTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding-bottom: 0.25rem;
`;

const BadgeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  min-height: 40px;
  align-items: center;
`;

const SkillBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  font-size: 0.85rem;
  color: ${theme.colors.textPrimary};
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.accent};
    background: rgba(105, 175, 220, 0.04);
  }
`;

const DeleteBadgeButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.1rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${theme.colors.danger};
    background: rgba(255, 107, 107, 0.1);
  }
`;

const EmptyCategoryText = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
  font-style: italic;
`;

export default SkillsManager;
