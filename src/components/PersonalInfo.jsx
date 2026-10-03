import React from 'react';
import styled from 'styled-components';
import { User, Briefcase, MapPin, Mail, AlignLeft, Image as ImageIcon, Trash2 } from 'lucide-react';
import { theme } from '../styles/theme';

const PersonalInfo = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleChange('image', '');
  };

  return (
    <FormContainer>
      <FormGrid>
        <InputGroup>
          <Label><User size={14} /> Full Name</Label>
          <Input 
            type="text" 
            placeholder="John Doe" 
            value={data.name || ''} 
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label><Briefcase size={14} /> Professional Title</Label>
          <Input 
            type="text" 
            placeholder="Lead Full Stack Engineer" 
            value={data.title || ''} 
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label><MapPin size={14} /> Location</Label>
          <Input 
            type="text" 
            placeholder="San Francisco, CA" 
            value={data.location || ''} 
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label><Mail size={14} /> Email Address</Label>
          <Input 
            type="email" 
            placeholder="john.doe@example.com" 
            value={data.email || ''} 
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </InputGroup>
      </FormGrid>

      <InputGroup style={{ marginTop: '1.5rem' }}>
        <Label><AlignLeft size={14} /> Short Bio</Label>
        <Textarea 
          placeholder="Crafting stunning user experiences and robust web architectures..." 
          value={data.bio || ''} 
          rows="3"
          onChange={(e) => handleChange('bio', e.target.value)}
        />
      </InputGroup>

      <UploadSection>
        <Label><ImageIcon size={14} /> Profile Picture</Label>
        <UploadFlex>
          {data.image ? (
            <ImagePreviewContainer>
              <ImagePreview src={data.image} alt="Profile Preview" />
              <RemoveImageButton type="button" onClick={removeImage} title="Remove image">
                <Trash2 size={14} />
              </RemoveImageButton>
            </ImagePreviewContainer>
          ) : (
            <UploadPlaceholder>
              <ImageIcon size={24} color={theme.colors.textSecondary} />
              <span>Upload Photo</span>
              <FileInput 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </UploadPlaceholder>
          )}
          <UploadInstructions>
            <p>Supported formats: JPG, PNG, GIF</p>
            <p>Maximum size: 2MB. Replaced in-place for web previews.</p>
          </UploadInstructions>
        </UploadFlex>
      </UploadSection>
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

const Textarea = styled.textarea`
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  color: ${theme.colors.textPrimary};
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 3px ${theme.colors.glow};
  }
`;

const UploadSection = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UploadFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const UploadPlaceholder = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 90px;
  height: 90px;
  border: 1.5px dashed ${theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.75rem;
  color: ${theme.colors.textSecondary};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.accent};
    background: rgba(105, 175, 220, 0.02);
    color: ${theme.colors.textPrimary};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 12px;
  border: 2px solid ${theme.colors.accent};
  box-shadow: 0 0 10px ${theme.colors.glow};
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 107, 107, 0.85);
  color: white;
  border: none;
  border-radius: 6px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.danger};
    transform: scale(1.05);
  }
`;

const UploadInstructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};

  p {
    margin: 0;
  }
`;

export default PersonalInfo;
