import { SWRProvider } from "@/hooks/swr-provider";
import { request } from "@/hooks/use-api";
import Home from "@/page/home";

export const revalidate = 3600; // invalidate cache every hour

export default async function HomeRoute() {
  const spotlight = await request('/roster.php?randomspotlight=1');
  const news = await request('/news.php?max=10');
  const fallback = {
    '/news.php?max=10': news,
    '/roster.php?randomspotlight=1': spotlight
  }
  return (
    <SWRProvider fallback={fallback}>
      <Home />
    </SWRProvider>
  );
}
