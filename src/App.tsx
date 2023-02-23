import "./App.css";
import MainLayout from "./layout/MainLayout";
import loader from "@ibsheet/loader";
import i18n from "./language/i18n";

loader.config({
  registry: [
    {
      name: "ibsheet",
      baseUrl: "/ibsheet",
      plugins: ["common", "dialog", "excel"],
    },
  ],
});

function App() {
  i18n.changeLanguage("ko");

  return (
    <div className="App">
      <MainLayout />
    </div>
  );
}

export default App;
