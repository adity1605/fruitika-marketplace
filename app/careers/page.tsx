"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Briefcase, Send, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    coverLetter: ""
  })
  const [resume, setResume] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, position: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })
      if (resume) {
        submitData.append('resume', resume)
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: submitData
      })
      
      if (response.ok) {
        setSubmitted(true)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        alert('❌ Failed to submit application: ' + (errorData.error || 'Please try again'))
      }
    } catch (error) {
      console.error('Application submission error:', error)
      alert('❌ Network error. Please check your connection and try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f9f4e7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#2F5233] mb-4">Application Submitted!</h1>
          <p className="text-[#5A6B5D] mb-6">
            Thank you for your interest in joining Fruitika. Our HR team will review your application and get back to you within 5-7 business days.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-[#2F5233] hover:bg-[#8FBC8F]">
              <Link href="/careers">View More Positions</Link>
            </Button>
            <Button variant="outline" asChild className="w-full border-[#8FBC8F] text-[#2F5233]">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <header className="bg-[#f9f4e7]/80 backdrop-blur-[2px] border-b border-[#8FBC8F]/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center text-[#2F5233] hover:text-[#8FBC8F]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Briefcase className="w-16 h-16 text-[#2F5233] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#2F5233] mb-4">Join Our Team</h1>
            <p className="text-xl text-[#5A6B5D] max-w-2xl mx-auto">
              Be part of the global fruit export industry. We're looking for passionate individuals to help us deliver premium fruits worldwide.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Global Impact</h3>
                <p className="text-[#5A6B5D]">Work with international clients and make a difference in global food supply chains.</p>
              </CardContent>
            </Card>
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Growth Opportunities</h3>
                <p className="text-[#5A6B5D]">Advance your career in a rapidly growing company with learning opportunities.</p>
              </CardContent>
            </Card>
            <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#2F5233] mb-2">Great Benefits</h3>
                <p className="text-[#5A6B5D]">Competitive salary, health benefits, and flexible working arrangements.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#8FBC8F]/20 bg-[#fefcf5]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#2F5233]">Apply Now</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-[#2F5233]">Full Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#2F5233]">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-[#2F5233]">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-[#2F5233]">Current Location</Label>
                    <Input id="location" name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} className="border-[#8FBC8F]/30 focus:border-[#2F5233]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="position" className="text-[#2F5233]">Position *</Label>
                    <Select onValueChange={handleSelectChange} required>
                      <SelectTrigger className="border-[#8FBC8F]/30 focus:border-[#2F5233]">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales-manager">Sales Manager</SelectItem>
                        <SelectItem value="export-coordinator">Export Coordinator</SelectItem>
                        <SelectItem value="quality-control">Quality Control Specialist</SelectItem>
                        <SelectItem value="logistics-coordinator">Logistics Coordinator</SelectItem>
                        <SelectItem value="customer-service">Customer Service Representative</SelectItem>
                        <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-[#2F5233]">Experience Level *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, experience: value})} required>
                      <SelectTrigger className="border-[#8FBC8F]/30 focus:border-[#2F5233]">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                        <SelectItem value="executive">Executive Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="resume" className="text-[#2F5233]">Resume/CV</Label>
                  <div className="mt-2">
                    <Input 
                      id="resume" 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                      className="border-[#8FBC8F]/30 focus:border-[#2F5233]"
                    />
                    <p className="text-sm text-[#5A6B5D] mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="coverLetter" className="text-[#2F5233]">Cover Letter</Label>
                  <Textarea 
                    id="coverLetter" 
                    name="coverLetter" 
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={formData.coverLetter} 
                    onChange={handleChange} 
                    rows={6} 
                    className="border-[#8FBC8F]/30 focus:border-[#2F5233]" 
                  />
                </div>

                <Button type="submit" className="w-full bg-[#2F5233] hover:bg-[#8FBC8F] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}