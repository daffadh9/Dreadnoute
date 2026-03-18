
# DreadNoute Development Task Map

Author: Daffa Dhiyaulhaq Khadafi

Purpose:
Clear step-by-step development tasks for building the DreadNoute MVP.

---

## Phase 1 — Platform Foundation

Tasks:

- Setup Next.js project structure
- Configure Supabase
- Setup authentication (login/register)
- Create global layout
- Create navigation (navbar/sidebar)
- Create user profile system

Database tables:

profiles

---

## Phase 2 — Ghost Archive

Tasks:

- Create ghost_archive table
- Build archive list page
- Build archive detail page
- Implement search
- Implement categories/tags

Pages:

/ghost-archive  
/ghost-archive/[slug]

---

## Phase 3 — Real or Fake

Tasks:

- Create investigations table
- Media upload system
- Voting system
- Comment system
- Investigation detail page

Pages:

/real-or-fake  
/real-or-fake/[id]

---

## Phase 4 — Ghost Cards (G-Collector)

Tasks:

- Create ghost_cards table
- Create user_cards table
- Card UI component
- Card collection page
- Card unlock logic

Pages:

/ghost-cards  
/ghost-cards/[id]

---

## Phase 5 — DreadCoin Economy

Tasks:

- Create wallets table
- Create transactions table
- Wallet balance UI
- Reward system
- Card pack purchases

---

## Suggested API Routes

/api/archive  
/api/investigations  
/api/cards  
/api/wallet

---

## Core React Components

GhostCard.tsx  
GhostArchiveCard.tsx  
InvestigationPost.tsx  
VoteButtons.tsx  
WalletBalance.tsx  

---

## MVP Completion Checklist

- Authentication
- User profile
- Ghost Archive
- Real or Fake investigations
- Ghost Card collection
- DreadCoin wallet

When these features are working, the first MVP of DreadNoute is ready.
