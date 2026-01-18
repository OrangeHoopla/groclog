import { AppSidebar } from "@/components/app-sidebar";
import ListAll from "@/components/demo"
import { SectionCards } from "@/components/section-cards"
import { auth0 } from "@/lib/auth0";


export default auth0.withPageAuthRequired(async function Page() {
  
  const session = await auth0.getSession();
  const user = session?.user;
  
  return (
    
    <div>
      <AppSidebar about={user?.name} />
      
      <div className="flex flex-1 flex-col gap-4 p-4">
        
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <SectionCards />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <ListAll />
        </div>
      </div>
    </div>

  )
},{
  returnTo: '/core'
});


