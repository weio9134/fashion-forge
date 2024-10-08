import Canvas from "../canvas";
import Customizer from "./customizer/page";
import Home from "./home/page";

export default function Page() {
  return (
    <main className="app transition-all ease-in bg-gray-200">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}
