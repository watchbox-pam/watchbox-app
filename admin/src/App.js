import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./screens/global/Topbar";
import Sidebar from "./screens/global/Sidebar";
import Dashboard from "./screens/dashboard";
import Team from "./screens/team";
import "./index.css";
import Contacts from "./screens/contacts";
import Invoices from "./screens/invoices";
import Form from "./screens/form";
import Calendar from "./screens/calendar";
import Bar from "./screens/bar";
import Pie from "./screens/pie";
import Line from "./screens/line";
import Geography from "./screens/geography";
// import FAQ from "./screens/faq";

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar />
					<main classname="content" style={{ width: "100%" }}>
						<Topbar />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/team" element={<Team />} />
							<Route path="/contacts" element={<Contacts />} />
							<Route path="/invoices" element={<Invoices />} />
							<Route path="/form" element={<Form />} />
							<Route path="/calendar" element={<Calendar />} />
							<Route path="/bar" element={<Bar />} />
							<Route path="/pie" element={<Pie />} />
							<Route path="/line" element={<Line />} />
							<Route path="/geography" element={<Geography />} />
							{/* <Route path="/faq" element={<FAQ />} /> */}
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
