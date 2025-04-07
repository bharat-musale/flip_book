import Footer from "../Footer";
import Header from "../Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
