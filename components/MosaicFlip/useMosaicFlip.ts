import { useCallback, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { FACES, type Face, type Tile, type MosaicConfig } from './types'

const DEFAULTS = { tilesX: 12, tilesY: 9, tileSize: 60 }

interface Args<TScope extends HTMLElement> {
  previewRef: React.RefObject<HTMLDivElement | null>
  scopeRef: React.RefObject<TScope | null>
  config: MosaicConfig
}

export function useMosaicFlip<TScope extends HTMLElement>({
  previewRef,
  scopeRef,
  config,
}: Args<TScope>) {
  const tilesX = config.tilesX ?? DEFAULTS.tilesX
  const tilesY = config.tilesY ?? DEFAULTS.tilesY
  const tileSize = config.tileSize ?? DEFAULTS.tileSize
  const previewWidth = tilesX * tileSize
  const previewHeight = tilesY * tileSize

  const revealRef = useRef<(idx: number) => void>(() => {})

  useGSAP(
    () => {
      const preview = previewRef.current
      if (!preview) return

      const { images, tileClassName, faceClassPrefix } = config
      const tiles: Tile[] = []
      const state = {
        activeProject: 0,
        revealCount: 0,
        isRevealing: false,
        nextProject: null as number | null,
      }

      function setTileImage(tile: Tile, side: Face, src: string) {
        const face = tile.faces[side]
        if (!src) return
        face.style.backgroundImage = `url(${src})`
        face.style.backgroundSize = `${previewWidth}px ${previewHeight}px`
        face.style.backgroundPosition = `${-(tile.col * tileSize)}px ${-(tile.row * tileSize)}px`
      }

      for (let row = 0; row < tilesY; row++) {
        for (let col = 0; col < tilesX; col++) {
          const tile = document.createElement('div')
          tile.className = tileClassName
          const faces = {} as Record<Face, HTMLDivElement>
          for (const side of FACES) {
            const face = document.createElement('div')
            face.className = `${tileClassName}-face ${faceClassPrefix}${side}`
            tile.appendChild(face)
            faces[side] = face
          }
          preview.appendChild(tile)
          tiles.push({ element: tile, faces, row, col })
        }
      }

      tiles.forEach((tile) => {
        setTileImage(tile, 'face-front', images[0])
        setTileImage(tile, 'face-rear', images[0])
        setTileImage(tile, 'face-right', images[0])
        setTileImage(tile, 'face-left', images[0])
        tile.faces['face-top'].style.background = '#1a1a1a'
        tile.faces['face-bottom'].style.background = '#1a1a1a'
      })

      tiles.forEach((tile, i) => {
        gsap.to(tile.element, {
          z: () => gsap.utils.random(-40, 40),
          duration: () => gsap.utils.random(0.6, 1.4),
          ease: 'sine.inOut',
          delay: i * 0.015,
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
        })
      })

      function reveal(idx: number) {
        if (!tiles.length) return
        if (idx === state.activeProject && !state.isRevealing) return
        if (state.isRevealing) {
          state.nextProject = idx
          return
        }
        if (idx === state.activeProject) return

        state.isRevealing = true
        state.nextProject = null

        const hiddenFace: Face = state.revealCount % 2 === 0 ? 'face-rear' : 'face-front'
        tiles.forEach((tile) => {
          setTileImage(tile, hiddenFace, images[idx])
          setTileImage(tile, 'face-right', images[0])
          setTileImage(tile, 'face-left', images[0])
        })

        state.revealCount += 1
        state.activeProject = idx

        gsap.to(
          tiles.map((t) => t.element),
          {
            rotateY: state.revealCount * 180,
            duration: 0.5,
            ease: 'power3.inOut',
            stagger: { each: 0.05, from: 'center', grid: [tilesY, tilesX] },
            onComplete: () => {
              state.isRevealing = false
              const pending = state.nextProject
              state.nextProject = null
              if (pending !== null && pending !== state.activeProject) {
                reveal(pending)
              }
            },
          },
        )
      }

      revealRef.current = reveal

      return () => {
        revealRef.current = () => {}
        while (preview.firstChild) preview.removeChild(preview.firstChild)
      }
    },
    { scope: scopeRef },
  )

  const revealProject = useCallback((idx: number) => {
    revealRef.current(idx)
  }, [])

  return { revealProject, previewWidth, previewHeight }
}
