# Contributing to Path2Better

Thank you for your interest in contributing to Path2Better! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- **Code**: Fix bugs, add features, improve performance
- **Documentation**: Improve guides, add examples, fix typos
- **Design**: UI/UX improvements, accessibility enhancements
- **Testing**: Write tests, report bugs, test new features
- **Community**: Help others in discussions, share your deployment

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/path-2-better.git
   cd path-2-better
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Configure your .env.local with test credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## 📝 Code Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible

### React/Next.js
- Use functional components with hooks
- Follow Next.js 14 App Router conventions
- Use Server Components by default, Client Components when needed
- Proper error handling and loading states

### Styling
- Use Tailwind CSS utility classes
- Follow the existing color palette
- Ensure responsive design (mobile-first)
- Maintain WCAG AA accessibility standards

### Code Style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow existing code patterns

## 🐛 Reporting Bugs

**Before submitting a bug report:**
- Check existing issues to avoid duplicates
- Test on the latest version
- Gather reproduction steps

**Bug report should include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment (browser, OS, Node version)

## ✨ Suggesting Features

**Feature requests should include:**
- Clear use case
- How it benefits users
- Potential implementation approach
- Wireframes/mockups (if applicable)

**Consider:**
- Does this align with Path2Better's mission?
- Would this work for communities of different sizes?
- Is this maintainable and scalable?

## 🔧 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow code guidelines above
   - Test thoroughly

3. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve issue with donations"
   ```

   **Commit message format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Use a clear, descriptive title
   - Reference related issues
   - Describe what changed and why
   - Include screenshots for UI changes
   - Ensure all tests pass

## 🧪 Testing

Before submitting a PR:
- Test all user flows manually
- Verify responsive design on mobile/tablet/desktop
- Check accessibility with keyboard navigation
- Test with different data scenarios

## 📋 Checklist Before Submitting PR

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] Tested on multiple browsers
- [ ] Mobile responsive
- [ ] Accessibility maintained

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Accessibility**: Screen reader support, keyboard navigation, ARIA labels
2. **Testing**: Unit tests, integration tests, E2E tests
3. **Performance**: Optimization, caching strategies
4. **Documentation**: Deployment guides, API docs, examples
5. **Internationalization**: Multi-language support
6. **Security**: Enhanced admin auth, audit logging

## 🌍 Community Deployments

If you deploy Path2Better in your community:
- Add it to the README's deployments list
- Share learnings and customizations
- Consider contributing improvements back

## 💬 Communication

- **GitHub Issues**: Bug reports, feature requests
- **Pull Requests**: Code contributions
- **Discussions**: General questions, ideas

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive experience for everyone, regardless of:
- Age, body size, disability
- Ethnicity, gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, sexual orientation

### Our Standards

**Positive behavior:**
- Being respectful and empathetic
- Accepting constructive criticism gracefully
- Focusing on what's best for the community
- Showing kindness to others

**Unacceptable behavior:**
- Harassment, trolling, or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement
Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: conduct@path2better.com

## 🙏 Thank You

Every contribution, no matter how small, helps build better paths for people in need. Thank you for being part of this mission!
