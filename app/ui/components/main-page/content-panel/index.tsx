// // ContentPanel.tsx
// import React from "react";
// import WorkerLandingPage from "./contents/WorkerLandingPage";
// import AddVehiclePage from "./contents/AddVehiclePage";

// interface ContentPanelProps {
//   selectedKey: string;
// }

// const ContentPanel: React.FC<ContentPanelProps> = ({ selectedKey }) => {
//   let content;
//   switch (selectedKey) {
//     case "1":
//       return <WorkerLandingPage />
//       break;
//     case "2":
//       return <AddVehiclePage />
//       break;
//     case "3":
//       content = <div>Content for Tom</div>;
//       break;
//     case "4":
//       content = <div>Content for Bill</div>;
//       break;
//     case "5":
//       content = <div>Content for Alex</div>;
//       break;
//     case "6":
//       content = <div>Content for Team 1</div>;
//       break;
//     case "8":
//       content = <div>Content for Team 2</div>;
//       break;
//     case "9":
//       content = <div>Content for Files</div>;
//       break;
//     default:
//       content = <div>Default Content</div>;
//   }
//   return <>{content}</>;
// };

// export default ContentPanel;
