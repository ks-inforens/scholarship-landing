// components/Steps.tsx
'use client'

import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import {
    CheckCircle,
    UserPlus,
    BookOpen,
    Globe,
    Plane,
    Users,
    Briefcase,
    Star,
} from 'lucide-react'
import { FadeInUp } from '@/lib/animations'

interface Step {
    title: string
    description: string
    icon: React.ReactNode
}

const steps: Step[] = [
    {
        title: `Discover Your Best Fit University & Country`,
        description: `We provide personalised guidance to help international students choose the perfect study abroad destination and university based on academic goals, career ambitions, and lifestyle preferences.`,
        icon: <Globe className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Complete Support With University Applications`,
        description: `Get expert assistance on every part of the application process including SOPs, academic CVs, essays, and documentation. Our team helps you build a strong profile for global universities.`,
        icon: <BookOpen className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Visa Guidance and Immigration Support`,
        description: `We simplify the student visa process with up-to-date immigration guidance, financial documentation support, and interview prep for your chosen study abroad destination.`,
        icon: <UserPlus className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Review and Choose the Best Admission Offers`,
        description: `Once your offer letters arrive, we help you compare university rankings, scholarships, and career outcomes to choose the best path forward.`,
        icon: <CheckCircle className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Travel, Flights, and Pre-Departure Prep`,
        description: `From booking affordable flights to managing baggage, accommodation and travel plans, we ensure you arrive confidently and stress-free at your university abroad.`,
        icon: <Plane className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Community Support After You Land`,
        description: `Join a vibrant international student community through local events, orientation treasure hunts, networking groups, and peer support once you arrive.`,
        icon: <Users className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Career Mentorship Throughout Your Studies`,
        description: `Get continuous career development support including CV building, LinkedIn profile reviews, internship hunting strategies and mock interviews tailored for international students.`,
        icon: <Briefcase className="w-5 h-5 text-white/95" />,
    },
    {
        title: `Pay It Forward as a Student Mentor`,
        description: `After graduation and career placement, become a mentor and support new international students. Help build a global community that grows together and gives back.`,
        icon: <Star className="w-5 h-5 text-white/95" />,
    },
]

export function Steps() {
    return (
        <section className="relative px-4 md:px-12 lg:px-24">
            <div className="relative border-l-2 border-black/80">
                {steps.map((step, idx) => (
                    <FadeInUp key={idx} delay={idx * 0.1}>
                        <div className="mb-10 ml-4 relative group">
                            {/* Circle marker */}
                            <span className="absolute flex justify-center items-center -left-[33px] top-0 w-8 h-8 bg-black/80 rounded-full shadow-md z-10">
                                {step.icon}
                            </span>

                            {/* Card content */}
                            <Card className="h-full min-h-30 px-8 shadow-sm hover:shadow-md transition">
                                <div className="flex items-start gap-4">
                                    <div>
                                        <CardHeader className="p-0 mb-1">
                                            <CardTitle className="text-lg font-semibold">
                                                <span className='bg-clip-text text-transparent bg-gradient-to-b from-orange-800 to-orange-600'>Step {idx + 1}.</span> {step.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0 text-gray-600 text-sm">
                                            {step.description}
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </FadeInUp>
                ))}
            </div>
        </section>
    )
}
