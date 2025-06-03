# Domain Vulnerability Dashboard

A secure web dashboard for monitoring domain vulnerabilities with AWS Cognito authentication.

## Branch Structure

We follow the GitFlow branching model:

- `main` - Production releases
- `develop` - Development branch
- `feature/*` - New features
- `release/*` - Release preparation
- `hotfix/*` - Production hotfixes
- `bugfix/*` - Bug fixes for features

## Development Workflow

1. Feature Development
   ```bash
   git checkout develop
   git checkout -b feature/your-feature
   # Make changes
   git commit -m "feat: your changes"
   git push origin feature/your-feature
   # Create PR to develop
   ```

2. Bug Fixes
   ```bash
   git checkout develop
   git checkout -b bugfix/bug-description
   # Fix bug
   git commit -m "fix: bug description"
   git push origin bugfix/bug-description
   # Create PR to develop
   ```

3. Releases
   ```bash
   git checkout develop
   git checkout -b release/1.0.0
   # Version bump and final fixes
   git commit -m "chore: bump version to 1.0.0"
   # Merge to main and develop
   ```

4. Hotfixes
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Fix critical issue
   git commit -m "fix: critical issue"
   # Merge to main and develop
   ```

## Commit Convention

We use conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

## Environment Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## AWS Cognito Configuration

The application uses AWS Cognito for authentication. Required environment variables:

```env
NEXT_PUBLIC_AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
```