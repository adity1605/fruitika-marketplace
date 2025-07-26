# 🍎 Fruitika - Premium Fruit E-commerce Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/getfruitika)

A modern, full-stack e-commerce platform for premium fruit exports built with Next.js 15, TypeScript, and Prisma.

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Radix UI
- **Full E-commerce**: Product catalog, shopping cart, checkout process
- **Authentication**: Secure user authentication with NextAuth.js
- **Database**: SQLite with Prisma ORM for data management
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **TypeScript**: Full type safety throughout the application
- **Responsive**: Mobile-first design that works on all devices

## 🚀 Live Demo

Visit the live website: [https://getfruitika.me](https://getfruitika.me)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Animation**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/getfruitika.git
   cd getfruitika
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Build

Build for production:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
getfruitika/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and contexts
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── __tests__/           # Test files
└── types/               # TypeScript type definitions
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Custom Domain Setup**
   - Add your custom domain (getfruitika.me) in Vercel dashboard
   - Update DNS settings with your domain provider

### Environment Variables for Production

Set these in your deployment platform:

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://getfruitika.me"
NEXTAUTH_SECRET="your-production-secret"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Website: [https://getfruitika.me](https://getfruitika.me)
- Email: hello@getfruitika.me

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

Made with ❤️ for premium fruit exports
