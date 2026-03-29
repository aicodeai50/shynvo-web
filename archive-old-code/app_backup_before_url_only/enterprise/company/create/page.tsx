"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function CreateCompanyPage() {

  const router = useRouter()

  const [name,setName] = useState("")
  const [industry,setIndustry] = useState("")
  const [size,setSize] = useState("")

  function createCompany(){

    if(!name.trim()) return

    localStorage.setItem("enterprise_company_name",name)
    localStorage.setItem("enterprise_company_industry",industry)
    localStorage.setItem("enterprise_company_size",size)

    router.push("/enterprise/company/workspace")

  }

  return (

  <section className="py-10 sm:py-14">

    <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Create Company" />

    <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
      Create Company Workspace
    </h1>

    <p className="mt-4 text-white/70 max-w-3xl">
      Create a company workspace to manage teams, meetings, rooms,
      analytics, and internal collaboration.
    </p>

    <div className="mt-10 max-w-xl grid gap-4">

      <input
      placeholder="Company name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
      />

      <input
      placeholder="Industry"
      value={industry}
      onChange={(e)=>setIndustry(e.target.value)}
      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
      />

      <input
      placeholder="Company size"
      value={size}
      onChange={(e)=>setSize(e.target.value)}
      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
      />

      <button
      onClick={createCompany}
      className="rounded-2xl bg-white text-black font-semibold px-5 py-3 mt-2"
      >
      Create Workspace
      </button>

    </div>

  </section>

  )
}
