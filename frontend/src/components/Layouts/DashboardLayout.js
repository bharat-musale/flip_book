import Footer from "../Footer";
import Header from "../Header";
import AdvertiserService from "./Advertise";
import MainCenter from "./MainCenter";

function DashboardLayout({ children, onSearch = () => {}, isMobile }) {
  return (
    <div className="dashboard">
      <div className="dashboard-layout" style={{ justifyContent: isMobile ? "center" : "space-between", minWidth: isMobile ? "auto" : 'max-content'}}>
        <MainCenter isSearch onSearch={onSearch}>
          {children}
        </MainCenter>
        <div className="main-center">
          <AdvertiserService src="a1.png" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
