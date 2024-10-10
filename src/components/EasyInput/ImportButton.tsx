// "use client";
// import React from "react";
// import { Button } from '@mui/material';
// import { useDispatch } from "react-redux";
// import { Easy_UI } from "@/lib/types/Modell";
// import FileUploadIcon from "@mui/icons-material/FileUpload";

// export default function EASYUI_Export_Button() {
//     const dispatch = useDispatch();

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             const content = e.target?.result as string;
//             const easy_ui : Easy_UI = JSON.parse(content);
//             dispatch()
//           };
//           reader.readAsText(file);
//         }
//       };

//     return (
//         < >
//             <input
//                 type="file"
//                 accept=".mod,.lp,.mps" // Unterstützte Formate
//                 style={{ display: "none" }}
//                 id="file-upload"
//                 onChange={handleFileChange}
//             />
//             <label htmlFor="file-upload">
//                 <Button variant="contained" component="span">
//                 <FileUploadIcon sx={{ mr: 1 }} />
//                 Import
//                 </Button>
//             </label>
//         </>
//     )
// }
