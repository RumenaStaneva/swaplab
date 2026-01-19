
// Main Logo with Text
export const SwapLabLogo = () => (
    <div className="flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="rainbow1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
                    <stop offset="50%" style={{ stopColor: '#3b82f6' }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
                </linearGradient>
                <linearGradient id="rainbow2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
                    <stop offset="50%" style={{ stopColor: '#ef4444' }} />
                    <stop offset="100%" style={{ stopColor: '#ec4899' }} />
                </linearGradient>
            </defs>
            <path d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20"
                stroke="url(#rainbow1)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20"
                stroke="url(#rainbow2)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="20" r="6" fill="white" />
            <path d="M18 19L20 21L22 19" stroke="url(#rainbow1)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-2xl font-bold tracking-tight">SwapLab</span>
    </div>
)

// Icon Only (for smaller spaces)
export const SwapLabIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="rainbow1-icon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6' }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
            </linearGradient>
            <linearGradient id="rainbow2-icon" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
                <stop offset="50%" style={{ stopColor: '#ef4444' }} />
                <stop offset="100%" style={{ stopColor: '#ec4899' }} />
            </linearGradient>
        </defs>
        <path d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20"
            stroke="url(#rainbow1-icon)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20"
            stroke="url(#rainbow2-icon)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="20" cy="20" r="6" fill="white" />
        <path d="M18 19L20 21L22 19" stroke="url(#rainbow1-icon)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Compact Icon (32x32 for navbar)
export const SwapLabIconSmall = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="rainbow1-small" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6' }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
            </linearGradient>
            <linearGradient id="rainbow2-small" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
                <stop offset="50%" style={{ stopColor: '#ef4444' }} />
                <stop offset="100%" style={{ stopColor: '#ec4899' }} />
            </linearGradient>
        </defs>
        <path d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20"
            stroke="url(#rainbow1-small)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20"
            stroke="url(#rainbow2-small)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="20" cy="20" r="6" fill="white" />
        <path d="M18 19L20 21L22 19" stroke="url(#rainbow1-small)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

// Alternative: Rainbow with Sparkles
export const SwapLabLogoSparkle = () => (
    <div className="flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="rainbow1-sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
                    <stop offset="50%" style={{ stopColor: '#3b82f6' }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
                </linearGradient>
                <linearGradient id="rainbow2-sparkle" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
                    <stop offset="50%" style={{ stopColor: '#ef4444' }} />
                    <stop offset="100%" style={{ stopColor: '#ec4899' }} />
                </linearGradient>
            </defs>
            <path d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20"
                stroke="url(#rainbow1-sparkle)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20"
                stroke="url(#rainbow2-sparkle)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="20" r="6" fill="white" />
            <path d="M18 19L20 21L22 19" stroke="url(#rainbow1-sparkle)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" />
            {/* Sparkles */}
            <circle cx="10" cy="12" r="2" fill="#06b6d4" opacity="0.8" />
            <circle cx="30" cy="12" r="2" fill="#f59e0b" opacity="0.8" />
            <circle cx="10" cy="28" r="2" fill="#ec4899" opacity="0.8" />
            <circle cx="30" cy="28" r="2" fill="#8b5cf6" opacity="0.8" />
        </svg>
        <span className="text-2xl font-bold tracking-tight">SwapLab</span>
    </div>
)

// Alternative: Rainbow Circle Complete
export const SwapLabLogoComplete = () => (
    <div className="flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="rainbow-full" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
                    <stop offset="25%" style={{ stopColor: '#3b82f6' }} />
                    <stop offset="50%" style={{ stopColor: '#8b5cf6' }} />
                    <stop offset="75%" style={{ stopColor: '#ec4899' }} />
                    <stop offset="100%" style={{ stopColor: '#f59e0b' }} />
                </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="14" stroke="url(#rainbow-full)" strokeWidth="5" fill="none" />
            <circle cx="20" cy="20" r="7" fill="white" />
            <path d="M17 19L19 21L23 17" stroke="url(#rainbow-full)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-2xl font-bold tracking-tight">SwapLab</span>
    </div>
)