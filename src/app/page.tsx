import AudioWidget from "./components/audio-widget";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between bg-black p-4">
      <AudioWidget />
    </main>
  );
}
