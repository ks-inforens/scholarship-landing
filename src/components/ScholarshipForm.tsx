"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ScholarshipFormSchema,
  ScholarshipFormValues,
} from "@/lib/formSchema"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { toast } from "sonner"
import  { Spinner } from "@/components/ui/spinner"

const courseOptions = [
  "Computer Science",
  "Business Administration",
  "Engineering",
  "Medicine",
  "Law",
  "Design",
  "Economics",
]

const universityOptions = [
  "University of Oxford",
  "Harvard University",
  "MIT",
  "University of Toronto",
  "National University of Singapore",
  "University College Dublin",
]

export function ScholarshipForm() {
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(ScholarshipFormSchema),
    defaultValues: {
      fullName: "",
      preferredUniversities: [],
      desiredCourse: "",
      justification: "",
      benefit: "",
    },
    mode: "onTouched",
  })

  const selectedUniversities = form.watch("preferredUniversities")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [submitted, setSubmitted] = useState(false)  
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleUniversity = (uni: string) => {
    if (selectedUniversities.includes(uni)) {
      form.setValue(
        "preferredUniversities",
        selectedUniversities.filter((u) => u !== uni)
      )
    } else {
      form.setValue("preferredUniversities", [...selectedUniversities, uni])
    }
  }

  const clearAll = () => {
    form.setValue("preferredUniversities", [])
    setSearchQuery("")
  }

  const filteredUniversities = universityOptions.filter((uni) =>
    uni.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  async function onSubmit(data: ScholarshipFormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        toast.success("Successfully applied!")
        setSubmitted(true)
      } else {
        toast.error("Submission failed. Please try again.")
      }
    } catch (err) {
      toast.error("Error submitting form. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-4 w-full max-w-3xl mb-20">
      <Card className="rounded-3xl bg-black/1">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">
            Apply Now
          </CardTitle>
          <CardDescription className="text-center space-y-1">
            Fill in some basic information to gain a real chance to access our community!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane Doe"
                        className="border border-input bg-white"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Universities */}
              <FormField
                control={form.control}
                name="preferredUniversities"
                render={() => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Preferred Universities</FormLabel>
                    <div ref={dropdownRef} className="w-full relative">
                      {/* Trigger Box */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => !submitted && setIsDropdownOpen((prev) => !prev)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !submitted) setIsDropdownOpen((prev) => !prev)
                        }}
                        className={`w-full border border-input rounded-md shadow-xs px-3 py-2 flex items-center justify-between text-sm bg-white ${
                          submitted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <div className="flex flex-wrap gap-1 items-center">
                          {selectedUniversities.length > 0 ? (
                            selectedUniversities.map((uni) => (
                              <span
                                key={uni}
                                className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                              >
                                {uni}
                                {!submitted && (
                                  <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleUniversity(uni)
                                    }}
                                  />
                                )}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">Select universities</span>
                          )}
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && !submitted && (
                        <div className="absolute z-10 mt-2 w-full rounded-md bg-white border border-input shadow-lg p-3 space-y-2 max-h-60 overflow-y-auto">
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full rounded-full bg-gray-100 border-none px-4 text-sm mb-2"
                          />
                          {selectedUniversities.length >= 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={clearAll}
                              className="w-full text-sm border border-input cursor-pointer"
                            >
                              Clear All
                            </Button>
                          )}
                          {filteredUniversities.map((uni) => (
                            <label
                              key={uni}
                              className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                            >
                              <span>{uni}</span>
                              <input
                                type="checkbox"
                                checked={selectedUniversities.includes(uni)}
                                onChange={() => toggleUniversity(uni)}
                                className="accent-black/80 cursor-pointer"
                              />
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Desired Course */}
              <FormField
                control={form.control}
                name="desiredCourse"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Desired Course</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={submitted}>
                      <FormControl>
                        <SelectTrigger className="w-full border border-input bg-white">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseOptions.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Justification */}
              <FormField
                control={form.control}
                name="justification"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Why do you believe you deserve this scholarship?</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Share your reasons..."
                        className="border border-input bg-white"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Benefit */}
              <FormField
                control={form.control}
                name="benefit"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>How will receiving this scholarship benefit you?</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Explain how this opportunity will help you..."
                        className="border border-input bg-white"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full max-w-sm bg-[#db5800] hover:bg-[#cb5100] text-white rounded-full cursor-pointer"
                  disabled={submitted}
                >
                  {submitted ? "Application Submitted" : loading ? <Spinner /> : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}