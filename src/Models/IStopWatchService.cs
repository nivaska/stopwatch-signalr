using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StopWatchApp.Models
{
    public delegate void TimerUpdateHandler(object sender, TimerUpdateArgs e);

    public interface IStopWatchService
    {
        public void StartTimer();
        public void StopTimer();
    }
}
