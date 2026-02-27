import { redirect } from "next/navigation";

export default function AccountRedirect() {
  // later: check auth/cookie then redirect accordingly
  redirect("/my-account"); // or "/login"
}
