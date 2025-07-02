import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import "./ConfirmationPopup.css"; // Optional for extra custom styles

const ConfirmationPopup = ({ open, onClose, onConfirm, message, fileList }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="dialog-title">Confirm Upload</DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={{ __html: message?.replace(/\n/g, "<br/>") }}
        />

        <Box className="file-list-box">
          <List dense>
            {fileList.map((file, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={file} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Yes
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
