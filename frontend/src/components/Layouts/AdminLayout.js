import { useAuth } from "../../context/AuthContext";
import Footer from "../Footer";
import Header from "../Header";
import MainCenter from "./MainCenter";
import MainLeft from "./MainLeft";
import MainRight from "./MainRight";

function AdminLayout({
  children,
  openAddModal,
  setOpenAddModal,
  onSearch,
  searchLoader=false,
}) {
  const { user } = useAuth();
  const isAdmin = user && user.role.toLowerCase() === "admin";
  const onAdmin = () => {
    // Handle admin actions here
    setOpenAddModal(true);
  };

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard-layout">
          <MainLeft> </MainLeft>
          <MainCenter
            isSearch={true}
            isAdmin={isAdmin}
            onAdmin={onAdmin}
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
            onSearch={onSearch}
            searchLoader={searchLoader}
          >
            {children}
          </MainCenter>
          <MainRight> </MainRight>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
