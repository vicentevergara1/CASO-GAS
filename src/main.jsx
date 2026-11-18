import "bootstrap/dist/css/bootstrap.min.css";
import "./shared/styles/base.css";
import "./features/store/store.css";
import "./features/cart/cart.css";
import "./features/checkout/checkout.css";
import "./features/search/search.css";
import "./features/admin/admin.css";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";

createRoot(document.getElementById("root")).render(<App />);
