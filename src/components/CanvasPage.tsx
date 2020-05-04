import React                from    'react';
import { PageContainer }    from    './Canvas.styles'
import ImageComponent       from    '../components/ImagePage';
import ControlPanel         from    './ControlPanel';
import CanvasContainter     from    './CanvasContainter';

const CanvasPage = (props: any) => {
    return (
        <PageContainer>
            <ControlPanel />
            <CanvasContainter />
            <ImageComponent />
        </PageContainer>
    )
}

export default CanvasPage;