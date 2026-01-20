import { FAQ } from "@/components/blocks/faq";
import { Metadata } from "next"
import { FeatureSection } from "@/components/land/feature-section";
import { HeroSection } from "@/components/land/hero-section";
import { LogoCloud } from "@/components/land/logo-cloud";
import { CTA } from "@/components/land/cta";
import { PricingSection } from "@/components/land/pricing";
import { SocialProof } from "@/components/land/social-proof";
//https://github.com/shadcnblocks/mainline-nextjs-template/blob/master/public/hero.webp reference
export const metadata: Metadata = {
  title: 'GrocLog',
  description: '...',
}

function LandingPage() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <FeatureSection />
      <SocialProof />
      <CTA />
      <FAQ />
      <PricingSection />
    </>
  )
}
export default LandingPage


// export default function Page() {
  
//   return (

//     <div>
//       <LoginButton />
//       <LogoutButton/>
//       hello
//     </div>

//   )
// }
