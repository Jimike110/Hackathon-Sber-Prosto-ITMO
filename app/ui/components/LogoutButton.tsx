// ./app/ui/components/LogoutButton.tsx
import React from "react";
import { Button } from "antd";
import { useLogout } from "@/app/hooks/useLogout";

const LogoutButton: React.FC = () => {
  const { logoutUser } = useLogout();

  return (
    <Button type="primary" danger onClick={logoutUser}>
      Logout
    </Button>
  );
};

export default LogoutButton;
