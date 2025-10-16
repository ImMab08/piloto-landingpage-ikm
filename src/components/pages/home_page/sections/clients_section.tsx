"use client"

import type React from "react"

import { useTranslations } from "next-intl"
import { useState, useRef, useEffect } from "react"
import { IconArrowLeftAlt, IconArrowRightAlt, IconNetworkIntelNode } from "@/components/icons"
import type { Review } from "@/types/types"

export function ClientsSection() {
  const t = useTranslations("homePage.clients")
  const reviews = t.raw("reviews") as Review[]
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(450)

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth >= 768) {
        setCardWidth(540) // Desktop: 540px card + 20px gap = 560px
      } else {
        setCardWidth(450) // Mobile: 450px card + 20px gap = 470px
      }
    }

    updateCardWidth()
    window.addEventListener("resize", updateCardWidth)
    return () => window.removeEventListener("resize", updateCardWidth)
  }, [])

  const scrollLeft = () => {
    const scrollAmount = cardWidth + 20 // card width + gap
    setTranslateX((prev) => Math.min(prev + scrollAmount, 0))
  }

  const scrollRight = () => {
    const scrollAmount = cardWidth + 20 // card width + gap
    const maxScroll = -(reviews.length - 1) * scrollAmount
    setTranslateX((prev) => Math.max(prev - scrollAmount, maxScroll))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollStart(translateX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX) * 1.5 // Multiply by 1.5 for smoother drag
    setTranslateX(scrollStart + walk)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    snapToNearestCard()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      snapToNearestCard()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollStart(translateX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX
    const walk = (x - startX) * 1.5
    setTranslateX(scrollStart + walk)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    snapToNearestCard()
  }

  const snapToNearestCard = () => {
    const scrollAmount = cardWidth + 20
    const maxScroll = -(reviews.length - 1) * scrollAmount
    const nearestCard = Math.round(translateX / scrollAmount) * scrollAmount
    const clampedPosition = Math.max(Math.min(nearestCard, 0), maxScroll)
    setTranslateX(clampedPosition)
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
        <div className="relative flex justify-end text-primary space-x-3 md:space-x-4 z-10">
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
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute left-0 right-0 flex gap-5 mt-12 md:mt-16 z-10 ${
            isDragging ? "select-none" : ""
          }`}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? "none" : "transform 500ms ease-out",
          }}
        >
          {reviews.map((review, id) => (
            <div
              key={id}
              className="w-[450px] md:w-[540px] h-[390px] md:h-[430px] rounded-lg shadow overflow-hidden flex flex-col flex-shrink-0 duration-300 hover:scale-[1.01] md:hover:scale-[1.03] hover:shadow-2xl"
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
