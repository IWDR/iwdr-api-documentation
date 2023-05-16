import {useRef, useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import {Captions, Counter, Inline, Fullscreen, Zoom} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";


export default function CustomLightbox({slides}) {
    const [open, setOpen] = useState(false);
    const captionsRef = useRef(null);
    const fullscreenRef = useRef(null);
    const zoomRef = useRef(null);

    return (
        <>
            <Lightbox
                open={open} close={() => setOpen(false)}
                slides={slides}
                plugins={[Captions, Counter, Inline, Fullscreen, Zoom]}
                captions={{ref: captionsRef}}
                fullscreen={{ ref: fullscreenRef }}
                zoom={{ ref: zoomRef }}
                counter={{ style: { top: "unset", bottom: 0, left: "49%" } }}
                inline={{ style: { width: "100%", maxWidth: "900px", aspectRatio: "3 / 2" } }}
            />
        </>
    )
}