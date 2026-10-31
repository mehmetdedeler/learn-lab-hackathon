import { redirect } from "next/navigation";

// The app is Bruno (plain HTML/CSS/JS in public/bruno). The old builder page is at /lab.
export default function Home() {
  redirect("/bruno/index.html");
}
