import React, { useEffect, useRef, useState } from 'react';

const AiPage: React.FC = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeHeight, setIframeHeight] = useState('600px'); // Default height

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Add origin check for security
            if (event.origin !== window.location.origin) return;

            if (event.data?.iframeHeight) {
                setIframeHeight(`${event.data.iframeHeight}px`);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <iframe
                ref={iframeRef}
                src="/anls/index.html"
                title="dptool"
                style={{
                    width: '100%',
                    height: iframeHeight,
                    border: 'none',
                }}
                loading="lazy" // Added for better performance
            />
        </div>
    );
};

export default AiPage; // Fixed the exported component name to match the declared one