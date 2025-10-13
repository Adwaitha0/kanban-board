import Header from "../components/Header";
import MainContent from "../components/MainContent";

export default function Home() {
  return (

    <div className="font-sans flex flex-col bg-[#424242] items-center justify-items-center min-h-screen sm:p-7"> 
      <Header />
      <MainContent />
    </div>
  );
}
