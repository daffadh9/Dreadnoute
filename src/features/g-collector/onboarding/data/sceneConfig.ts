export interface VeyiraConfig {
  opacity: number
  blur: number
  brightness: number
  saturation: number
  scale: number
  bottom: string
  left: string
  animationType: 'static-drift' | 'gentle-float' | 'full-float'
  maskRadius: string
  eyeVisible: boolean
  rimLight: number
}

export interface SceneConfig {
  bg: string
  veyira: VeyiraConfig
  textArea: 'top-right' | 'upper-right' | 'center-right'
  fog: {
    frontOpacity: number
    bottomFogHeight: string
  }
  sigilVisible: boolean
  bgBrightness: number
  bgSaturation: number
}

export const SCENE_CONFIGS: SceneConfig[] = [
  {
    // Scene 1 — Awakening: World introduced, Veyira barely a whisper in the fog
    bg: '/assets/onboarding/onboarding-scene-1-awakening.png',
    veyira: {
      opacity: 0.11,
      blur: 4.5,
      brightness: 0.2,
      saturation: 0.55,
      scale: 0.86,
      bottom: '-16%',
      left: '-14%',
      animationType: 'static-drift',
      maskRadius: '52% 60%',
      eyeVisible: false,
      rimLight: 0,
    },
    textArea: 'top-right',
    fog: { frontOpacity: 0.88, bottomFogHeight: '55%' },
    sigilVisible: false,
    bgBrightness: 0.86,
    bgSaturation: 0.78,
  },
  {
    // Scene 2 — The Fallen Seal: Veyira starts emerging from deep fog
    bg: '/assets/onboarding/onboarding-scene-2-approach.png',
    veyira: {
      opacity: 0.32,
      blur: 2.5,
      brightness: 0.38,
      saturation: 0.7,
      scale: 0.9,
      bottom: '-14%',
      left: '-14%',
      animationType: 'gentle-float',
      maskRadius: '58% 68%',
      eyeVisible: false,
      rimLight: 0.04,
    },
    textArea: 'upper-right',
    fog: { frontOpacity: 0.66, bottomFogHeight: '46%' },
    sigilVisible: false,
    bgBrightness: 0.88,
    bgSaturation: 0.84,
  },
  {
    // Scene 3 — Your Purpose: Veyira clearer, half-emerged from the void
    bg: '/assets/onboarding/onboarding-scene-3-Gate.png',
    veyira: {
      opacity: 0.6,
      blur: 0.8,
      brightness: 0.6,
      saturation: 0.85,
      scale: 0.94,
      bottom: '-13%',
      left: '-13%',
      animationType: 'gentle-float',
      maskRadius: '64% 76%',
      eyeVisible: true,
      rimLight: 0.12,
    },
    textArea: 'center-right',
    fog: { frontOpacity: 0.44, bottomFogHeight: '38%' },
    sigilVisible: true,
    bgBrightness: 0.90,
    bgSaturation: 0.90,
  },
  {
    // Scene 4 — How It Works: Veyira dominant, still bound to the void
    bg: '/assets/onboarding/onboarding-scene-4-Binding.png',
    veyira: {
      opacity: 0.82,
      blur: 0,
      brightness: 0.76,
      saturation: 0.92,
      scale: 0.98,
      bottom: '-13%',
      left: '-14%',
      animationType: 'full-float',
      maskRadius: '70% 84%',
      eyeVisible: true,
      rimLight: 0.22,
    },
    textArea: 'center-right',
    fog: { frontOpacity: 0.28, bottomFogHeight: '30%' },
    sigilVisible: true,
    bgBrightness: 0.92,
    bgSaturation: 0.94,
  },
  {
    // Scene 5 — The First Choice: Veyira fully present, undeniable
    bg: '/assets/onboarding/onboarding-scene-4-Binding.png',
    veyira: {
      opacity: 0.96,
      blur: 0,
      brightness: 0.88,
      saturation: 1.0,
      scale: 1.02,
      bottom: '-13%',
      left: '-15%',
      animationType: 'full-float',
      maskRadius: '76% 90%',
      eyeVisible: true,
      rimLight: 0.32,
    },
    textArea: 'center-right',
    fog: { frontOpacity: 0.16, bottomFogHeight: '22%' },
    sigilVisible: true,
    bgBrightness: 0.94,
    bgSaturation: 0.98,
  },
]
