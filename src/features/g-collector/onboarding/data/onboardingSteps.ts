import type { OnboardingStep } from '../types/onboarding.types'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    text: 'Kamu akhirnya tiba…',
    subtext: 'Kehadiranmu telah lama ditunggu. Nekrovia telah memanggilmu.',
    type: 'intro',
    buttonLabel: 'Lanjutkan',
  },
  {
    id: 2,
    text: 'Nekrovia telah terbuka kembali.',
    subtext:
      'Dunia yang tersembunyi selama berabad-abad kini terungkap. Segel kuno telah retak.',
    type: 'story',
    buttonLabel: 'Lanjutkan',
  },
  {
    id: 3,
    text: '105 entitas telah terlepas.',
    subtext:
      'Mereka berkeliaran di antara dunia. Gelisah. Berbahaya. Menunggu seseorang yang cukup kuat untuk mengendalikan mereka.',
    type: 'objective',
    buttonLabel: 'Lanjutkan',
  },
  {
    id: 4,
    text: 'Kumpulkan mereka… sebelum semuanya terlambat.',
    subtext:
      'Jadilah Vessel mereka. Baca kisahnya, kendalikan kekuatannya, dan selesaikan ritual sebelum waktu habis.',
    type: 'guide',
    buttonLabel: 'Lanjutkan',
  },
  {
    id: 5,
    text: 'Sekarang… ambil entitas pertamamu.',
    subtext:
      'Perjalananmu dimulai hari ini. Aku hanya memastikan kamu tidak tersesat.',
    type: 'action',
    buttonLabel: 'MULAI RITUAL',
  },
]
