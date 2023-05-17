import { Box, Button, Modal } from "@mui/material"
import { styleModalBox } from "../Assets/css"

interface ToggleProps {
    open: boolean
    setOpen: any
    children: any
}

export const ModalBox = (props : ToggleProps) => {
    return(
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModalBox} style={{
            backgroundColor: 'white'
            }}>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                gap: "20px",      
                
            }}>
             {props.children}   
             <Button onClick={() => {
                props.setOpen(!props.open)
             }}>Lukk</Button>   
            </div>
            </Box>
        </Modal>
    )
}