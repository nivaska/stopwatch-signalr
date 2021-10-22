using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StopWatchApp.Hubs
{
    public interface IStopWatchHub
    {
        Task UpdateTimerState(string status, string time);
        Task AlertError(string message);
    }
}
