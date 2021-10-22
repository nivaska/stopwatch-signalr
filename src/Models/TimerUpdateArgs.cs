using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StopWatchApp.Models
{
    public class TimerUpdateArgs
    {
        public TimerUpdateArgs(TimerStatus status, int elapsedTime)
        {
            Status = status;
            ElapsedTIme = elapsedTime;
        }

        public TimerStatus Status { get; set; }

        public int ElapsedTIme { get; set; }
    }
}
