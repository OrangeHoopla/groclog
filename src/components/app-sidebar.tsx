import * as React from "react"

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  // versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Image Processing",
      url: "#",
      items: [
        {
          title: "Upload",
          url: "upload",
        },
      ],
    },
    {
      title: "Data",
      url: "#",
      items: [
        {
          title: "Entries",
          url: "#",
        },
        {
          title: "Metrics",
          url: "#",
          isActive: true,
        },
      ],
    },
  ],
}

export function AppSidebar(props: { active: string } ) {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.title === props.active}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
