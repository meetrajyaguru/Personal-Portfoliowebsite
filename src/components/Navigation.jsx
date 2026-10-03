import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutDashboard, FileJson, Settings, Sparkles } from 'lucide-react';
import { theme } from '../styles/theme';

const Navigation = () => {
  const location = useLocation();
  const isBuilder = location.pathname.includes('/builder');
  
  return (
    <NavContainer>
      <NavBrand to="/">
        <LogoWrapper>
          <Sparkles size={20} color={theme.colors.accent} />
        </LogoWrapper>
        <LogoText>Portfolio<span>Pro</span></LogoText>
      </NavBrand>

      <NavItems>
        <NavItem to="/" end>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavItem>
        <NavItem to={isBuilder ? location.pathname : "/builder/new"}>
          <FileJson size={18} />
          <span>Builder</span>
        </NavItem>
      </NavItems>

      <SettingsButton to="/settings">
        <Settings size={18} />
        <span>Settings</span>
      </SettingsButton>
    </NavContainer>
  );
};

// Styled Components
const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: ${theme.colors.cardBg};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  z-index: 100;
  ${theme.effects.glass}
  box-shadow: ${theme.effects.shadow};

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const NavBrand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  background: rgba(105, 175, 220, 0.1);
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid rgba(105, 175, 220, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.textPrimary};
  letter-spacing: 0.5px;

  span {
    color: ${theme.colors.accent};
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    color: ${theme.colors.textPrimary};
    background: rgba(255, 255, 255, 0.03);
  }

  &.active {
    color: ${theme.colors.accent};
    background: rgba(105, 175, 220, 0.08);
    border-color: rgba(105, 175, 220, 0.15);
  }

  @media (max-width: 600px) {
    padding: 0.5rem 0.75rem;
    span {
      display: none;
    }
  }
`;

const SettingsButton = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.textPrimary};
    background: rgba(255, 255, 255, 0.03);
  }

  &.active {
    color: ${theme.colors.textPrimary};
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 600px) {
    padding: 0.5rem;
    span {
      display: none;
    }
  }
`;

export default Navigation;
