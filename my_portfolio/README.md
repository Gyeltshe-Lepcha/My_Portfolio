Personal Portfolio
Overview
Personal Portfolio is a modern and responsive website created to showcase my projects, skills, and professional profile. It provides a clean digital presence where visitors can explore my work, learn about my expertise, and connect with me easily.

The portfolio combines smooth animations, structured content, and an interactive design to deliver an engaging browsing experience.

Intended Audience
Personal Portfolio is intended for:

Recruiters and hiring managers
Clients looking for development services
Professional networking and collaboration
Anyone interested in my projects and skills
Key Features
Interactive User Interface
Smooth transitions and modern animations for an engaging experience.

Project Showcase
Dedicated sections to display featured projects with details and technologies used.

Responsive Design
Optimized for all screen sizes including mobile, tablet, and desktop.

Modern Styling
Clean and consistent UI built with Tailwind CSS.

Fast and Optimized Performance
Efficient structure for quick loading and better accessibility.

Platform
Web Application

Technology Stack
Framework: Next.js
Language: JavaScript
Styling: Tailwind CSS
Animations: Modern UI motion effects

Environment Configuration
Create `.env.local` for local development. Do not commit real secrets.

Generate the required authentication secret:

```bash
pnpm secret:generate
```

Use the generated value as the single source of truth:

```env
AUTH_SECRET="paste-generated-value-here"
```

`NEXTAUTH_SECRET` is optional legacy compatibility and should match
`AUTH_SECRET` only if you choose to set it.

Core environment variables:

```env
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
NEXTAUTH_SECRET=
AUTH_TRUST_HOST=true
CLOUDINARY_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Runtime configuration is centralized in `src/lib/config.js`.
© Personal Portfolio
