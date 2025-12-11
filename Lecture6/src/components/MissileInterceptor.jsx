import React, { useState, useMemo } from 'react';
function MissileInterceptor() {
    const [targetVelocity, setTargetVelocity] = useState(100); // m/s
    const [targetDistance, setTargetDistance] = useState(5000); // meters
    const interceptionTrajectory = useMemo(() => {
        const timeToIntercept = targetDistance / targetVelocity;
        const optimalAngle = Math.atan(targetVelocity / 9.81) * (180 / Math.PI);
        return `Time to Intercept: ${timeToIntercept.toFixed(2)} seconds, Optimal Launch Angle: ${optimalAngle.toFixed(2)} degrees`;}
        , [targetVelocity, targetDistance]);
    const increaseVelocity = () => setTargetVelocity(prev => prev + 10);
    const decreaseDistance = () => setTargetDistance(prev => prev - 500);
     return (
        <div style={{ border: '1px solid blue', padding: '20px' }}>
            <h2>Missile Interceptor System</h2>
            <p>Target Velocity: {targetVelocity} m/s</p>
            <p>Target Distance: {targetDistance} meters</p>
            <p><strong>Calculated Interception Trajectory:</strong> {interceptionTrajectory}</p>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={increaseVelocity}>Increase Target Velocity</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={decreaseDistance}>Target Approaching (Decrease Distance)</button>

        </div>
     );
}
export default MissileInterceptor;
