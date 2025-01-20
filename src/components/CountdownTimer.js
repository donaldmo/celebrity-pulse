"use client"
import React, { useState, useEffect } from 'react';

// Helper function to format time
const formatTime = (time) => time < 10 ? `0${time}` : time;

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const target = new Date(targetDate);
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const seconds = Math.floor((diff / 1000) % 60);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
            });
        };

        updateCountdown(); // Initial call to set the time immediately
        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [targetDate]);

    return (
        <div className="heading">
            <div className="text">
                {formatTime(timeLeft.days)}<span style={{fontSize: '12px'}}>D </span>
                {formatTime(timeLeft.hours)}<span style={{fontSize: '12px'}}>H </span>
                {formatTime(timeLeft.minutes)}<span style={{fontSize: '12px'}}>M </span> 
                {formatTime(timeLeft.seconds)}<span style={{fontSize: '12px'}}>S </span> 
            </div>
        </div>
    );
};

export default CountdownTimer;
