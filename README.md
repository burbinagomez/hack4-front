# Hacker4me - Domain Vulnerability Dashboard

A comprehensive security platform for discovering and monitoring domain vulnerabilities with real-time scanning, subdomain enumeration, and detailed vulnerability reporting.

## 🚀 Features

- **Domain Vulnerability Scanning**: Automated security assessments of your domains
- **Subdomain Discovery**: Comprehensive enumeration of subdomains and their security status
- **Real-time Dashboard**: Interactive charts and analytics for vulnerability tracking
- **Email Authentication**: Secure OTP-based authentication via Supabase
- **Vulnerability Management**: Detailed CVE tracking with severity classification
- **SSL Certificate Monitoring**: Track SSL status and expiration dates
- **Export Capabilities**: Generate CSV and PDF reports
- **Responsive Design**: Beautiful, production-ready interface with dark/light mode

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth with OTP
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Email service for OTP delivery

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd domain-search-app

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Configuration
NEXT_PUBLIC_API=your-api-endpoint
NEXT_PUBLIC_API_KEY=your-api-key
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Configure email authentication in Supabase Auth settings
4. Disable email confirmation for OTP-only flow

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 User Authentication Flow

### 1. Email Verification
- Navigate to the home page
- Enter your email address
- Click "Send Verification Code"

### 2. OTP Validation
- Check your email inbox for the 6-digit OTP
- Enter the OTP in the verification field
- Click "Verify" to authenticate

### 3. Vulnerability Report
- Upon successful validation, a security scan is automatically initiated
- You'll receive a detailed vulnerability report via email within minutes
- The report includes:
  - Discovered subdomains
  - Security vulnerabilities with CVE details
  - SSL certificate status
  - Risk assessment and recommendations

### 4. Dashboard Access
- After authentication, access your personalized dashboard
- View real-time vulnerability data and analytics
- Monitor subdomain security status
- Track vulnerability remediation progress
- Export detailed reports in CSV/PDF format

## 📊 Dashboard Features

### Main Dashboard
- **Scan Timeline**: Historical view of security scans
- **Vulnerability Distribution**: Charts showing severity breakdown
- **Risk Assessment**: Overall security posture scoring
- **Recent Activity**: Latest scan results and findings

### Subdomains Management
- Complete subdomain inventory
- SSL certificate monitoring
- Usage status tracking
- Response time analytics
- Security status indicators

### Vulnerability Tracking
- Detailed CVE information
- Severity classification (Critical, High, Medium, Low, Informational)
- Status tracking (Open, In Progress, Mitigated)
- Exploitation history
- Mitigation recommendations
- CVSS scoring

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # App providers
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── ui/              # shadcn/ui components
│   └── ...              # Other components
├── lib/                  # Utility functions
│   ├── supabase.ts      # Supabase client
│   ├── validation.ts    # Form validation
│   └── utils.ts         # General utilities
├── types/               # TypeScript type definitions
└── public/             # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
npm run export       # Export static files
```

## 🚀 Deployment

### Static Export (Recommended)
```bash
npm run build
```

The application is configured for static export and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Environment Variables for Production
Ensure all environment variables are properly configured in your hosting platform.

## 🔒 Security Features

- **OTP Authentication**: Secure email-based verification
- **Input Validation**: Comprehensive form validation with Zod
- **CSRF Protection**: Built-in Next.js security features
- **Secure Headers**: Proper security headers configuration
- **Data Sanitization**: XSS protection and input sanitization

## 📈 Monitoring & Analytics

- Real-time vulnerability tracking
- Historical scan data analysis
- Severity trend monitoring
- Subdomain health metrics
- SSL certificate expiration alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for troubleshooting guides

## 🔄 Updates & Maintenance

- Regular security updates
- New vulnerability detection rules
- Enhanced reporting features
- Performance optimizations

---

**Built with ❤️ for cybersecurity professionals and domain administrators**