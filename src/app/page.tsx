'use client'

import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScholarshipForm } from '@/components/ScholarshipForm'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center bg-gradient-to-t from-white to-orange-50">
      {/* Hero Section */}
      <section className="w-full bg-black/80 relative shadow-md">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url('/hero.png')` }}
        />
        <div className="relative z-10 text-center text-white py-40 px-4">
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>Inforens</h1>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            International <span className='bg-clip-text text-transparent bg-gradient-to-b from-orange-50 to-orange-300'>Student Success</span> Programme
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-md font-medium">
            We've repositioned our <span className='font-bold'>£2,000</span> support initiative from a traditional "scholarship" to a comprehensive student success programme.
          </p>
          <Button
            className="mt-8 bg-white/90 hover:bg-white/95 text-black px-8 py-5 cursor-pointer"
          >
            Apply Now
          </Button>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className='mt-[-6rem] w-full max-w-5xl z-1 flex flex-col gap-4 bg-gray-50/95 backdrop-blur-xs rounded-4xl border border-black/10 shadow-xs py-8 px-24'>
        <h1 className='text-center text-2xl bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 font-bold'>Our program includes</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
            <CardHeader>
              <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Academic Support Package</CardTitle>
              <CardDescription className='text-center space-y-1'>
                <p className='text-3xl font-medium'>£500</p>
                <p>direct fee contribution</p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
            <CardHeader>
              <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Career Excellence Program</CardTitle>
              <CardDescription className='text-center space-y-1'>
                <p className='text-3xl font-medium'>£1,500</p>
                <p>over a course of 2 years</p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
            <CardHeader>
              <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Elite Mentor Network</CardTitle>
              <CardDescription className='text-center space-y-1'>
                <div className='mx-6 grid grid-cols-4 gap-6 justify-items-center py-2'>
                  <img className='h-14 rounded-full border border-black/20' src="/google.png" />
                  <img className='h-14 rounded-full border border-black/20' src="/amazon.png" />
                  <img className='h-14 rounded-full border border-black/20' src="/mckinsey.png" />
                  <img className='h-14 rounded-full border border-black/20' src="/nhs.png" />
                </div>
                <p>Access to our strong mentor network working at top companies</p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
            <CardHeader>
              <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Landing Support Services</CardTitle>
              <CardDescription className='text-center space-y-1'>
                <div className='mx-16 grid grid-cols-3 gap-6 justify-items-center py-2'>
                  <img className='h-14 rounded-full border border-black/20' src="/uk.png" />
                  <img className='h-14 rounded-full border border-black/20' src="/ireland.png" />
                  <img className='h-14 rounded-full border border-black/20' src="/dubai.png" />
                </div>
                <p>Practical arrival assistance in UK, Ireland and Dubai</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </section>

      {/* Why This Programme (text + image) */}
      <section className="my-16 px-4 w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold">Why This Program?</h2>
          <p className='text-lg'>
            This programme serves <b className='font-medium'>400+</b> international students annually and focuses on <b className='font-medium'>holistic support</b> rather than just funding.
            Beyond just mentorship, it’s a complete career solution, an investment in your future!
          </p>
          <p className="font-semibold text-lg">
            Don’t just pay tuition — invest in a programme that pays for itself in your career.
          </p>
        </div>
      </section>

      {/* Application Form Section */}
      <ScholarshipForm />
    </main>
  )
}