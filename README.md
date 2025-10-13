# Mini Social X

A minimal social feed with React + Vite + TypeScript + Tailwind, Firebase Auth (Email/Password + Google), and Firestore.

## Setup

1. Install deps

```bash
npm install
```

2. Configure Tailwind (already configured): `tailwind.config.js`, `postcss.config.js`, and `src/index.css` include tailwind directives.

3. Firebase
- Create a Firebase project
- Enable Authentication providers: Email/Password and Google
- Create Firestore database
- Create a Web App and copy config

4. Env vars: create `.env.local` in project root

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. Firestore Rules (console → Firestore → Rules)

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null &&
        request.resource.data.authorId == request.auth.uid &&
        request.resource.data.title is string &&
        request.resource.data.content is string;
      allow update, delete: if request.auth != null &&
        resource.data.authorId == request.auth.uid;
    }
  }
}
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Features
- Register/Login, Google Sign-In, Logout
- Create, edit, delete own posts
- Everyone can view all posts
- Click an authorId to see only that author's posts
