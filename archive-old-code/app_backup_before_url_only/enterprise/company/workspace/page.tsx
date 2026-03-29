"use client";

import { useEffect,useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function CompanyWorkspacePage(){

  const [name,setName] = useState("")
  const [industry,setIndustry] = useState("")
  const [size,setSize] = useState("")

  useEffect(()=>{

    setName(localStorage.getItem("enterprise_company_name") || "")
    setIndustry(localStorage.getItem("enterprise_company_industry") || "")
    setSize(localStorage.getItem("enterprise_company_size") || "")

  },[])

  return(

  <section className="py-10 sm:py-14">

    <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Company Workspace" />

    <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
      {name || "Company Workspace"}
    </h1>

    <p className="mt-4 text-white/70 max-w-3xl">
      This workspace represents your organization inside Shynvo Enterprise.
      Teams, members, meetings, analytics and collaboration will operate here.
    </p>

    <div className="mt-10 grid gap-4 md:grid-cols-3">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/60">Industry</div>
        <div className="text-xl font-semibold mt-2">{industry || "Not set"}</div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/60">Company Size</div>
        <div className="text-xl font-semibold mt-2">{size || "Not set"}</div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/60">Environment</div>
        <div className="text-xl font-semibold mt-2">Shynvo Enterprise</div>
      </div>

    </div>

  </section>

  )
}
