import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import * as XLSX from "xlsx";
import AdminLayout from "./Layouts/AdminLayout";
import FileUpload from "./Layouts/FileUpload";
import ConfirmModal from "./Layouts/ConfirmModal";
import DynamicTable from "./Layouts/DynamicTable";
import DynamicModal from "./Layouts/DynamicModal";
import Certificate from "./Layouts/Certificate";
import records from "../services/mockData";
import onDownloadPDF from "../services/downloadCertificate";
import CountryStateSelector from "./Layouts/CountryStateSelector";
import { certificatesApis } from "../services/api";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    type: "Single",
    date: "",
    description: "",
    record_name: "",
    country: "",
    state: "",
    // recordNumber: "",
    person_name: "",
    email: "",
  });
  const [certificates, setCertificates] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [uploadedNames, setUploadedNames] = useState([]);
  const [openViewModal, setOpenView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCert, setSelectedCert] = useState({});
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [m_Id, setM_Id] = useState("");
  const [m_IdList, setM_IdList] = useState([]);
  const  [errMsg,setErrMsg]=useState('')
  const [allLoader, setAllLoader] = useState({
    fetchalldata: false,
    download: false,
    searchFilter: false,
    m_idFilteredData: false,
  });

  const handleClose = () => {
    setOpenEditModal(false);
    setOpenView(false);
    setOpenAddModal(false);
    setSelectedCert({});
    setFormData({
      type: "Single",
      date: "",
      description: "",
      record_name: "",
      country: "",
      state: "",
      // recordNumber: "",
      person_name: "",
      email: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleFileUpload = (file) => {
    setUploadedNames(file);
  };

  const fetchAllCertificates = async () => {
    setAllLoader({ ...allLoader, fetchalldata: true });
    try {
      const response = await certificatesApis.getAll();
      console.log(response);
      const { certificates } = response?.data;
      console.log(certificates);
      setCertificates(certificates);
      setAllLoader({ ...allLoader, fetchalldata: false });
    } catch (err) {
      setAllLoader({ ...allLoader, fetchalldata: false });
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCertificates();
    console.log(certificates);
  }, []);

  const handleAddCertificate = async () => {
    setLoading(true);
    if(formData?.record_name?.length > 90){
      setErrMsg("Record name should be less than 90 characters")
      return
    }

    const newEntries =
      formData.type === "Single"
        ? [
            {
              ...formData,
            },
          ]
        : uploadedNames.map((data, index) => ({
            ...formData,
            type: "Multiple",
            person_name: data?.name,
            email: data?.email,
            m_id: "M" + certificates.length,
          }));

    try {
      const response = await certificatesApis.create(newEntries);
      const { certificates, message, numberOfCertificates, status } = response;
      if (status === 201) {
        fetchAllCertificates();
      }
      setFormData({
        type: "Single",
        date: "",
        description: "",
        record_name: "",
        country: "",
        state: "",
        person_name: "",
        email: "",
      });
      setUploadedNames([]);
      setLoading(false);
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const showMultipleSheetModal = (m_Id) => {
    setAllLoader({ ...allLoader, m_idFilteredData: false });
    const filteredData = certificates.filter((cert) => cert.m_id === m_Id);
    setM_IdList(filteredData);
    setAllLoader({ ...allLoader, m_idFilteredData: false });
  };

  const handleSelection = ({ countryCode, stateCode }) => {
    setFormData({ ...formData, country: countryCode, state: stateCode });
  };

  const columns = [
    {
      key: "index",
      label: "Sr No.",
      minWidth: 50,
      render: (_, __, rowIndex) => rowIndex + 1,
    },
    {
      key: "recordNo",
      label: "Number",
      minWidth: 150,
      render: (value, row) => `${row.country}-${row.state}-${row.recordNo}`,
    },
    { key: "person_name", label: "Name", minWidth: 120 },
    {
      key: "type",
      label: "Type",
      minWidth: 100,
      editable: true,
      cursor: "pointer",
      onClick: (row) => {
        if (row.type.toLowerCase() === "multiple") {
          console.log("m_id selected:", row);
          setM_Id(true);
          showMultipleSheetModal(row.m_id || null);
        }
      },
    },
  ];

  const onView = (cert) => {
    console.log("view", cert);
    setOpenView(true);
    setFormData(cert);
  };
  const onEdit = (cert) => {
    console.log("edit");
    setOpenEditModal(true);
    setFormData(cert);
  };
  const onDelete = (cert) => {
    console.log("delete");
    setOpenConfirmationModal(true);
    setSelectedCert(cert);
  };
  const onCertificate = (cert) => {
    console.log("certificate");
    setCertificateModalOpen(true);
    setFormData(cert);
    console.log(cert);
  };

  const onDownload = (cert) => {
    onDownloadPDF(cert);
  };

  const onPublish = async (cert) => {
    try {
      console.log("Publishing:", cert);
      const response = await certificatesApis.publishCertificate(cert?._id);
      console.log("Publish response:", response?.data);
      // optionally: show toast, reload, etc.
    } catch (err) {
      console.error("Publish Error:", err);
    }
  };

  const handleCertificateDelete = async () => {
    console.log(selectedCert)
    try {
      const response = await certificatesApis.deleteCertificate(
       {id: selectedCert?._id}
      );
      if(response?.data?.status === 200){
        fetchAllCertificates();
      }
      console.log("Delete response:", response?.data);
      // optionally: show toast, reload, etc.
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const onSearch = (searchId) => {
    if (!searchId.trim()) return; // Don't search on empty input

    setAllLoader({ ...allLoader, fetchalldata: true });

    const [country, state, recordNo] = searchId.split("-");

    const filteredCertificates = certificates.filter(
      (cert) =>
        cert.country?.toUpperCase() === country?.toUpperCase() &&
        cert.state?.toUpperCase() === state?.toUpperCase() &&
        cert.recordNo?.toString() === recordNo
    );

    setCertificates(
      filteredCertificates.length > 0 ? filteredCertificates : []
    );
    setAllLoader({ ...allLoader, fetchalldata: false });
  };

  return (
    <AdminLayout
      openAddModal={openAddModal}
      setOpenAddModal={setOpenAddModal}
      onSearch={onSearch}
      searchLoader={allLoader?.searchFilter}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <DynamicTable
          columns={columns}
          data={certificates}
          onView={onView}
          isView
          onEdit={onEdit}
          isEdit
          onDelete={onDelete}
          isDelete
          onCertificate={onCertificate}
          isCertificate
          onPublish={onPublish}
          isPublish
          loading={allLoader.fetchalldata}
          isPagination
        />

        {/* Create/Edit Modal */}
        <Dialog
          open={openEditModal || openViewModal || openAddModal}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          height="auto"
        >
          <DialogTitle>
            {openViewModal
              ? "View Certificate"
              : openEditModal
              ? "Edit Certificate"
              : openAddModal && "Add Certificate"}
          </DialogTitle>
          <DialogContent>
            <FormControl
              component="fieldset"
              sx={{ mb: 2 }}
              disabled={openViewModal || openEditModal}
            >
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="Single"
                  control={<Radio />}
                  label="Single"
                  disabled={openViewModal || openEditModal}
                />
                <FormControlLabel
                  value="Multiple"
                  control={<Radio />}
                  label="Multiple"
                  disabled={openViewModal || openEditModal}
                />
              </RadioGroup>
            </FormControl>
            {
              formData.type === "Single" ? (
                <>
                  <TextField
                    fullWidth
                    label="Name"
                    name="person_name"
                    value={formData.person_name}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={openViewModal}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled={openViewModal}
                  />
                </>
              ) : openViewModal ? (
                <div>{console.log(formData)}</div>
              ) : (
                <FileUpload onUpload={handleFileUpload} />
              )
              // <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} disabled={openViewModal} />
            }

            <TextField
              fullWidth
              label="Record Name"
              name="record_name"
              value={formData.record_name}
              onChange={handleInputChange}
              margin="normal"
              disabled={openViewModal}
              
            />
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={openViewModal}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={3}
              disabled={openViewModal}
            />
            <CountryStateSelector
              onSelectionChange={handleSelection}
              data={formData}
              openViewModal={openViewModal}
            />
            <Typography sx={{ color: "red" }}>{errMsg}</Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="warning" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleAddCertificate}
              color="primary"
              variant="contained"
              loading={loading}
              disabled={openViewModal}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <ConfirmModal
        setOpen={setOpenConfirmationModal}
        open={openConfirmationModal}
        modalTitle="Delete Certificate"
        modalSubtitle="Are you sure you want to proceed?"
        primaryAction={{ label: "Yes", onClick: () => handleCertificateDelete() }}
        secondaryAction={{ label: "No", onClick: () => alert("Cancelled!") }}
      />
      <DynamicModal
        open={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        download={true}
        onDownload={() => onDownload(formData)}
      >
        <Certificate recordData={formData} />
      </DynamicModal>
      <DynamicModal open={m_Id} onClose={() => setM_Id(false)}>
        <DynamicTable
          columns={columns}
          data={m_IdList}
          onView={onView}
          isView
          onEdit={onEdit}
          isEdit
          onDelete={onDelete}
          isDelete
          onCertificate={onCertificate}
          isCertificate
          // onPublish={onPublish}
          loading={allLoader.m_idFilteredData}
          isPagination
        />
      </DynamicModal>
    </AdminLayout>
  );
};

export default AdminPanel;
const recordData = {
  certificateId: "USA-NYC-90027",
  achievement:
    "Longest time breath held voluntarily 18 minutes 05.47 seconds (female)",
  recipient: "JANE WRITER",
  eventDetails:
    'Achieved at an event organised by "THE BOOK OF WORLD RECORD" at Rockland County, New Square, New York held by "IYA" on June 21, 2024.',
};
