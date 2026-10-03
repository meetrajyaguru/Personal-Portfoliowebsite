import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus, Edit2, Download, Trash2, Calendar, FileText } from 'lucide-react';
import { theme } from '../styles/theme';
import { exportPortfolioToHtml } from '../services/exporter';

const DashboardPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const navigate = useNavigate();

  // Load portfolios from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfoliopro_portfolios');
    if (saved) {
      try {
        setPortfolios(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse portfolios:", e);
      }
    }
  }, []);

  const handleCreateNew = () => {
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

    const updated = [...portfolios, newPortfolio];
    setPortfolios(updated);
    localStorage.setItem('portfoliopro_portfolios', JSON.stringify(updated));
    navigate(`/builder/${newId}`);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      const updated = portfolios.filter(p => p.id !== id);
      setPortfolios(updated);
      localStorage.setItem('portfoliopro_portfolios', JSON.stringify(updated));
    }
  };

  const handleExport = (portfolio, e) => {
    e.stopPropagation();
    exportPortfolioToHtml(portfolio);
  };

  return (
    <DashboardContainer>
      <HeaderSection>
        <div>
          <Title>Your Portfolios</Title>
          <Subtitle>Manage and build your developer portfolio websites.</Subtitle>
        </div>
        <CreateButton onClick={handleCreateNew}>
          <Plus size={18} />
          <span>New Portfolio</span>
        </CreateButton>
      </HeaderSection>

      {portfolios.length === 0 ? (
        <EmptyState>
          <EmptyIconWrapper>
            <FileText size={48} color={theme.colors.accent} />
          </EmptyIconWrapper>
          <EmptyTitle>No Portfolios Found</EmptyTitle>
          <EmptyText>Get started by creating your very first professional portfolio dashboard website!</EmptyText>
          <EmptyButton onClick={handleCreateNew}>
            <Plus size={18} />
            <span>Create Portfolio</span>
          </EmptyButton>
        </EmptyState>
      ) : (
        <PortfoliosGrid>
          {portfolios.map(p => (
            <PortfolioCard key={p.id} onClick={() => navigate(`/builder/${p.id}`)}>
              <CardGlow />
              <CardContent>
                <CardHeader>
                  <CardTitle>{p.personal.name || p.name}</CardTitle>
                  <CardSubtitle>{p.personal.title || "No Title Specified"}</CardSubtitle>
                </CardHeader>

                <CardMeta>
                  <Calendar size={14} />
                  <span>Updated: {p.lastUpdated}</span>
                </CardMeta>

                <CardActions>
                  <ActionButton 
                    className="edit"
                    onClick={(e) => { e.stopPropagation(); navigate(`/builder/${p.id}`); }}
                    title="Edit Portfolio"
                  >
                    <Edit2 size={16} />
                    <span>Edit</span>
                  </ActionButton>
                  <ActionButton 
                    className="export"
                    onClick={(e) => handleExport(p, e)}
                    title="Export to HTML"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </ActionButton>
                  <ActionButton 
                    className="delete"
                    onClick={(e) => handleDelete(p.id, e)}
                    title="Delete Portfolio"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </ActionButton>
                </CardActions>
              </CardContent>
            </PortfolioCard>
          ))}
          
          <AddCardPlaceholder onClick={handleCreateNew}>
            <Plus size={36} color={theme.colors.accent} />
            <span>Create New Portfolio</span>
          </AddCardPlaceholder>
        </PortfoliosGrid>
      )}
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  background: ${theme.gradients.bg};
  color: ${theme.colors.textPrimary};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.gradients.accent};
  color: #0F172A;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(105, 175, 220, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(105, 175, 220, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PortfoliosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const CardGlow = styled.div`
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg, rgba(105, 175, 220, 0.4) 0%, rgba(0,0,0,0) 50%);
  border-radius: 20px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const PortfolioCard = styled.div`
  position: relative;
  background: ${theme.colors.cardBg};
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  ${theme.effects.glass};

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(105, 175, 220, 0.25);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    ${CardGlow} {
      opacity: 1;
    }
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: space-between;
`;

const CardHeader = styled.div``;

const CardTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: ${theme.colors.textPrimary};
  margin-bottom: 0.25rem;
`;

const CardSubtitle = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.9rem;
  font-weight: 500;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textMuted};
  font-size: 0.8rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  color: ${theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.textPrimary};
    background: rgba(255, 255, 255, 0.06);
  }

  &.edit:hover {
    color: ${theme.colors.accent};
    border-color: rgba(105, 175, 220, 0.2);
    background: rgba(105, 175, 220, 0.05);
  }

  &.export:hover {
    color: ${theme.colors.success};
    border-color: rgba(0, 200, 83, 0.2);
    background: rgba(0, 200, 83, 0.05);
  }

  &.delete:hover {
    color: ${theme.colors.danger};
    border-color: rgba(255, 107, 107, 0.2);
    background: rgba(255, 107, 107, 0.05);
  }
`;

const AddCardPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 240px;
  border: 2px dashed ${theme.colors.border};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${theme.colors.textSecondary};
  font-weight: 500;
  font-size: 0.95rem;

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.textPrimary};
    background: rgba(105, 175, 220, 0.02);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  background: ${theme.colors.cardBg};
  border: 1px solid ${theme.colors.border};
  border-radius: 24px;
  max-width: 600px;
  margin: 4rem auto;
  ${theme.effects.glass};
`;

const EmptyIconWrapper = styled.div`
  background: rgba(105, 175, 220, 0.1);
  padding: 1.5rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(105, 175, 220, 0.15);
`;

const EmptyTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 400px;
  font-size: 0.95rem;
`;

const EmptyButton = styled(CreateButton)``;

export default DashboardPage;
