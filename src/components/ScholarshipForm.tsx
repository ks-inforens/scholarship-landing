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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

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
  "Other",
  "University of Oxford",
  "University College London (UCL)",
  "London School of Economics (LSE)",
  "London Business School (LBS)",
  "Imperial College London",
  "Trinity College Dublin",
  "University College Dublin",
  "New York University, Abu Dhabi (NYUAD)",
  "Zayed University",
]

export function ScholarshipForm() {
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(ScholarshipFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      grade: "",
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
  const [loading, setLoading] = useState(false)
  const [customUni, setCustomUni] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDialog, setShowDialog] = useState(false)

  const toggleUniversity = (uni: string) => {
    if (uni === "Other") return // handled separately
    if (selectedUniversities.includes(uni)) {
      form.setValue(
        "preferredUniversities",
        selectedUniversities.filter((u) => u !== uni)
      )
    } else {
      form.setValue("preferredUniversities", [...selectedUniversities, uni])
    }
  }

  const addCustomUniversity = () => {
    const trimmed = customUni.trim()
    if (trimmed && !selectedUniversities.includes(trimmed)) {
      form.setValue("preferredUniversities", [...selectedUniversities, trimmed])
      setCustomUni("")
      setIsDropdownOpen(false)
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
    setLoading(true)
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
        setShowDialog(true)
      } else {
        toast.error("Submission failed. Please try again.")
      }
    } catch (err) {
      toast.error("Error submitting form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 w-full max-w-3xl">
      <Card className="rounded-3xl bg-black/1">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-clip-text bg-gradient-to-b from-orange-800 to-orange-600 text-transparent font-bold py-1">
            Apply Now!
          </CardTitle>
          <CardDescription className="text-center space-y-1">
            This is a highly competitive scholarship opportunity, and only the top 400 applicants with the most compelling and well-thought-out responses will be selected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane"
                        className="border border-input bg-white text-sm"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="border border-input bg-white text-sm"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jane.doe@gmail.com"
                        className="border border-input bg-white text-sm"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(+44) 1234 567890"
                        className="border border-input bg-white text-sm"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade */}
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Grade (GCPA Percentage or equivalent)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 85%"
                        className="border border-input bg-white text-sm"
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
                                      form.setValue(
                                        "preferredUniversities",
                                        selectedUniversities.filter((u) => u !== uni)
                                      )
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
                            <div key={uni}>
                              {uni === "Other" ? (
                                <div className="flex flex-col gap-2 px-2 py-1.5">
                                  <label className="flex items-center justify-between cursor-pointer text-sm">
                                    <span>Other (specify)</span>
                                  </label>

                                  <div className="flex items-center gap-2 mt-1">
                                    <Input
                                      placeholder="Enter custom university name"
                                      value={customUni}
                                      onChange={(e) => setCustomUni(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault()
                                          addCustomUniversity()
                                        }
                                      }}
                                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                                    />
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      onClick={addCustomUniversity}
                                      disabled={!customUni.trim()}
                                      className="text-xs cursor-pointer"
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <label
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
                              )}
                            </div>
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
                        <SelectTrigger className="w-full border border-input bg-white text-sm">
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
                        className="border border-input bg-white text-sm"
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
                        className="border border-input bg-white text-sm"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex flex-col items-center justify-center gap-4">
                <Button
                  type="submit"
                  className="w-full max-w-sm bg-[#db5800] hover:bg-[#cb5100] text-white rounded-full cursor-pointer"
                  disabled={submitted || loading}
                >
                  {submitted ? "Application Submitted" : loading ? <Spinner /> : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Dialog after submission */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-green-800 text-xl">Application Submitted 🎉</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              Your application has been submitted successfully!
            </DialogDescription>
            <DialogDescription className="text-sm text-muted-foreground">
              Our admissions team is reviewing your application and will contact you soon.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3">
            <h3 className="text-md font-semibold text-black/80">Next Steps</h3>
            <ul className="list-disc list-inside text-sm text-black/60 space-y-1">
              <li>Login or create an account on Inforens to track your application status.</li>
              <li>Join our student community to connect with peers and mentors.</li>
              <li>Explore other plans and benefits we offer to international students.</li>
            </ul>
          </div>

          <DialogFooter className="flex flex-col gap-2 mt-4 sm:flex-row sm:justify-start">
            <a
              href="https://www.inforens.com"
              target="_blank"
              className="justify-center items-center rounded-md bg-[#db5800] px-4 py-2 text-sm font-medium text-white hover:bg-[#cb5100] transition"
            >
              Login Now
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}