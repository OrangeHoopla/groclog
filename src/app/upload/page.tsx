"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// import { uploadFile } from "./upload-action";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

export default function InputFile() {
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    const formdata = new FormData();
    const hmm = fileInput.current?.files || null
    const res = hmm?.[0] || null
    formdata.append("file", res!);
    await fetch("/api/", { method: "POST", body: formdata });
    router.refresh();
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" ref={fileInput} />
      <Button onClick={uploadFile}>Submit</Button>
    </div>
  )
}

// export default function UploadForm() {
//   const fileInput = useRef<HTMLInputElement>(null);

//   const router = useRouter();

//   async function uploadFile(
//     evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) {
//     evt.preventDefault();
//     const formdata = new FormData();
//     const hmm = fileInput.current?.files || null
//     const res = hmm?.[0] || null
//     formdata.append("file", res!);
//     await fetch("/api/", { method: "POST", body: formdata });
//     router.refresh();
//   }

//   return (
//     <form
//       method="POST"
//       action="/api/"
//       className="flex flex-col gap-4"
//     >
//       <label>
//         <span>Upload a file Now</span>
//         <input type="file" name="file" ref={fileInput} />
//       </label>
//       <button type="submit" onClick={uploadFile}>
//         Submit
//       </button>
//     </form>
//   );
// }