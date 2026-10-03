import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 168, 255, 0.2), 0 0 10px rgba(0, 168, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 168, 255, 0.5), 0 0 20px rgba(0, 168, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 168, 255, 0.2), 0 0 10px rgba(0, 168, 255, 0.1);
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate login sequence
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <Container>
      {/* 3D Spline Model Background */}
      <BackgroundWrapper>
        <Spline 
          scene="https://prod.spline.design/wWWsJEWKLk1A36b9/scene.splinecode"
          style={{ width: '100%', height: '100%', background: 'transparent', display: 'block', transform: 'scale(1.4)', transformOrigin: '50% 50%' }}
        />
      </BackgroundWrapper>

      {/* Login Form Overlay */}
      <OverlaySection>
        <LoginCard>
          <BrandWrapper>
            <LogoIcon>🚀</LogoIcon>
            <LogoText>DevPortfolio</LogoText>
          </BrandWrapper>

          {isSuccess ? (
            <SuccessMessage>
              <SuccessIcon>✓</SuccessIcon>
              <Title>Welcome Back</Title>
              <Subtitle>Authentication successful. Preparing your dashboard...</Subtitle>
              <LoaderBar />
            </SuccessMessage>
          ) : (
            <>
              <Title>Welcome Back</Title>
              <Subtitle>Sign in to your portfolio dashboard</Subtitle>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Label>Email Address</Label>
                  <InputWrapper>
                    <MailIcon viewBox="0 0 24 24" width="18" height="18">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </MailIcon>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputWrapper>
                </InputGroup>

                <InputGroup>
                  <Label>Password</Label>
                  <InputWrapper>
                    <LockIcon viewBox="0 0 24 24" width="18" height="18">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </LockIcon>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <TogglePassword 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </TogglePassword>
                  </InputWrapper>
                </InputGroup>

                <FormActions>
                  <CheckboxLabel>
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </CheckboxLabel>
                  <ForgotPassword href="#">Forgot Password?</ForgotPassword>
                </FormActions>

                <LoginButton type="submit" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </LoginButton>
              </Form>

              <SignupText>
                Don't have an account? <SignupLink href="#">Create one</SignupLink>
              </SignupText>
            </>
          )}
        </LoginCard>
      </OverlaySection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #020916;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: auto; /* Allows hover tracking of cursor */

  canvas,
  spline-viewer {
    background: transparent !important;
  }

  /* Radial gradient overlay to enhance visual contrast and depth */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(10, 25, 47, 0.1) 0%, rgba(2, 9, 22, 0.8) 100%);
    pointer-events: none;
    z-index: 2;
  }
`;

const OverlaySection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 1.5rem;
  pointer-events: none; /* Passes mouse movement events through to Spline */
`;

const LoginCard = styled.div`
  background: rgba(10, 25, 47, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: 3.5rem 3rem;
  border-radius: 24px;
  width: 100%;
  max-width: 460px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  pointer-events: auto; /* Ensures form fields and actions remain clickable */
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 15;

  @media (max-width: 768px) {
    padding: 2.5rem 2rem;
    max-width: 100%;
  }
`;

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.span`
  font-size: 1.75rem;
  display: inline-block;
  animation: ${float} 3s ease-in-out infinite;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #00A8FF 0%, #0066CC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-align: center;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2.5rem;
  font-size: 0.95rem;
  font-weight: 400;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconBase = styled.svg`
  position: absolute;
  left: 1rem;
  fill: none;
  stroke: rgba(255, 255, 255, 0.35);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
  transition: stroke 0.3s ease;
`;

const MailIcon = styled(IconBase)``;
const LockIcon = styled(IconBase)``;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
  
  &:focus {
    outline: none;
    border-color: #00A8FF;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(0, 168, 255, 0.2);
  }

  &:focus + ${IconBase} {
    stroke: #00A8FF;
  }
`;

const TogglePassword = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s;
  
  &:hover {
    color: #00A8FF;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  
  input {
    appearance: none;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 16px;
    height: 16px;
    border-radius: 4px;
    display: grid;
    place-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:checked {
      background-color: #00A8FF;
      border-color: #00A8FF;

      &::before {
        transform: scale(1);
      }
    }

    &::before {
      content: "✓";
      width: 10px;
      height: 10px;
      color: white;
      font-size: 10px;
      font-weight: bold;
      transform: scale(0);
      transition: transform 0.1s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.55);
  }
`;

const ForgotPassword = styled.a`
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #00A8FF;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #00A8FF 0%, #0066CC 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(0, 168, 255, 0.2);
  
  &:hover:not(:disabled) {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 168, 255, 0.35);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #1a365d;
  }
`;

const SignupText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2rem;
  font-size: 0.9rem;
`;

const SignupLink = styled.a`
  color: #00A8FF;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #66CCFF;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 76, 76, 0.1);
  border: 1px solid rgba(255, 76, 76, 0.3);
  color: #ff4c4c;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.3s ease;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 0;
  animation: ${fadeIn} 0.5s ease;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 200, 83, 0.15);
  border: 2px solid #00c853;
  color: #00c853;
  font-size: 1.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  animation: ${glowPulse} 2s infinite;
`;

const LoaderBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 60%;
    background: linear-gradient(90deg, #00A8FF, #00c853);
    border-radius: 2px;
    animation: ${shimmer} 1.5s infinite linear;
    background-size: 200% 100%;
  }
`;

export default LoginPage;
