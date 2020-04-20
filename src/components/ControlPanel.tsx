import React, { useState } from 'react';
import {
    PanelOpener,
    PanelContainer,
    PanelControllers
} from './ControlPanel.styles';
import ImageSetter from '../containers/ImageSetter';


const ControlPanel = () => {
    const [open, setOpen] = useState(false);
    return (
        <PanelContainer className={open ? "open-panel" : ""}>
            <PanelControllers>
                <ImageSetter />
            </PanelControllers>
            <PanelOpener onClick={() => { console.info(`setting open to ${!open}`); setOpen(!open); }} />
        </PanelContainer>
    )
}

export default ControlPanel;