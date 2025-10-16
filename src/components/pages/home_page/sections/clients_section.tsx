"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { useState, useRef, useEffect } from "react"
import { IconArrowLeftAlt, IconArrowRightAlt, IconNetworkIntelNode } from "@/components/icons"
import type { Review } from "@/types/types"

export function ClientsSection() {
  const t = useTranslations("homePage.clients")
  const reviews = t.raw("reviews") as Review[]

  // Drag/UI
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  // Layout
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1) // 1 en mobile, 2 en md+
  const [maxScroll, setMaxScroll] = useState(0)

  // Debe coincidir con tailwind gap-5 (20px)
  const GAP = 20

  const recalcSizes = () => {
    const el = containerRef.current
    if (!el) return

    const cw = el.clientWidth
    // visibleCount: 1 si < md, 2 si >= md
    const isMdUp = window.matchMedia("(min-width: 768px)").matches
    const vCount = isMdUp ? 2 : 1

    // Si hay n visibles, el ancho por tarjeta es:
    // (anchoCont - gap*(n-1)) / n
    const computedCardWidth = Math.max(0, (cw - GAP * (vCount - 1)) / vCount)

    // Ancho total del carrusel
    const totalWidth = reviews.length * computedCardWidth + (reviews.length - 1) * GAP
    // Límite hacia la izquierda (negativo)
    const computedMaxScroll = -(Math.max(0, totalWidth - cw))

    setContainerWidth(cw)
    setVisibleCount(vCount)
    setCardWidth(computedCardWidth)
    setMaxScroll(computedMaxScroll)

    // Ajusta la posición si cambió el tamaño
    setTranslateX(prev => Math.min(0, Math.max(computedMaxScroll, prev)))
  }

  useEffect(() => {
    recalcSizes()
    window.addEventListener("resize", recalcSizes)
    return () => window.removeEventListener("resize", recalcSizes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length])

  const scrollAmount = cardWidth + GAP

  const scrollLeft = () => setTranslateX(prev => Math.min(prev + scrollAmount, 0))
  const scrollRight = () => setTranslateX(prev => Math.max(prev - scrollAmount, maxScroll))

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollStart(translateX)
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const walk = (e.pageX - startX) * 1.5
    const next = scrollStart + walk
    setTranslateX(Math.min(0, Math.max(maxScroll, next)))
  }
  const endDrag = () => {
    if (!isDragging) return
    setIsDragging(false)
    snapToNearestCard()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollStart(translateX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const walk = (e.touches[0].pageX - startX) * 1.5
    const next = scrollStart + walk
    setTranslateX(Math.min(0, Math.max(maxScroll, next)))
  }
  const handleTouchEnd = () => endDrag()

  const snapToNearestCard = () => {
    if (scrollAmount <= 0) return
    const nearest = Math.round(translateX / scrollAmount) * scrollAmount
    const clamped = Math.max(Math.min(nearest, 0), maxScroll)
    setTranslateX(clamped)
  }

  return (
    <section id="clients" className="w-full h-screen py-16 md:py-24 px-6 md:px-36 2xl:px-96 space-y-10">
      <div className="space-y-4">
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center text-accent space-x-1 md:space-x-2">
            <IconNetworkIntelNode width={26} height={26} />
            <p className="font-oswald font-medium text-sm md:text-lg">{t("text")}</p>
          </div>
          <div className="font-oswald font-medium text-3xl md:text-5xl text-primary">
            <h3>{t("title1")}</h3>
            <h3>{t("title2")}</h3>
          </div>
        </div>

        <p className="text-text-tertiary text-base md:text-lg font-light">{t("description")}</p>
      </div>

      <div className="relative flex flex-col w-full h-full">
        <div className="hidden relative md:flex justify-end text-primary space-x-3 md:space-x-4 z-10">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/30 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
            aria-label="Scroll left"
          >
            <IconArrowLeftAlt className="size-5 md:size-6" />
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/30 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
            aria-label="Scroll right"
          >
            <IconArrowRightAlt className="size-5 md:size-6" />
          </button>
        </div>

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full left-0 right-0 flex gap-5 md:mt-6 z-10 ${isDragging ? "select-none" : ""}`}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? "none" : "transform 500ms ease-out",
          }}
        >
          {reviews.map((review, id) => (
            <div
              key={id}
              className="h-[390px] md:h-[430px] rounded-lg shadow overflow-hidden flex flex-col flex-shrink-0 duration-300 hover:scale-[1.01] md:hover:scale-[1.03] hover:shadow-2xl"
              style={{ width: cardWidth || undefined }}
            >
              <div className="w-full h-3 bg-primary"></div>
              <div className="flex-1 flex flex-col justify-between py-10 md:py-20 px-6 md:px-10">
                <div className="h-full flex flex-col space-y-5">
                  <div className="font-oswald">
                    <p className="font-medium text-2xl text-primary leading-6">{review.author}</p>
                    <p className="text-lg text-accent">{review.location}</p>
                  </div>
                  <p className="text-justify text-base text-text-tertiary leading-6">{review.text}</p>
                </div>
                <div className="border-border border-t"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
