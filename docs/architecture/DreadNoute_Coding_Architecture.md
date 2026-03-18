
# DreadNoute Coding Architecture
Author: Daffa Dhiyaulhaq Khadafi

Purpose:
Define the recommended code architecture for building the DreadNoute MVP using Next.js and Supabase.

---

## Tech Stack

Frontend:
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS

Backend:
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

---

## Architecture Philosophy

Build using domain-based modular structure.

Core domains:

- archive
- investigations
- cards
- wallet
- profile
- auth

---

## Recommended src Structure

src
│
├── app
│   ├── ghost-archive
│   │   ├── page.tsx
│   │   └── [slug]
│   │       └── page.tsx
│   │
│   ├── real-or-fake
│   │   ├── page.tsx
│   │   └── [id]
│   │       └── page.tsx
│   │
│   ├── ghost-cards
│   │   ├── page.tsx
│   │   └── [id]
│   │       └── page.tsx
│   │
│   ├── wallet
│   │   └── page.tsx
│   │
│   ├── profile
│   │   └── page.tsx
│   │
│   └── api
│       ├── archive
│       │   └── route.ts
│       ├── investigations
│       │   └── route.ts
│       ├── cards
│       │   └── route.ts
│       └── wallet
│           └── route.ts
│
├── components
│   ├── ui
│   ├── layout
│   └── shared
│
├── features
│   ├── archive
│   ├── investigations
│   ├── cards
│   ├── wallet
│   └── profile
│
├── lib
│   ├── supabase
│   ├── auth
│   ├── utils
│   └── constants
│
├── hooks
│
└── types

---

## Core Database Tables

profiles
ghost_archive
investigations
investigation_votes
ghost_cards
user_cards
wallets
transactions

---

## Data Flow Convention

Page
↓
Feature Component
↓
Service Layer
↓
Supabase Client
↓
Database

---

## Development Order

1. Auth + Profile
2. Ghost Archive
3. Real or Fake
4. Ghost Cards
5. Wallet (DreadCoin)

---

## MVP Core Loop

Discover lore
↓
Join investigation
↓
Earn ghost card
↓
Build identity
↓
Earn/spend coin
↓
Return to platform
