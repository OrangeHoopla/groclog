import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { Logos } from "@/components/blocks/logos";
import { Pricing } from "@/components/blocks/pricing";
import { ResourceAllocation } from "@/components/blocks/resource-allocation";
import { Testimonials } from "@/components/blocks/testimonials";
import { Metadata } from "next"
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { Navbar } from "@/components/blocks/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: 'GrocLog',
  description: '...',
}

export default function Home() {
  return (
    <>
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
      <Background className="via-muted to-muted/80">
        <Navbar />
        <Hero />
        {/* <Logos /> */}
        <Features />
        <ResourceAllocation />
      </Background>
      <Testimonials />
      <Background variant="bottom">
        <Pricing />
        <FAQ />
      </Background>
      </ThemeProvider>
    </>
  );
}



// export default function Page() {
  
//   return (

//     <div>
//       <LoginButton />
//       <LogoutButton/>
//       hello
//     </div>

//   )
// }
