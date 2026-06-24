import Banner from "@/components/Banner";
import OpportunitiesDynamic from "@/components/homepage/OpportunitiesDynamic";
import StartupDynamic from "@/components/homepage/StartupDynamic";
import StartupStatistics from "@/components/homepage/StartupStatistics";
import WhyJoinSection from "@/components/homepage/WhyJoinSection";

export default function Home() {
  return (
    <>
        <Banner></Banner>
        <StartupDynamic></StartupDynamic>
        <OpportunitiesDynamic></OpportunitiesDynamic>
        <StartupStatistics></StartupStatistics>
        <WhyJoinSection></WhyJoinSection>
    </>
  );
}
