import './Relevance.css';
import { useRef, useState, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function Relevance({ relevance, onClick, selected }) {
    const scrollContainerRef = useRef(null);
    const wrapperRef = useRef(null);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [centerContent, setCenterContent] = useState(false);

    // Check layout and screen width
    useEffect(() => {
        const checkLayout = () => {
            if (scrollContainerRef.current && wrapperRef.current) {
                const mobile = window.innerWidth <= 695;
                setIsMobile(mobile);

                if (!mobile) {
                    const containerWidth = wrapperRef.current.clientWidth;
                    const contentWidth = scrollContainerRef.current.scrollWidth;
                    const overflow = contentWidth > containerWidth;
                    setShowScrollButtons(overflow);
                    setCenterContent(!overflow);
                }
            }
        };

        checkLayout();
        window.addEventListener('resize', checkLayout);
        return () => window.removeEventListener('resize', checkLayout);
    }, []);

    // Handle mobile scroll buttons separately when relevance changes
    useEffect(() => {
        if (isMobile) {
            setShowScrollButtons(relevance.length > 6);
            setCenterContent(false);
        }
    }, [isMobile, relevance.length]);

    // Scroll function
    const scroll = (direction) => {
        if (!scrollContainerRef.current) return;

        if (isMobile) {
            // scroll by one page (6 items)
            const pageWidth = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollBy({
                left: direction * pageWidth,
                behavior: 'smooth'
            });
        } else {
            // scroll by 80% of container width
            const containerWidth = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollBy({
                left: direction * containerWidth * 0.8,
                behavior: 'smooth'
            });
        }
    };

    // Mobile: chunk items into pages of 6 (3x2)
    const chunked = [];
    if (isMobile) {
        for (let i = 0; i < relevance.length; i += 6) {
            chunked.push(relevance.slice(i, i + 6));
        }
    }

    return (
        <div className="relevance-wrapper" ref={wrapperRef}>
            {showScrollButtons && (
                <button className="scroll-btn prev" onClick={() => scroll(-1)}>
                    <NavigateBeforeIcon />
                </button>
            )}

            <div
                className={`relevance `}
                // ${centerContent ? 'centered' : ''}
                ref={scrollContainerRef}
                style={isMobile ? { display: 'flex', gap: '1rem' } : {}}
            >
                {isMobile
                    ? chunked.map((page, pageIndex) => (
                        <div className="relevance-page" key={pageIndex}>
                            {page.map((link) => (
                                <div
                                    className="relevance-link"
                                    key={link.name}
                                    onClick={() => onClick(link.name)}
                                >
                                    <img
                                        src={link.img}
                                        alt={link.name}
                                        className="relevance-img"
                                        loading="lazy"
                                        style={{
                                            border:
                                                selected === link.name
                                                    ? '2px solid blue'
                                                    : 'none'
                                        }}
                                    />
                                    <div className="relevance-name">{link.name}</div>
                                </div>
                            ))}
                        </div>
                    ))
                    : relevance.map((link) => (
                        <div
                            className={`relevance-link `}
                            key={link.name}
                            onClick={() => onClick(link.name)}
                        >
                            <img
                                src={link.img}
                                alt={link.name}
                                loading="lazy"
                                className='relevance-img' 
                                style={{
                                    border:
                                        selected === link.name
                                            ? '2px solid blue'
                                            : 'none'
                                }}
                            />
                            <div className="relevance-name">{link.name}</div>
                        </div>
                    ))}
            </div>

            {showScrollButtons && (
                <button className="scroll-btn next" onClick={() => scroll(1)}>
                    <NavigateNextIcon />
                </button>
            )}
        </div>
    );
}


