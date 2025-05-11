import MainLeft from "./MainLeft";
import MainCenter from "./MainCenter";
import MainRight from "./MainRight";
import "./style.css";
import Footer from "../Footer";
import AdvertiserService from "./Advertise";

function DashboardLayoutAdt({ children,onSearch=()=>{} }) {

    return (
        <div className="dashboard">
            <div className="dashboard-layout">
                <MainLeft >{<><AdvertiserService src="a1.png" /><AdvertiserService numberOfAdvertisers={2} imageArr={["a3.jpg","a5.jpg"]}  /></>}</MainLeft>
                <MainCenter isSearch onSearch={onSearch}>{children}</MainCenter>
                <MainRight >{<><AdvertiserService src="a4.jpg" /><AdvertiserService numberOfAdvertisers={2} imageArr={["a2.jpg","a6.jpg"]} /></>}</MainRight>        
            </div>
            <Footer />
        </div>
    );
}

export default DashboardLayoutAdt;
