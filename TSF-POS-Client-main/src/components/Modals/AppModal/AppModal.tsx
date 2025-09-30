import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppModalTypes } from "./types";
import { CircularProgress } from "@mui/material";

export default function AppModal({
  open,
  setOpen,
  title,
  description,
  handleConfirm,
  loading,
}: AppModalTypes) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} disabled={loading}>
            No
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirm}
            disabled={loading}
          >
            Yes
            {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
