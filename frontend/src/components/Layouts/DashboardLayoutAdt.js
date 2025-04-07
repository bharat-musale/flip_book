import MainLeft from "./MainLeft";
import MainCenter from "./MainCenter";
import MainRight from "./MainRight";
import "./style.css";
import Footer from "../Footer";
import AdvertiserService from "./Advertise";

function DashboardLayoutAdt({ children }) {

    return (
        <div className="dashboard">
            <div className="dashboard-layout">
                <MainLeft >{<><AdvertiserService /><AdvertiserService numberOfAdvertisers={2} /></>}</MainLeft>
                <MainCenter isSearch>{children}</MainCenter>
                <MainRight >{<><AdvertiserService /><AdvertiserService numberOfAdvertisers={2} /></>}</MainRight>        
            </div>
            <Footer />
        </div>
    );
}

export default DashboardLayoutAdt;
