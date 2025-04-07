import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as XLSX from "xlsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function DynamicFileUpload({
  onUpload,
  maxSize = 5 * 1024 * 1024,
}) {
  const [files, setFiles] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [uploadedData, setUploadedData] = React.useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Skip header and map rows to object
      const extracted = parsedData
        .slice(1)
        .map((row) => {
          return {
            name: row[0]?.toString().trim() || "",
            email: row[1]?.toString().trim() || "",
          };
        })
        .filter((row) => row.name && row.email); // optional: only keep valid rows

      setUploadedData((prev) => [...prev, ...extracted]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) => file.size <= maxSize);

    if (validFiles.length < selectedFiles.length) {
      setError(
        `Some files exceed the maximum size of ${maxSize / 1024 / 1024}MB.`
      );
    } else {
      setError(null);
    }

    setFiles(validFiles);
    validFiles.forEach((file) => handleFileUpload(file));
  };

  React.useEffect(() => {
    if (onUpload && uploadedData.length > 0) {
      onUpload(uploadedData);
    }
  }, [uploadedData, onUpload]);

  return (
    <Box>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Files
        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box mt={2}>
        {files.map((file, index) => (
          <Typography key={index} variant="body2">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </Typography>
        ))}
      </Box>
      {/* {uploadedData.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Uploaded Data:</Typography>
          <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
        </Box>
      )} */}
    </Box>
  );
}
