import PictureInPictureDiv from "@/components/pip";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-none">
      <div className="w-full h-full sm:grid place-items-center p-2">
        <div
          className="w-full cursor-default h-full sm:h-96 max-w-screen-xl bg-white rounded-md flex flex-col sm:flex-row ">
          <div className="w-full h-full flex-1  flex flex-col cartoon">
            <PictureInPictureDiv />
          </div>
          <div className="w-full h-full sm:max-w-sm pt-5 grid place-items-center">
            <img src="/16377/386049.gif" className="w-96" />
          </div>
        </div>
      </div>
    </div>

  );
}
