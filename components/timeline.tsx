"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Chief Technical Officer",
    company: "Liberty Hills Systems",
    period: "December 2023 – July 2025",
    description:
      "Led technical architecture and software development of a platform connecting customers with certified technicians. Designed scalable web applications and backend APIs using JavaScript and TypeScript. Established engineering standards and directed implementation of secure authentication, appointment scheduling, and payment integration.",
  },
  {
    title: "Chief Product Officer",
    company: "Cinnoc",
    period: "2022 – April 2026",
    description:
      "Led product vision and roadmap for a cloud-based inventory and accounting platform for SMBs. Collaborated with engineering and design teams to deliver inventory management, sales tracking, expense management, invoicing, and financial reporting features.",
  },
  {
    title: "Senior Frontend Developer",
    company: "Valvitek",
    period: "July 2021 – October 2023",
    description:
      "Developed responsive, high-performance web applications using React, Next.js, and TypeScript. Built reusable UI components and scalable frontend architectures. Optimized application performance, accessibility, and SEO across desktop and mobile devices.",
  },
  {
    title: "Full Stack Engineer (Freelance / Contract)",
    company: "Upwork",
    period: "2022 – Present",
    description:
      "Built full-stack websites and mobile applications for diverse clients. Implemented secure authentication with JWT and role-based access control. Designed database schemas and created technical documentation. Integrated third-party tools and managed project timelines effectively.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
