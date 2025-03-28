// Sidebar.tsx
import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  PlusCircleOutlined,
  FileOutlined,
  CarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("My Vehicles", "1", <CarOutlined />),
  getItem("Add New Vehicle", "2", <PlusCircleOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

interface SidebarProps {
  onMenuSelect: (key: string) => void;
  selectedKey: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect, selectedKey }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      items={items}
      onClick={({ key }) => onMenuSelect(key)}
    />
  );
};

export default Sidebar;
