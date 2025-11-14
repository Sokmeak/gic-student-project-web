import { motion, useTime, useTransform } from 'motion-v'

interface HeroRotationParams {
    origin: number
    distance: number
    timeOffset: number
    duration: number
}

export function useHeroRotation({ origin = 0, distance = 1, duration = 1, timeOffset = 0 }: HeroRotationParams) {
    const time = useTime()

    const x = useTransform(() => Math.cos((time.get() + timeOffset) / 1000 / duration) * distance + origin)
    const y = useTransform(() => Math.sin((time.get() + timeOffset) / 1000 / duration) * distance + origin)

    const translationXY = {
        x,
        y,
    }

    return translationXY
}