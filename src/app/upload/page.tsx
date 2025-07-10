"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// import { uploadFile } from "./upload-action";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    var formdata = new FormData();
    formdata.append("file", fileInput?.current?.files?.[0]!);
    await fetch("/api/", { method: "POST", body: formdata });
    router.refresh();
  }

  return (
    <form
      method="POST"
      action="/api/"
      className="flex flex-col gap-4"
    >
      <label>
        <span>Upload a file Now</span>
        <input type="file" name="file" ref={fileInput} />
      </label>
      <button type="submit" onClick={uploadFile}>
        Submit
      </button>
    </form>
  );
}