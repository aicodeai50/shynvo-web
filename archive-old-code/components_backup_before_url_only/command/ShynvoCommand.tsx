"use client"

import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ShynvoCommand() {

  const router = useRouter()
  const [open,setOpen] = useState(false)

  useEffect(() => {
    const down = (e:KeyboardEvent) => {
      if((e.metaKey || e.ctrlKey) && e.key === "k"){
        e.preventDefault()
        setOpen(o => !o)
      }
    }

    document.addEventListener("keydown",down)
    return () => document.removeEventListener("keydown",down)

  },[])

  return (

    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Shynvo Command"
      className="fixed inset-0 z-50 flex items-start justify-center pt-40 bg-black/40 backdrop-blur"
    >

      <Command.Input
        placeholder="Search environments or commands..."
        className="w-[600px] rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none"
      />

      <Command.List className="mt-3 w-[600px] rounded-xl border border-white/10 bg-black/90 p-2">

        <Command.Group heading="Environments">

          <Command.Item onSelect={()=>router.push("/enterprise")}>
            Shynvo Enterprise
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/academy")}>
            Shynvo Academy
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/university")}>
            University Hub
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/experiments")}>
            Experiments
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/frontier")}>
            Frontier Lab
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/arcade")}>
            Arcade Sim
          </Command.Item>

        </Command.Group>

        <Command.Group heading="Enterprise">

          <Command.Item onSelect={()=>router.push("/enterprise/missions")}>
            Missions
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/enterprise/analytics")}>
            Analytics
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/enterprise/rooms")}>
            Rooms
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/enterprise/strategy")}>
            Strategy
          </Command.Item>

          <Command.Item onSelect={()=>router.push("/enterprise/settings")}>
            Settings
          </Command.Item>

        </Command.Group>

      </Command.List>

    </Command.Dialog>

  )
}
