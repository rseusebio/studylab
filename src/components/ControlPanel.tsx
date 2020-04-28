import React, { useState } from 'react';
import {
    PanelOpener,
    PanelContainer,
    PanelControllers
} from './ControlPanel.styles';
import ImageSetter from '../containers/ImageSetter';
import ZoomSetter from '../containers/ZoomSetter';


const ControlPanel = () => {
    const [open, setOpen] = useState(false);
    return (
        <PanelContainer className={open ? "open-panel" : ""}>
            <PanelControllers>
                <ImageSetter />
                <ZoomSetter />
            </PanelControllers>
            <PanelOpener onClick={() => { console.info(`setting open to ${!open}`); setOpen(!open); }} />
        </PanelContainer>
    )
}

export default ControlPanel;