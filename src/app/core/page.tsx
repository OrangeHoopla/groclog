
import { AppSidebar } from "@/components/app-sidebar";
import ListAll from "@/components/demo"
import { SectionCards } from "@/components/section-cards"
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth0 } from "@/lib/auth0";
import { ComponentType } from "react";



export default auth0.withPageAuthRequired(async function Page() {
  
  const session = await auth0.getSession();
  const user = session?.user;
  
  return (
    
    <div>
      <SidebarProvider>
        <AppSidebar about={user?.name} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <SectionCards />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                <ListAll />
              </div>
            </div>
          </SidebarInset>
      </SidebarProvider>
    </div>
      
      

  )
},{ returnTo: '/core' }) as ComponentType<any>;


