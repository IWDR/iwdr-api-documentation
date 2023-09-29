import { useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Captions, Counter, Fullscreen, Inline, Zoom } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/styles.css';
import { Button } from '@/components/Button';


export default function CustomLightbox({ slides, inline, label }) {
    const [open, setOpen] = useState(false);
    const captionsRef = useRef(null);
    const fullscreenRef = useRef(null);
    const zoomRef = useRef(null);

    if(inline) return (
        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            plugins={[Captions, Counter, Inline, Fullscreen, Zoom]}
            captions={{ref: captionsRef}}
            fullscreen={{ ref: fullscreenRef }}
            zoom={{ ref: zoomRef }}
            counter={{ style: { top: "unset", bottom: 0, left: "49%" } }}
            inline={{ style: { width: "100%", maxWidth: "900px", aspectRatio: "3 / 2" } }}
        />
    )
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                {label}
            </Button>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                plugins={[Captions, Counter, Zoom]}
                captions={{ref: captionsRef}}
                zoom={{ ref: zoomRef }}
                counter={{ style: { top: "unset", bottom: 0, left: "49%" } }}
            />
        </>
    )
}