import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, Globe, Code, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Github } from './BrandIcons';
import { theme } from '../styles/theme';

const ProjectsManager = ({ projects, onChange }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [image, setImage] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in project title and description.");
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      tech: tech.trim(),
      image,
      demoUrl: demoUrl.trim(),
      githubUrl: githubUrl.trim()
    };

    onChange([...projects, newProject]);
    
    // Reset Form
    setTitle('');
    setDescription('');
    setTech('');
    setImage('');
    setDemoUrl('');
    setGithubUrl('');
    setShowAddForm(false);
  };

  const handleRemoveProject = (id) => {
    if (window.confirm("Are you sure you want to remove this project?")) {
      onChange(projects.filter(p => p.id !== id));
    }
  };

  return (
    <Container>
      <HeaderRow>
        <SectionTitle>Your Projects ({projects.length})</SectionTitle>
        {!showAddForm && (
          <ToggleFormButton type="button" onClick={() => setShowAddForm(true)}>
            <Plus size={16} />
            <span>Add Project</span>
          </ToggleFormButton>
        )}
      </HeaderRow>

      {showAddForm && (
        <FormCard onSubmit={handleAddProject}>
          <FormTitle>New Project Details</FormTitle>
          <FormGrid>
            <InputGroup>
              <Label>Project Title*</Label>
              <Input 
                type="text" 
                placeholder="e.g. Chat App" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Technologies (comma separated)</Label>
              <Input 
                type="text" 
                placeholder="e.g. React, Node.js, Socket.io" 
                value={tech} 
                onChange={(e) => setTech(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <Label>Live Demo URL</Label>
              <Input 
                type="url" 
                placeholder="https://demo.example.com" 
                value={demoUrl} 
                onChange={(e) => setDemoUrl(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <Label>GitHub URL</Label>
              <Input 
                type="url" 
                placeholder="https://github.com/user/repo" 
                value={githubUrl} 
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </InputGroup>
          </FormGrid>

          <InputGroup style={{ marginTop: '1.25rem' }}>
            <Label>Description*</Label>
            <Textarea 
              placeholder="A brief overview of the project, including features and architectural structure..." 
              value={description} 
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </InputGroup>

          <UploadFlex>
            <InputGroup style={{ flex: 1 }}>
              <Label>Project Cover Image</Label>
              <UploadLabel>
                <ImageIcon size={18} />
                <span>Choose Project Image</span>
                <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
              </UploadLabel>
            </InputGroup>
            
            {image && (
              <ImagePreviewWrapper>
                <PreviewImg src={image} alt="Project Preview" />
                <RemovePreviewImg type="button" onClick={() => setImage('')}>X</RemovePreviewImg>
              </ImagePreviewWrapper>
            )}
          </UploadFlex>

          <FormActions>
            <CancelButton type="button" onClick={() => setShowAddForm(false)}>Cancel</CancelButton>
            <SubmitButton type="submit">Save Project</SubmitButton>
          </FormActions>
        </FormCard>
      )}

      {projects.length === 0 ? (
        <EmptyProjects>
          <Code size={36} color={theme.colors.textMuted} />
          <p>No projects added yet. Click "Add Project" to display your work!</p>
        </EmptyProjects>
      ) : (
        <ProjectsGrid>
          {projects.map(p => (
            <ProjectCard key={p.id}>
              {p.image ? (
                <CardImageWrapper>
                  <CardImage src={p.image} alt={p.title} />
                </CardImageWrapper>
              ) : (
                <CardImagePlaceholder>
                  <Code size={32} color={theme.colors.border} />
                </CardImagePlaceholder>
              )}
              <CardBody>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <DeleteProjectButton type="button" onClick={() => handleRemoveProject(p.id)}>
                    <Trash2 size={15} />
                  </DeleteProjectButton>
                </CardHeader>
                <CardDescription>{p.description}</CardDescription>
                {p.tech && (
                  <TechTags>
                    {p.tech.split(',').map((t, idx) => (
                      <TechTag key={idx}>{t.trim()}</TechTag>
                    ))}
                  </TechTags>
                )}
                <CardLinks>
                  {p.demoUrl && (
                    <CardLink href={p.demoUrl} target="_blank">
                      <Globe size={14} />
                      <span>Live Demo</span>
                    </CardLink>
                  )}
                  {p.githubUrl && (
                    <CardLink href={p.githubUrl} target="_blank">
                      <Github size={14} />
                      <span>GitHub</span>
                    </CardLink>
                  )}
                </CardLinks>
              </CardBody>
            </ProjectCard>
          ))}
        </ProjectsGrid>
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

const UploadFlex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  margin-top: 1.25rem;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.textPrimary};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 70px;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.border};
  overflow: hidden;
  background: rgba(0,0,0,0.2);
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemovePreviewImg = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: rgba(255,107,107,0.85);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

const EmptyProjects = styled.div`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.5rem;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(105, 175, 220, 0.2);
    transform: translateY(-2px);
  }
`;

const CardImageWrapper = styled.div`
  height: 140px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardImagePlaceholder = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.15);
  border-bottom: 1px solid ${theme.colors.border};
`;

const CardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
`;

const DeleteProjectButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.danger};
    background: rgba(255,107,107,0.1);
  }
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.4;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background: rgba(105, 175, 220, 0.08);
  border: 1px solid rgba(105, 175, 220, 0.15);
  border-radius: 4px;
  color: ${theme.colors.accent};
`;

const CardLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 0.75rem;
`;

const CardLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

export default ProjectsManager;
