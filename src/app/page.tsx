import ClientHomeView from "@/components/ClientHomeView";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-none">
      <div className="w-full h-full sm:grid place-items-center p-2">
        <ClientHomeView />
      </div>
    </div>
  );
}
