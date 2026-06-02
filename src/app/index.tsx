import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/login" />;
}

import { router } from "expo-router";
router.push("/register");
router.push("/login");
