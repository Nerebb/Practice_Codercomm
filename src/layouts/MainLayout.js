import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import AlertMsg from "../components/AlertMsg";
import BasicModal from "../features/modal/BasicModal";
import { useSelector } from "react-redux";

function MainLayout() {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {isOpen && <BasicModal />}
      <MainHeader />
      <AlertMsg />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
