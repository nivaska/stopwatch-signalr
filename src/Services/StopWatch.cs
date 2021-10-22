using StopWatchApp.Models;
using System;
using System.Threading;

namespace StopWatchApp.Services
{
    public class StopWatch
    {
        private Timer _timer;
        private int _elapsedTime;
        private TimerStatus _timerStatus;

        public event TimerUpdateHandler TimerUpdateEvent;
        public StopWatch()
        {
            _elapsedTime = 0;
            _timerStatus = TimerStatus.Stopped;
        }

        public void Start()
        {
            if (_timerStatus == TimerStatus.Running)
                throw new Exception("Timer is already running.");

            _timerStatus = TimerStatus.Running;
            _timer = new Timer(UpdateStopwatch, null, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1));
        }

        public void Stop()
        {
            if (_timer != null)
            {
                _timer.Dispose();
                _timerStatus = TimerStatus.Stopped;
                TimerUpdateEvent?.Invoke(this, new TimerUpdateArgs(_timerStatus, _elapsedTime));
            }
        }

        private void UpdateStopwatch(object state)
        {
            _elapsedTime++;
            TimerUpdateEvent?.Invoke(this, new TimerUpdateArgs(_timerStatus, _elapsedTime));
        }
    }
}
