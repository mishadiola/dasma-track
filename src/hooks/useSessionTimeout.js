import { useState, useEffect, useCallback, useRef } from 'react';

const useSessionTimeout = ({
    timeoutInMinutes = 15,
    warningThresholdInMinutes = 1,
    onLogout
}) => {
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(warningThresholdInMinutes * 60);

    const timeoutMs = timeoutInMinutes * 60 * 1000;
    const warningMs = warningThresholdInMinutes * 60 * 1000;

    const lastActivityRef = useRef(Date.now());
    const warningTimerRef = useRef(null);
    const logoutTimerRef = useRef(null);
    const countdownIntervalRef = useRef(null);

    const resetTimers = useCallback(() => {
        setIsWarningOpen(false);
        setTimeLeft(warningThresholdInMinutes * 60);
        lastActivityRef.current = Date.now();

        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

        // Start timer to show warning
        warningTimerRef.current = setTimeout(() => {
            setIsWarningOpen(true);

            // Start countdown once warning is shown
            countdownIntervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownIntervalRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Set final timer to logout
            logoutTimerRef.current = setTimeout(() => {
                onLogout();
            }, warningMs);

        }, timeoutMs - warningMs);
    }, [timeoutMs, warningMs, onLogout, warningThresholdInMinutes]);

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        const handleActivity = () => {
            if (!isWarningOpen) {
                resetTimers();
            }
        };

        events.forEach(event => document.addEventListener(event, handleActivity));
        resetTimers();

        return () => {
            events.forEach(event => document.removeEventListener(event, handleActivity));
            if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, [resetTimers, isWarningOpen]);

    const stayLoggedIn = () => {
        resetTimers();
    };

    return { isWarningOpen, timeLeft, stayLoggedIn };
};

export default useSessionTimeout;
