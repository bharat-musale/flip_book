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
          <MainLeft>
            <>
              <AdvertiserService src="v1.mp4" />
              <AdvertiserService
                numberOfAdvertisers={2}
                imageArr={["b1.jpg", "b2.jpg"]}
              />
            </>
          </MainLeft>
          <MainCenter isSearch onSearch={onSearch}>
            {children}
          </MainCenter>
          <MainRight>
            {
              <>
                <AdvertiserService src="v2.mp4" />
                <AdvertiserService
                  numberOfAdvertisers={2}
                  imageArr={["b3.jpg", "b4.png"]}
                />
              </>
            }
          </MainRight>
        </div>
        <Footer />
      </div>
    );
}

export default DashboardLayoutAdt;
