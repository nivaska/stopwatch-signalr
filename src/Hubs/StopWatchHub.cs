using Microsoft.AspNetCore.SignalR;
using StopWatchApp.Models;

namespace StopWatchApp.Hubs
{
    public class StopWatchHub : Hub<IStopWatchHub>
    {
        IStopWatchService _stopWatchService;

        public StopWatchHub(IStopWatchService stopWatchService)
        {
            _stopWatchService = stopWatchService;
        }

        public void StartTimer()
        {
            _stopWatchService.StartTimer();
        }

        public void StopTimer()
        {
            _stopWatchService.StopTimer();
        }
    }
}
