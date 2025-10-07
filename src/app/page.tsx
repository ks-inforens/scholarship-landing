'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScholarshipForm } from '@/components/ScholarshipForm'
import { FadeInUp } from '@/lib/animations'
import { Mentors } from '@/components/Mentors'

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
          <FadeInUp delay={0.1}>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight'>Inforens</h1>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              International <span className='bg-clip-text text-transparent bg-gradient-to-b from-orange-50 to-orange-300'>Student Success</span> Programme
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.6}>
            <p className="mt-6 max-w-2xl mx-auto text-md font-medium">
              We have repositioned our <span className='font-bold'>£2,000</span> support initiative from a traditional &ldquo;scholarship&ldquo; to a comprehensive student success programme.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.7}>
            <Button
              onClick={() => {
                const formSection = document.getElementById("scholarshipForm")
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="mt-8 bg-white/90 hover:bg-white/95 text-black px-8 py-5 cursor-pointer"
            >
              Apply Now
            </Button>
          </FadeInUp>
        </div>
      </section>

      {/* Info Cards Section */}
      <FadeInUp delay={0.7} className='w-full flex justify-center'>
        <section className='mt-[-6rem] w-full max-w-5xl z-1 flex flex-col gap-4 bg-gray-50/95 backdrop-blur-xs rounded-4xl border border-black/10 shadow-xs py-8 px-8 md:px-24'>
          <h1 className='text-center text-2xl bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 font-bold'>Our programme includes</h1>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
              <CardHeader>
                <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Academic Support Package</CardTitle>
                <CardDescription className='text-center space-y-3'>
                  <p className='text-3xl font-medium'>£500</p>
                  <p className='font-bold text-orange-700/80 uppercase'>deducted off your university fees</p>
                  <p>We will directly contribute £500 to be deducted from your university fees.</p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
              <CardHeader>
                <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Career Excellence Programme</CardTitle>
                <CardDescription className='text-center space-y-3'>
                  <p className='text-3xl font-medium'>£1,500</p>
                  <p className='text-orange-700/80 font-bold uppercase'>worth of mentorship across 2 years</p>
                  <p>Our mentors will provide career mentorship, CV reviews, interview practice and practical advice to help you land your dream job.</p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-md bg-gradient-to-t from-slate-50 to-white">
              <CardHeader>
                <CardTitle className="text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">Elite Mentor Network</CardTitle>
                <CardDescription className='text-center space-y-1'>
                  <div className='mx-6 grid grid-cols-4 gap-6 justify-items-center py-2'>
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/companies/google.png" />
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/companies/amazon.png" />
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/companies/mckinsey.png" />
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/companies/nhs.png" />
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
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/countries/uk.png" />
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/countries/ireland.png" />
                    <img className='h-14 w-14 rounded-full border border-black/20' src="/countries/dubai.png" />
                  </div>
                  <p>Practical arrival assistance in UK, Ireland and Dubai</p>
                </CardDescription>
              </CardHeader>
            </Card>
          </section>
        </section>
      </FadeInUp>

      {/* Why This Programme (text + image) */}
      <section className="my-16 px-4 w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
        <div className="space-y-6 text-center md:text-left">
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl font-semibold text-gray-900">Why This Programme?</h2>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-md md:text-lg text-gray-700">
              Studying abroad is a life-changing opportunity, but for thousands of talented international students, the path is filled with confusion, misinformation, and unreliable middlemen. Our programme is designed to change that narrative.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.5}>
            <p className="text-md md:text-lg text-gray-700">
              We support over <b className="font-semibold">400+ international students every year</b> with honest, transparent, and comprehensive guidance &mdash; not just for university admissions, but for your <b className="font-semibold">entire career journey abroad</b>.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.7}>
            <p className="text-md md:text-lg text-gray-700">
              We connect you with real mentors, real alumni, and real admissions professionals from top global institutions &mdash; including <b className="font-semibold">Cambridge, Oxford, UCL, Imperial</b> and many others.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.7}>
            <div className='flex justify-center md:justify-start gap-8 px-2'>
              <img
                src="/universities/cambridge.svg"
                alt="Mentorship"
                className="rounded-2xl h-16"
              />
              <img
                src="/universities/oxford.svg"
                alt="Mentorship"
                className="rounded-2xl h-16"
              />
              <img
                src="/universities/ucl.svg"
                alt="Mentorship"
                className="rounded-2xl h-16"
              />
              <img
                src="/universities/imperial.svg"
                alt="Mentorship"
                className="rounded-2xl h-16"
              />
            </div>
          </FadeInUp>

          <FadeInUp delay={0.9}>
            <p className="text-md md:text-lg text-gray-700">
              Whether you are from a Tier-2 city, a remote town, or anywhere across the globe, we empower you with <b className="font-semibold">trusted information, mentorship, and funding options</b> that are proven to work.
            </p>
          </FadeInUp>

          <FadeInUp delay={1.1}>
            <p className="font-semibold text-lg text-gray-900">
              Don&rsquo;t just pay tuition &mdash; invest in a programme that pays you back with global opportunities, visa success, scholarships, and a confident future abroad.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="w-full px-4 md:px-8">
        <Mentors />
      </section>

      {/* Application Form Section */}
      <FadeInUp delay={0.7} className='w-full'>
        <div id="scholarshipForm" className="w-full flex justify-center py-16">
          <ScholarshipForm />
        </div>
      </FadeInUp>
    </main>
  )
}