import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CardImageAndDetails from '../components/CardImageAndDetails'

import TraditionalMusic from "../assets/images/traditionalMusic.jpg"
import SittingArrangement from "../assets/images/sittingTable.jpg"
import BirthdayParty from "../assets/images/birthdayParty.jpg"
import TeaCoffee from "../assets/images/tea&Coffee.jpg"
import Television from "../assets/images/television.jpg"
import SelfiePoint from "../assets/images/selfiePoint.jpg"

gsap.registerPlugin( Draggable, ScrollTrigger)

const services = [
  {
    image: TraditionalMusic, 
    title: 'Traditional Music',
    description: 'Enjoy the vibes of Indian melodies while sipping your drink.',
  },
  {
    image: SittingArrangement,
    title: 'Sitting Arrangement',
    description: 'Comfortable tables for friends, families & groups.',
  },
  {
    image: SelfiePoint,
    title: 'Selfie Point',
    description: 'Capture your moments with our dedicated selfie spot.',
  },
  {
    image: Television,
    title: 'Television',
    description: 'Watch your favorite shows, matches, or music videos.',
  },
  {
    image: BirthdayParty,
    title: 'Special Occasions',
    description: 'Celebrate birthdays, New Year, Independence Day & more!',
  },
  {
    image: TeaCoffee,
    title: 'Tea & Coffee',
    description: 'Freshly brewed beverages made with love.',
  },
]

const Service = () => {
  const sliderRef = useRef()
  const containerRef = useRef()
  const tweenRef = useRef()

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card')
    const totalWidth = cards.length * 300

    gsap.set(sliderRef.current, { width: totalWidth * 2 })

    // Duplicate content for seamless loop
    const animation = gsap.to(cards, {
      xPercent: -100,
      duration: 20,
      repeat: -1,
      ease: 'linear',
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    })

    tweenRef.current = animation

    // Pause on hover
    const container = containerRef.current
    container.addEventListener('mouseenter', () => animation.pause())
    container.addEventListener('mouseleave', () => animation.play())

    // Draggable
    Draggable.create(sliderRef.current, {
      type: 'x',
      inertia: true,
      onPress() {
        animation.pause()
      },
      onDrag() {
        gsap.set(sliderRef.current, { x: this.x })
      },
      onRelease() {
        animation.play()
      },
    })

    // Scroll entrance animation
    gsap.from(container, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <section className="w-full min-h-screen pt-10 px-[5vw] overflow-hidden">
      <h1 className="text-center text-[8vw] md:text-[4vw] font-bold mb-10">Our Offerings</h1>
      <div ref={containerRef} className="relative w-full overflow-hidden cursor-grab">
        <div ref={sliderRef} className="flex gap-6">
          {[...services, ...services].map((service, index) => (
            <div className="service-card min-w-[270px] sm:min-w-[300px]" key={index}>
              <CardImageAndDetails
                image={service.image}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service
