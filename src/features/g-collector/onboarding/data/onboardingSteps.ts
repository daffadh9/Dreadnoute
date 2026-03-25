import type { OnboardingStep } from '../types/onboarding.types'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    eyebrow: 'THE RITUAL AWAKENS',
    title: 'Nekrovia telah bangkit.',
    headlinePhrases: ['Nekrovia telah', 'bangkit.'],
    description:
      'Dunia yang terkunci oleh waktu kini memanggilmu kembali. Segel kuno telah retak.',
    primaryCta: 'Masuk ke Nekrovia',
  },
  {
    id: 2,
    eyebrow: 'THE FALLEN SEAL',
    title: '105 entitas telah terlepas.',
    headlinePhrases: ['105 entitas', 'telah terlepas.'],
    description:
      'Mereka bergerak di antara kabut, menunggu untuk dipanggil, diburu, atau dikuasai.',
    primaryCta: 'Lanjut',
  },
  {
    id: 3,
    eyebrow: 'YOUR PURPOSE',
    title: 'Tugasmu adalah mengumpulkan mereka.',
    headlinePhrases: ['Tugasmu adalah', 'mengumpulkan mereka.'],
    description:
      'Setiap entitas yang kamu temukan akan menjadi bagian dari koleksimu dan membuka jalan menuju ritual berikutnya.',
    primaryCta: 'Lanjut',
  },
  {
    id: 4,
    eyebrow: 'HOW IT WORKS',
    title: 'Masuk ke ritual. Dapatkan kartu. Bangun koleksimu.',
    headlinePhrases: ['Masuk ke ritual.', 'Dapatkan kartu. Bangun koleksimu.'],
    description:
      'Kamu akan bertarung, mengumpulkan entitas, dan memperkuat progresmu sebelum semuanya terlambat.',
    primaryCta: 'Lanjut',
  },
  {
    id: 5,
    eyebrow: 'THE FIRST CHOICE',
    title: 'Sekarang, ambil entitas pertamamu.',
    headlinePhrases: ['Sekarang,', 'ambil entitas pertamamu.'],
    description:
      'Perjalananmu di Nekrovia dimulai dari satu pilihan. Setelah itu, tidak ada jalan kembali.',
    primaryCta: 'Ambil Entitas',
  },
]
