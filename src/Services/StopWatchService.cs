using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using StopWatchApp.Hubs;
using StopWatchApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StopWatchApp.Services
{
    public class StopWatchService: IStopWatchService
    {
        private readonly IHubContext<StopWatchHub, IStopWatchHub> _hubContext;
        private readonly StopWatch _stopwatch;

        public StopWatchService(IHubContext<StopWatchHub, IStopWatchHub> hubContext)
        {
            _hubContext = hubContext;

            _stopwatch = new StopWatch();
            _stopwatch.TimerUpdateEvent += Stopwatch_TimerUpdateEvent; 
        }

        public void StartTimer()
        {
            try
            {
                _stopwatch.Start();
            }
            catch (Exception ex)
            {
                BroadcastErrorMessage(ex.Message);
            }
        }

        public void StopTimer()
        {
            try
            {
                _stopwatch.Stop();
            }
            catch (Exception ex)
            {
                BroadcastErrorMessage(ex.Message);
            }
        }

        private void Stopwatch_TimerUpdateEvent(object sender, TimerUpdateArgs e)
        {
            this._hubContext.Clients.All.UpdateTimerState(e.Status.ToString(), e.ElapsedTIme.ToString());
        }

        private void BroadcastErrorMessage(string message)
        {
            this._hubContext.Clients.All.AlertError(message);
        }
    }
}
