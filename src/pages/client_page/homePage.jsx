import Header from "../../components/header/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="fixed mt-[65px] flex flex-col bg-c1 w-full h-screen items-center">
        <div className="flex justify-center items-center w-[700px] h-[100px] rounded-lg bg-c3 border-[3px]">
          <input type="date" />
          <input type="date" />
          <select>
            <option>Select Room Type</option>
            <option>Luxury</option>
            <option>Normal</option>
            <option>Low</option>
          </select>
          <button>Book Now</button>
        </div>
        <h1 className="text-c3 text-[40px]">Welcome to the Hotel</h1>
      </div>
    </>
  );
}
