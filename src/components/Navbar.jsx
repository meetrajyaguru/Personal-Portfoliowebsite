import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  background: #000000;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #94a3b8;
  font-family: "The New Yorker", serif;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 4px 0;

  &:hover {
    color: #f5f5f5;
  }

  &.active {
    color: #2f2fe4;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #2f2fe4;
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-direction: column;
  gap: 5px;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #f5f5f5;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background: #000000;
    backdrop-filter: blur(12px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    z-index: 999;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const MobileNavLink = styled(NavLink)`
  font-size: 20px;

  &::after {
    bottom: -4px;
  }
`;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["about", "experience", "work"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <NavbarContainer>
        <NavLinks>
          <NavLink
            onClick={() => scrollToSection("about")}
            className={activeSection === "about" ? "active" : ""}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("experience")}
            className={activeSection === "experience" ? "active" : ""}
          >
            Experience
          </NavLink>
          <NavLink
            onClick={() => scrollToSection("work")}
            className={activeSection === "work" ? "active" : ""}
          >
            Work
          </NavLink>
        </NavLinks>

        <Hamburger onClick={toggleMobileMenu}>
          <span />
          <span />
          <span />
        </Hamburger>
      </NavbarContainer>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink
          onClick={() => scrollToSection("about")}
          className={activeSection === "about" ? "active" : ""}
        >
          About
        </MobileNavLink>
        <MobileNavLink
          onClick={() => scrollToSection("experience")}
          className={activeSection === "experience" ? "active" : ""}
        >
          Experience
        </MobileNavLink>
        <MobileNavLink
          onClick={() => scrollToSection("work")}
          className={activeSection === "work" ? "active" : ""}
        >
          Work
        </MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar;
