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
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

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

const courseOptions = [
  "Other",
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Economics",
  "Finance",
  "Medicine",
  "Law",
  "Psychology",
  "Political Science",
  "Architecture",
  "Design",
  "Data Science",
  "Artificial Intelligence",
]

const qualificationOptions = [
  "Schooling",
  "Undergraduate",
  "Postgraduate",
  "PhD",
  "Other",
]

export function ScholarshipForm() {
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(ScholarshipFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      qualification: "",
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

  // Qualification dropdown
  const [isQualificationDropdownOpen, setIsQualificationDropdownOpen] = useState(false)
  const [customQualification, setCustomQualification] = useState("")
  const qualificationDropdownRef = useRef<HTMLDivElement>(null)

  // Course dropdown
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false)
  const [courseSearchQuery, setCourseSearchQuery] = useState("")
  const [customCourse, setCustomCourse] = useState("")
  const courseDropdownRef = useRef<HTMLDivElement>(null)

  const toggleUniversity = (uni: string) => {
    if (uni === "Other") return
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

  const filteredCourses = courseOptions.filter((c) =>
    c.toLowerCase().includes(courseSearchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
      if (
        qualificationDropdownRef.current &&
        !qualificationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsQualificationDropdownOpen(false)
      }
      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCourseDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function onSubmit(data: ScholarshipFormValues) {
    setLoading(true)
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch {
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
              {/* Basic Info */}
              {[
                ["firstName", "First Name", "Jane"],
                ["lastName", "Last Name", "Doe"],
                ["email", "Email", "jane.doe@gmail.com"],
                ["phone", "Phone Number", "(+44) 1234 567890"],
              ].map(([name, label, placeholder]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof ScholarshipFormValues}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center gap-3">
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholder}
                          className="border border-input bg-white text-sm"
                          {...field}
                          disabled={submitted}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Qualification */}
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Highest Level of Qualification</FormLabel>
                    <div ref={qualificationDropdownRef} className="w-full relative">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => !submitted && setIsQualificationDropdownOpen((p) => !p)}
                        className={`w-full border border-input rounded-md shadow-xs px-3 py-2 flex items-center justify-between text-sm bg-white ${submitted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <span className="truncate">
                          {field.value || "Select your qualification"}
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>

                      {isQualificationDropdownOpen && !submitted && (
                        <div className="absolute z-10 mt-2 w-full rounded-md bg-white border border-input shadow-lg p-3 space-y-2 overflow-y-auto">
                          {qualificationOptions.map((q) =>
                            q === "Other" ? (
                              <div key={q} className="flex flex-col gap-2 px-2 py-1.5">
                                <label className="text-sm">Other (specify)</label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Input
                                    placeholder="Enter qualification"
                                    value={customQualification}
                                    onChange={(e) => setCustomQualification(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault()
                                        const trimmed = customQualification.trim()
                                        if (trimmed) {
                                          form.setValue("qualification", trimmed)
                                          setCustomQualification("")
                                          setIsQualificationDropdownOpen(false)
                                        }
                                      }
                                    }}
                                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                                  />
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const trimmed = customQualification.trim()
                                      if (trimmed) {
                                        form.setValue("qualification", trimmed)
                                        setCustomQualification("")
                                        setIsQualificationDropdownOpen(false)
                                      }
                                    }}
                                    disabled={!customQualification.trim()}
                                    className="text-xs cursor-pointer"
                                  >
                                    Add
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <label
                                key={q}
                                className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                  form.setValue("qualification", q)
                                  setIsQualificationDropdownOpen(false)
                                }}
                              >
                                <span>{q}</span>
                                {field.value === q && (
                                  <span className="text-xs text-green-600">✓</span>
                                )}
                              </label>
                            )
                          )}
                        </div>
                      )}
                    </div>
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
                    <FormLabel>Grade (GPA or equivalent)</FormLabel>
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

              {/* Desired Course */}
              <FormField
                control={form.control}
                name="desiredCourse"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel>Desired Course</FormLabel>
                    <div ref={courseDropdownRef} className="w-full relative">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => !submitted && setIsCourseDropdownOpen((p) => !p)}
                        className={`w-full border border-input rounded-md shadow-xs px-3 py-2 flex items-center justify-between text-sm bg-white ${submitted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <span className="truncate">
                          {field.value || "Select your desired course"}
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>

                      {isCourseDropdownOpen && !submitted && (
                        <div className="absolute z-10 mt-2 w-full rounded-md bg-white border border-input shadow-lg p-3 space-y-2 max-h-60 overflow-y-auto">
                          <Input
                            placeholder="Search courses..."
                            value={courseSearchQuery}
                            onChange={(e) => setCourseSearchQuery(e.target.value)}
                            className="border border-gray-300 text-sm mb-2"
                          />

                          {filteredCourses.map((c) =>
                            c === "Other" ? (
                              <div key={c} className="flex flex-col gap-2 px-2 py-1.5">
                                <label className="text-sm">Other (specify)</label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Input
                                    placeholder="Enter your course"
                                    value={customCourse}
                                    onChange={(e) => setCustomCourse(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault()
                                        const trimmed = customCourse.trim()
                                        if (trimmed) {
                                          form.setValue("desiredCourse", trimmed)
                                          setCustomCourse("")
                                          setIsCourseDropdownOpen(false)
                                        }
                                      }
                                    }}
                                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                                  />
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const trimmed = customCourse.trim()
                                      if (trimmed) {
                                        form.setValue("desiredCourse", trimmed)
                                        setCustomCourse("")
                                        setIsCourseDropdownOpen(false)
                                      }
                                    }}
                                    disabled={!customCourse.trim()}
                                    className="text-xs cursor-pointer"
                                  >
                                    Add
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <label
                                key={c}
                                className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                  form.setValue("desiredCourse", c)
                                  setIsCourseDropdownOpen(false)
                                }}
                              >
                                <span>{c}</span>
                                {field.value === c && (
                                  <span className="text-xs text-green-600">✓</span>
                                )}
                              </label>
                            )
                          )}
                        </div>
                      )}
                    </div>
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
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => !submitted && setIsDropdownOpen((p) => !p)}
                        className={`w-full border border-input rounded-md shadow-xs px-3 py-2 flex items-center justify-between text-sm bg-white ${submitted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <span className="truncate">
                          {selectedUniversities.length > 0
                            ? `${selectedUniversities.length} selected`
                            : "Select universities"}
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>

                      {isDropdownOpen && !submitted && (
                        <div className="absolute z-10 mt-2 w-full rounded-md bg-white border border-input shadow-lg p-3 space-y-2 max-h-60 overflow-y-auto">
                          <Input
                            placeholder="Search universities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 text-sm mb-2"
                          />

                          {filteredUniversities.map((uni) =>
                            uni === "Other" ? (
                              <div key={uni} className="flex flex-col gap-2 px-2 py-1.5">
                                <label className="text-sm">Other (specify)</label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Input
                                    placeholder="Enter university name"
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
                                key={uni}
                                className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => toggleUniversity(uni)}
                              >
                                <span>{uni}</span>
                                {selectedUniversities.includes(uni) && (
                                  <span className="text-xs text-green-600">✓</span>
                                )}
                              </label>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    {selectedUniversities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        {selectedUniversities.map((uni) => (
                          <span
                            key={uni}
                            className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            {uni}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => toggleUniversity(uni)}
                            />
                          </span>
                        ))}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="text-xs text-red-600 hover:text-red-800"
                          onClick={clearAll}
                        >
                          Clear All
                        </Button>
                      </div>
                    )}
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
                    <FormLabel>
                      Why do you deserve this scholarship?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your response here..."
                        className="border border-input bg-white text-sm min-h-[120px]"
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
                    <FormLabel>
                      How will this scholarship benefit you?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain how this scholarship will impact your education or career..."
                        className="border border-input bg-white text-sm min-h-[120px]"
                        {...field}
                        disabled={submitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted</DialogTitle>
            <DialogDescription>
              Thank you for applying! We’ll review your submission and reach out soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}