import "./App.css";
import "./components/converter";
import logo from "./lotties/logo.png";
import Converter from "./components/converter";
import Lottie from "react-lottie";
import square from "./lotties/78255-background-looping-animation.json";
import wobble from "./lotties/70379-abstract-art-shapes.json";

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: square,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const wobbleOptiona = {
    loop: true,
    autoplay: true,
    animationData: wobble,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="homepage">
      <nav>
        <img src={logo} alt="" />
        <div className="logo">rXchange</div>
      </nav>
      <div className="wrapper">
        <div className="mainBody">
          <div className="hero__section">
            <h2 className="heading">R Exchange Currency Converter</h2>
            <p className="subHeading">
              Check live foreign currency exchange rates
            </p>
          </div>
          <Converter />
        </div>
      </div>
      <div className="lottie">
        <Lottie options={defaultOptions} width={500} height={200} />
      </div>
      <div className="lottie__1">
        <Lottie options={wobbleOptiona} width={300} height={300} />
      </div>
    </div>
  );
}

export default App;
