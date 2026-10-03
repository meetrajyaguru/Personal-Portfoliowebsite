import React from 'react';
import styled from 'styled-components';
import { Link } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import { theme } from '../styles/theme';

const SocialLinks = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <FormContainer>
      <FormGrid>
        <InputGroup>
          <Label><Github size={14} /> GitHub Profile URL</Label>
          <Input 
            type="url" 
            placeholder="https://github.com/username" 
            value={data.github || ''} 
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label><Linkedin size={14} /> LinkedIn Profile URL</Label>
          <Input 
            type="url" 
            placeholder="https://linkedin.com/in/username" 
            value={data.linkedin || ''} 
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </InputGroup>

        <InputGroup style={{ gridColumn: 'span 2' }}>
          <Label><Twitter size={14} /> Twitter / X Profile URL</Label>
          <Input 
            type="url" 
            placeholder="https://x.com/username" 
            value={data.twitter || ''} 
            onChange={(e) => handleChange('twitter', e.target.value)}
          />
        </InputGroup>
      </FormGrid>

      <CustomLinkHeading>
        <Link size={15} />
        <span>Custom Extra Link</span>
      </CustomLinkHeading>

      <FormGrid>
        <InputGroup>
          <Label>Link Label</Label>
          <Input 
            type="text" 
            placeholder="e.g. Medium Blog, Dribbble" 
            value={data.customLabel || ''} 
            onChange={(e) => handleChange('customLabel', e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Link URL</Label>
          <Input 
            type="url" 
            placeholder="https://example.com" 
            value={data.customUrl || ''} 
            onChange={(e) => handleChange('customUrl', e.target.value)}
          />
        </InputGroup>
      </FormGrid>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

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
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  color: ${theme.colors.textPrimary};
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 3px ${theme.colors.glow};
  }
`;

const CustomLinkHeading = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
  margin: 2rem 0 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 1.5rem;
`;

export default SocialLinks;
