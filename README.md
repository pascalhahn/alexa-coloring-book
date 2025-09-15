# Alexa Coloring Book Creator

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![AWS](https://img.shields.io/badge/AWS-Lambda%20%7C%20Bedrock%20%7C%20S3-orange.svg)](https://aws.amazon.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive Alexa skill that enables children to create custom coloring book pages through voice commands, specifically optimized for Echo Show 15 devices. This skill combines voice interaction with AI-powered image generation to create a unique creative experience for kids.

## 🎨 Features

- **Voice-Driven Creation**: Children describe what they want to color using natural language
- **AI-Powered Generation**: Uses Amazon Bedrock to create coloring book pages from descriptions
- **Interactive Modification**: Kids can modify images through follow-up conversations
- **QR Code Printing**: Generates QR codes for easy mobile printing
- **Multi-Language Support**: Available in English and German
- **Child-Safe Content**: Built-in content filtering ensures appropriate imagery
- **Echo Show Optimized**: Designed specifically for Echo Show 15 with rich visual displays
- **COPPA Compliant**: Child-directed skill following privacy regulations

## 🚀 Quick Start

### Prerequisites

- **Node.js 18.x+** (LTS recommended)
- **AWS Account** with CLI configured
- **Amazon Developer Account** for Alexa Skills
- **Echo Show 15** for optimal testing experience

### AWS Services Required

- **AWS Lambda** - Skill backend
- **Amazon Bedrock** - AI image generation (Claude 3 Haiku)
- **Amazon S3** - Image storage
- **Amazon DynamoDB** - Session management

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/pascalhahn/alexa-coloring-book.git
cd alexa-coloring-book
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the project**
```bash
npm run build
```

4. **Configure AWS credentials**
```bash
aws configure
```

5. **Deploy infrastructure and skill**
```bash
npm run deploy:complete
```

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run unit tests with Jest |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint checks |
| `npm run deploy` | Deploy skill to Alexa |
| `npm run deploy:lambda` | Deploy Lambda function only |
| `npm run deploy:infra` | Deploy AWS infrastructure |

### Development Workflow

1. **Make changes** to TypeScript files in `src/`
2. **Build** the project: `npm run build`
3. **Test** your changes: `npm test`
4. **Deploy** to test: `npm run deploy:lambda`
5. **Test** on Echo Show device

## Node.js Version Management

This project requires Node.js 18.x or higher. Use npm to set up the latest version:

```bash
# Set up latest Node.js version
nvm use --lts

# Or use the setup script
npm run setup-node

# Verify versions
node --version  # Should be latest LTS or higher
npm --version   # Should be latest stable
```

## Using npx for Tool Consistency

This project uses npx to ensure all developers use the same tool versions:

```bash
# TypeScript compilation
npx tsc

# Testing with Jest
npx jest
npx jest --coverage

# Linting
npx eslint src/**/*.ts

# Alexa Skills Kit CLI
npx ask deploy
npx ask dialog
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Echo Show 15  │───▶│  Alexa Service   │───▶│  Lambda Function│
│                 │    │                  │    │                 │
│ Voice + Display │    │ Intent Routing   │    │ Business Logic  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                       ┌─────────────────────────────────┼─────────────────────────────────┐
                       │                                 │                                 │
                       ▼                                 ▼                                 ▼
              ┌─────────────────┐              ┌─────────────────┐              ┌─────────────────┐
              │ Amazon Bedrock  │              │   Amazon S3     │              │   DynamoDB      │
              │                 │              │                 │              │                 │
              │ AI Image Gen    │              │ Image Storage   │              │ Session Data    │
              └─────────────────┘              └─────────────────┘              └─────────────────┘
```

### Key Components

- **Alexa Skills Kit SDK v2.13+** - Voice interaction handling
- **Amazon Bedrock (Claude 3 Haiku)** - AI-powered image generation
- **Amazon S3** - Secure image storage and delivery
- **Amazon DynamoDB** - Session state management
- **APL (Alexa Presentation Language)** - Rich visual displays
- **TypeScript 5.3+** - Type-safe development

## 🧪 Testing

### Unit Tests
```bash
npm test                    # Run all tests
npm run test:coverage      # Run with coverage report
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
```

### Manual Testing on Echo Show 15

1. **Enable skill** for testing in Alexa Developer Console
2. **Invoke skill**: "Alexa, open coloring book creator"
3. **Create image**: "I want to color a cat playing with a ball"
4. **Modify image**: "Make the cat orange and add flowers"
5. **Print image**: "Print this coloring page"

### Test Scenarios

- ✅ Launch request handling
- ✅ Image generation from descriptions
- ✅ Image modification requests
- ✅ QR code generation for printing
- ✅ Multi-language support (EN/DE)
- ✅ Error handling and recovery
- ✅ Child-safe content filtering

## 📁 Project Structure

```
alexa-coloring-book/
├── src/                    # TypeScript source code
│   ├── handlers/          # Alexa intent handlers
│   ├── services/          # Business logic services
│   ├── utils/             # Utility functions
│   └── apl/               # APL display templates
├── tests/                 # Test files
├── skill-package/         # Alexa skill configuration
├── infrastructure/        # CloudFormation templates
├── scripts/              # Build and deployment scripts
└── docs/                 # Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Amazon Alexa Skills Kit team for the excellent SDK
- Amazon Bedrock team for AI image generation capabilities
- The open-source community for inspiration and tools

---

**Made with ❤️ for creative kids everywhere**