import { request } from "@/hooks/use-api";
import Home from "@/page/home";

export default async function HomeRoute() {
  const spotlight = await request('/roster.php?randomspotlight=1');

  return (
    <Home spotlight={spotlight} />
  );
}
