import ListAll from "@/components/demo"
import { SectionCards } from "@/components/section-cards"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'GrocLog',
  description: '...',
}



export default function Page() {
  
  return (

    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <SectionCards/>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <ListAll/>   
        </div>
      </div>
    </div>

  )
}
