'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'


const products = [
  {
    num: '01',
    title: 'Showroom Management System',
    desc: 'A complete web-based solution for managing inventory, customers, sales, installments and business operations.',
    href: '/projects/showroom-management',
  },
  {
    num: '02',
    title: 'Internet Service Provider Platform',
    desc: 'A centralized management platform for subscribers, internet packages, billing, payments and network operations.',
    href: '/projects/isp-management',
  },
  {
    num: '03',
    title: 'Multiplayer Maze Game',
    desc: 'An interactive multiplayer gaming experience featuring dynamically generated mazes, real-time gameplay and competitive racing.',
    href: '/projects/multiplayer-maze',
  },
  {
    num: '04',
    title: 'GSAP Web Animations',
    desc: 'Engaging web experiences built with smooth transitions, scroll-triggered animations and interactive motion effects.',
    href: '/projects/gsap-animations',
  },
  {
    num: '05',
    title: 'E-Commerce Solutions',
    desc: 'Modern online shopping platforms with product management, secure authentication, shopping carts and order processing.',
    href: '/projects/ecommerce-solutions',
  },
]

const services = [
  {
    num: '06',
    title: 'Full-Stack Development',
    desc: 'Scalable web applications built with modern frontend frameworks, backend technologies and database architectures.',
    href: '/services/full-stack-development',
  },
  {
    num: '07',
    title: 'UI/UX Development',
    desc: 'Clean, responsive and user-focused interfaces designed to deliver intuitive digital experiences across devices.',
    href: '/services/ui-ux-development',
  },
  {
    num: '08',
    title: 'API & Backend Development',
    desc: 'Secure REST APIs, database integration, authentication systems and reliable server-side application architecture.',
    href: '/services/backend-development',
  },
  {
    num: '09',
    title: 'Custom Software Solutions',
    desc: 'Tailored software systems that automate workflows, simplify business operations and solve real-world problems.',
    href: '/services/custom-software',
  },
  {
    num: '10',
    title: 'Performance & Optimization',
    desc: 'Faster loading experiences through optimized rendering, efficient code, responsive layouts and improved application performance.',
    href: '/services/performance-optimization',
  },
]


interface CardProps {
  num: string
  title: string
  desc: string
  href: string
}

function Card({ num, title, desc, href }: CardProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="pg-card">
      <span className="pg-card-num">{num}</span>
      <div className="pg-card-body">
        <h3 className="pg-card-title">{title}</h3>
        <p className="pg-card-desc">{desc}</p>
      </div>
      <span className="pg-card-arrow" aria-hidden>
        →
      </span>
    </a>
  )
}

export default function ProductsGrid() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = rootRef.current!.querySelectorAll('.pg-card')
      const headings = rootRef.current!.querySelectorAll('.pg-group-label')

      gsap.set([...cards, ...headings], { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(headings, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          })
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.15,
          })
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} id="services" className="pg-section">
      <div className="pg-header">
        <p className="pg-eyebrow">HAZRAT ABU BAKAR</p>
        <h2 className="pg-heading">Products &amp; Services</h2>
      </div>

      <div className="pg-group">
        <p className="pg-group-label">Products</p>
        <div className="pg-grid">
          {products.map((p) => (
            <Card key={p.num} {...p} />
          ))}
        </div>
      </div>

      <div className="pg-group">
        <p className="pg-group-label">Services</p>
        <div className="pg-grid">
          {services.map((s) => (
            <Card key={s.num} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
